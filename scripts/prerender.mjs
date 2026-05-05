import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.resolve(root, "dist");
const ssrDir = path.resolve(root, "dist-ssr");

const ssrEntryPath = path.resolve(ssrDir, "entry-server.js");
const ssrModule = await import(pathToFileURL(ssrEntryPath).href);
const { render, ROUTES } = ssrModule;

const template = await fs.readFile(
  path.resolve(distDir, "index.html"),
  "utf-8",
);

const renderHelmetTag = (tag) => (tag && typeof tag.toString === "function" ? tag.toString() : "");

let success = 0;
let failed = 0;

for (const route of ROUTES) {
  try {
    const { html, helmet } = render(route);

    const head = [
      renderHelmetTag(helmet.title),
      renderHelmetTag(helmet.meta),
      renderHelmetTag(helmet.link),
      renderHelmetTag(helmet.script),
    ]
      .filter(Boolean)
      .join("\n    ");

    const finalHtml = template
      .replace("<!--app-head-->", head)
      .replace("<!--app-html-->", html);

    const outPath =
      route === "/"
        ? path.resolve(distDir, "index.html")
        : path.resolve(distDir, route.replace(/^\//, ""), "index.html");

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, finalHtml, "utf-8");
    console.log(`  ✓ ${route}`);
    success++;
  } catch (err) {
    console.error(`  ✗ ${route}: ${err.message}`);
    failed++;
  }
}

await fs.rm(ssrDir, { recursive: true, force: true });

console.log(`\nPrerendered ${success} routes, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
}
