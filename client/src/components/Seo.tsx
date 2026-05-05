import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE } from "@/lib/schema";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: "website" | "article";
  jsonLd?: object | object[];
  noindex?: boolean;
}

export default function Seo({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
  noindex = false,
}: SeoProps) {
  const url = path.startsWith("http") ? path : `${SITE}${path}`;
  const ldArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {ldArray.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          // helmet-async serializes children as text for script tags
        >
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}
