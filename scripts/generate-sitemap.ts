import { createWriteStream } from "fs";
import { SitemapStream } from "sitemap";

const sitemap = new SitemapStream({ hostname: "https://www.fripse.com" });

const pages = [
  "/",
  "/about", 
  "/blog",
  "/book",
  "/blog/ai-gets-heart-emotional-intelligence-next-frontier-language-models",
  "/blog/meta-ai-power-play-human-created-advertising-way-out", 
  "/blog/perplexity-780m-query-surge-small-business-ai-strategy",
  "/blog/seo-changing-fast-website-ai-schema-markup-optimization",
  "/blog/how-to-prepare-website-age-ai-search"
];

const writeStream = createWriteStream("./client/public/sitemap.xml");
sitemap.pipe(writeStream);

pages.forEach((path) => {
  sitemap.write({ 
    url: path, 
    changefreq: "weekly", 
    priority: path === "/" ? 1.0 : 0.8 
  });
});

sitemap.end();

console.log("Sitemap generated successfully at ./client/public/sitemap.xml");