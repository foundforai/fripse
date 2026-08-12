interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  EMAIL: {
    send(message: EmailMessage): Promise<unknown>;
  };
}

type FormField = string | number;

const RECIPIENT = "info@fripse.com";
const SENDER = "forms@fripseai.com";
const MAX_FIELD_LENGTH = 2_000;
const MAX_FIELDS = 12;
const ALLOWED_FIELDS = new Set([
  "name",
  "company",
  "email",
  "message",
  "quizScore",
  "quizLevel",
]);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function badRequest(message: string): Response {
  return Response.json({ error: message }, { status: 400 });
}

function formLabel(subject: string): string {
  return subject.replace(/^Fripse\s*/i, "").trim() || "Website form";
}

async function handleLead(request: Request, env: Env): Promise<Response> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return badRequest("Expected JSON.");
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return badRequest("Invalid JSON.");
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return badRequest("Invalid form submission.");
  }

  const input = payload as Record<string, unknown>;
  const subject = typeof input._subject === "string" ? input._subject.trim() : "";
  const fields = Object.entries(input).filter(([key]) => key !== "_subject");

  if (!subject || subject.length > 120 || !fields.length || fields.length > MAX_FIELDS) {
    return badRequest("Invalid form submission.");
  }

  const sanitized: Record<string, FormField> = {};
  for (const [key, value] of fields) {
    if (!ALLOWED_FIELDS.has(key)) {
      return badRequest("Unexpected form field.");
    }
    if (typeof value !== "string" && typeof value !== "number") {
      return badRequest("Invalid form value.");
    }

    const text = String(value).trim();
    if (!text || text.length > MAX_FIELD_LENGTH) {
      return badRequest("Invalid form value.");
    }
    sanitized[key] = typeof value === "number" ? value : text;
  }

  if ("email" in sanitized && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(sanitized.email))) {
    return badRequest("Invalid email address.");
  }

  const label = formLabel(subject);
  const lines = Object.entries(sanitized).map(([key, value]) => `${key}: ${String(value)}`);
  const rows = Object.entries(sanitized)
    .map(
      ([key, value]) =>
        `<tr><th align="left" style="padding:8px;border:1px solid #ddd">${escapeHtml(key)}</th><td style="padding:8px;border:1px solid #ddd">${escapeHtml(String(value)).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  await env.EMAIL.send({
    to: RECIPIENT,
    from: SENDER,
    replyTo: typeof sanitized.email === "string" ? sanitized.email : undefined,
    subject: `[Fripse] ${label}`,
    text: `${label}\n\n${lines.join("\n")}`,
    html: `<h2>${escapeHtml(label)}</h2><table style="border-collapse:collapse">${rows}</table>`,
  });

  return Response.json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/lead") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405,
          headers: { Allow: "POST" },
        });
      }
      return handleLead(request, env);
    }

    if (url.hostname !== "fripseai.com") {
      url.hostname = "fripseai.com";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
