import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { blogPosts } from "./data/blogPosts";

export interface RenderResult {
  html: string;
  helmet: any;
}

export function render(path: string): RenderResult {
  const helmetContext: any = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <App ssrPath={path} />
    </HelmetProvider>,
  );
  return { html, helmet: helmetContext.helmet };
}

export const ROUTES: string[] = [
  "/",
  "/about",
  "/assessment",
  "/proof",
  "/quiz",
  "/book",
  "/booking",
  "/blog",
  ...blogPosts.map((p) => `/blog/${p.slug}`),
  "/sms-optin",
  "/lead-capture-demo",
];
