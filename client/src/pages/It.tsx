import React from "react";
import { ArrowRight, Headphones, Laptop, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { SITE } from "@/lib/schema";

const PAGE_TITLE = "Your IT department, from day one | Fripse AI";
const PAGE_DESCRIPTION =
  "IT for funded startups from Seed to Series B. Foundation setup, a help desk, and SOC 2 readiness, with one person who owns your IT.";

const BOOKING_HREF = "/book";

interface Offer {
  title: string;
  price: string;
  detail: string;
  icon: LucideIcon;
}

const offers: Offer[] = [
  {
    title: "IT Foundation setup",
    price: "One-time, $6,000 to $12,000",
    detail:
      "Google Workspace or Microsoft 365 cleaned up, single sign-on with Okta or Google, every laptop managed with Jamf or Intune, a security baseline, and onboarding and offboarding that take minutes instead of a day.",
    icon: Laptop,
  },
  {
    title: "Managed IT and help desk",
    price: "$175 per user per month, $2,500 minimum",
    detail:
      "Your team gets a help desk that answers. We handle devices, accounts, software, vendors and security, plus a quarterly roadmap review with you.",
    icon: Headphones,
  },
  {
    title: "SOC 2 readiness",
    price: "From $20,000",
    detail:
      "Gap assessment, policies, controls and audit support, so the first enterprise security questionnaire doesn't stall a deal.",
    icon: ShieldCheck,
  },
  {
    title: "AI automation",
    price: "Optional add-on, $1,500 to $3,000 per month",
    detail: "We automate the repetitive ops work your team is doing by hand.",
    icon: Sparkles,
  },
];

const comparisons = [
  {
    label: "Full-time IT hire",
    figure: "$100k+ a year",
    detail: "Costs $100k+ a year with benefits, and one person can't cover everything.",
  },
  {
    label: "Fully managed IT",
    figure: "$145 per user per month",
    detail: "Averages $145 per user per month across the market.",
  },
  {
    label: "Fripse",
    figure: "Just above the market",
    detail:
      "Priced just above that, because you get startup-grade identity, device management and a named owner from day one.",
  },
];

function bookButtonClass(extra = "") {
  return `bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${extra}`;
}

export default function It() {
  const pageUrl = `${SITE}/it/`;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Seo
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/it"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE}/#org`,
              name: "Fripse AI",
              url: `${SITE}/`,
            },
            {
              "@type": "WebPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name: PAGE_TITLE,
              description: PAGE_DESCRIPTION,
              isPartOf: { "@id": `${SITE}/#website` },
              about: { "@id": `${SITE}/#org` },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "IT for funded startups",
                  item: pageUrl,
                },
              ],
            },
            {
              "@type": "Service",
              name: "IT for funded startups",
              serviceType: "Managed IT for startups",
              description: PAGE_DESCRIPTION,
              provider: { "@id": `${SITE}/#org` },
              url: pageUrl,
              offers: [
                {
                  "@type": "Offer",
                  name: "IT Foundation setup",
                  description: offers[0].detail,
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: "6000",
                    maxPrice: "12000",
                    priceCurrency: "USD",
                  },
                },
                {
                  "@type": "Offer",
                  name: "Managed IT and help desk",
                  description: offers[1].detail,
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "175",
                    priceCurrency: "USD",
                    unitText: "user per month",
                    minPrice: "2500",
                  },
                },
                {
                  "@type": "Offer",
                  name: "SOC 2 readiness",
                  description: offers[2].detail,
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: "20000",
                    priceCurrency: "USD",
                  },
                },
                {
                  "@type": "Offer",
                  name: "AI automation",
                  description: offers[3].detail,
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    minPrice: "1500",
                    maxPrice: "3000",
                    priceCurrency: "USD",
                    unitText: "month",
                  },
                },
              ],
            },
          ],
        }}
      />
      <Navbar activeSection="" />

      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#007CFF] mb-4">
              IT for funded startups
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your IT department, from day one
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              For startups that just raised, Seed to Series B, with 15 to 150 people and no IT person. The founder or ops lead is the one resetting passwords and buying laptops.
            </p>
            <Button
              asChild
              size="lg"
              className={bookButtonClass("text-xl px-12 py-6")}
            >
              <a href={BOOKING_HREF}>
                Book a 20-minute call
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" aria-labelledby="offers-heading">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 id="offers-heading" className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Four offers
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {offers.map((offer) => {
                const Icon = offer.icon;
                return (
                  <article
                    key={offer.title}
                    className="flex flex-col bg-gray-50 p-8 rounded-lg border-2 border-gray-200"
                  >
                    <Icon className="w-12 h-12 text-[#007CFF] mb-6" aria-hidden="true" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{offer.title}</h3>
                    <p className="text-lg font-semibold text-[#007CFF] mb-4">{offer.price}</p>
                    <p className="text-gray-700 leading-relaxed">{offer.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" aria-labelledby="why-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 id="why-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Fripse
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              I've built IT departments from scratch, including at a 200-person startup, and I've led a SOC 2 audit. I've also run IT support teams at a large company. Okta, Jamf, Intune, Google Workspace and Entra ID are what I do every day. You get someone who has already solved the problems you're about to hit, and one person who owns your IT.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" aria-labelledby="compare-heading">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 id="compare-heading" className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              How it compares
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center mb-12">
              A full-time IT hire costs $100k+ a year with benefits, and one person can't cover everything. Fully managed IT averages $145 per user per month across the market. We're priced just above that because you get startup-grade identity, device management and a named owner from day one.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {comparisons.map((item) => (
                <article
                  key={item.label}
                  className="bg-white p-8 rounded-lg border-2 border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.label}</h3>
                  <p className="text-lg font-semibold text-[#007CFF] mb-3">{item.figure}</p>
                  <p className="text-gray-700 leading-relaxed">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" aria-labelledby="cta-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center bg-white rounded-lg p-10 md:p-12 border border-gray-200">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              A 20-minute call
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              I'll ask about your tools and hiring plan and tell you what to fix first, whether or not you hire us.
            </p>
            <Button
              asChild
              size="lg"
              className={bookButtonClass("text-xl px-12 py-6")}
            >
              <a href={BOOKING_HREF}>
                Book a 20-minute call
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer showPartnerLink={false} />
    </div>
  );
}
