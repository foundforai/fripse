const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqwvlnz";

export async function submitToFormspree(
  data: Record<string, unknown>,
  subject: string,
): Promise<void> {
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...data, _subject: subject }),
  });
  if (!res.ok) {
    throw new Error(`Form submission failed (${res.status})`);
  }
}
