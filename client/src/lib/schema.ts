import type { BlogPost } from "@/data/blogPosts";

export const SITE = "https://fripse.com";
export const ORG_ID = `${SITE}/#org`;
export const WEBSITE_ID = `${SITE}/#website`;
export const FOUNDER_ID = `${SITE}/#founder`;
export const SERVICE_ID = `${SITE}/#service-assessment`;

export const ORG_NAME = "Fripse AI";
export const ORG_LOGO = `${SITE}/og-image.png`;
export const FOUNDER_NAME = "Dustin Crump";
export const FOUNDER_TITLE = "Founder & CEO";
export const DEFAULT_OG_IMAGE = `${SITE}/og-image.png`;

const ORG_DESCRIPTION =
  "AI business assessment and consulting for professional services and small businesses in the Salt Lake City area. We help you identify where AI saves time and makes money in your workflows.";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function organizationNode() {
  return {
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": ORG_ID,
    name: ORG_NAME,
    url: `${SITE}/`,
    logo: ORG_LOGO,
    image: ORG_LOGO,
    description: ORG_DESCRIPTION,
    telephone: "+1-801-790-0923",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salt Lake City",
      addressRegion: "UT",
      postalCode: "84121",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.6197,
      longitude: -111.8107,
    },
    areaServed: [
      { "@type": "City", name: "Salt Lake City" },
      { "@type": "City", name: "Cottonwood Heights" },
      { "@type": "City", name: "Sandy" },
      { "@type": "City", name: "Draper" },
      { "@type": "City", name: "Murray" },
      { "@type": "AdministrativeArea", name: "Utah" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://foundforai.com",
      "https://www.linkedin.com/in/fripse/",
      "https://x.com/fripseai",
    ],
    founder: { "@id": FOUNDER_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Business Assessment Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "2 Hour AI Business Checkup",
          description:
            "A fast audit for owners and small teams. You leave with 3 to 5 concrete ways to save time or increase revenue.",
          itemOffered: {
            "@type": "Service",
            serviceType: "AI Business Assessment",
          },
        },
        {
          "@type": "Offer",
          name: "1 Day AI Deep Dive",
          description:
            "For teams of 5 to 15. We map workflows, find bottlenecks, and deliver a custom AI playbook your team can use immediately.",
          itemOffered: {
            "@type": "Service",
            serviceType: "Comprehensive AI Business Assessment",
          },
        },
      ],
    },
  };
}

export function founderNode() {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: FOUNDER_NAME,
    jobTitle: FOUNDER_TITLE,
    worksFor: { "@id": ORG_ID },
    url: `${SITE}/about`,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE}/`,
    name: ORG_NAME,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

export function serviceNode() {
  return {
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "AI Business Assessment",
    serviceType: "AI Business Assessment",
    description:
      "Professional AI business assessment that maps where AI saves time and makes money in your workflows.",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Salt Lake County" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE}/book`,
    },
  };
}

export function webPageNode(opts: {
  url: string;
  name: string;
  description?: string;
  dateModified?: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: DEFAULT_OG_IMAGE,
    },
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

export function breadcrumbNode(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostingNode(post: BlogPost) {
  const isFounderAuthored =
    post.author === FOUNDER_NAME || post.author === "Dustin Crump";
  const url = `${SITE}/blog/${post.slug}`;
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: DEFAULT_OG_IMAGE,
    author: isFounderAuthored
      ? { "@id": FOUNDER_ID }
      : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "en-US",
  };
}

export function homepageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      founderNode(),
      websiteNode(),
      serviceNode(),
      webPageNode({
        url: `${SITE}/`,
        name: "AI Business Assessment for Utah Small Businesses | Fripse AI",
        description:
          "Not sure how AI fits your business? Start with an AI Business Assessment that maps where AI saves time and makes money in your workflows.",
      }),
      breadcrumbNode([{ name: "Home", url: `${SITE}/` }]),
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Do you serve contractors in Cottonwood Heights and Sandy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, we serve the entire Salt Lake Valley, including Cottonwood Heights, Sandy, Draper, Murray, and nearby.",
            },
          },
          {
            "@type": "Question",
            name: "How fast can we see results?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most clients see tangible time savings within 2 to 4 weeks, often within the first week for admin automations.",
            },
          },
        ],
      },
    ],
  };
}

export function pageGraph(opts: {
  url: string;
  name: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  extras?: object[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      founderNode(),
      websiteNode(),
      webPageNode({
        url: opts.url,
        name: opts.name,
        description: opts.description,
      }),
      breadcrumbNode(opts.breadcrumbs),
      ...(opts.extras ?? []),
    ],
  };
}

export function blogPostGraph(post: BlogPost) {
  const url = `${SITE}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      founderNode(),
      websiteNode(),
      webPageNode({
        url,
        name: `${post.title} | Fripse AI`,
        description: post.excerpt,
        dateModified: post.updatedAt,
      }),
      breadcrumbNode([
        { name: "Home", url: `${SITE}/` },
        { name: "Blog", url: `${SITE}/blog` },
        { name: post.title, url },
      ]),
      blogPostingNode(post),
    ],
  };
}
