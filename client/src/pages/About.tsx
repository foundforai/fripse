import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutBannerImage from "@assets/fripse about_1755483059665.png";
import dustinPhoto from "@assets/Dustin RE Headshot_1755547418259.jpg";

export default function About() {

  // Update page title and add schema markup for SEO
  useEffect(() => {
    document.title = "About Fripse AI - Utah AI Consulting for Small Business";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Fripse AI is a human-led consulting company helping small businesses in home services, professional services, and field-based industries streamline operations with custom AI solutions.");
    }

    // Add JSON-LD schema markup for the About page
    const existingSchema = document.querySelector('#about-page-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaScript = document.createElement('script');
    schemaScript.id = 'about-page-schema';
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Fripse AI",
      "description": "AI consulting and automation services for small businesses in Utah",
      "url": "https://fripse.com/about",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Salt Lake City",
        "addressRegion": "UT",
        "addressCountry": "US"
      },
      "areaServed": ["Utah", "Salt Lake City", "Professional Services", "Home Services"],
      "serviceType": ["AI Consulting", "Business Automation", "AI Implementation", "Workflow Design"],
      "founder": {
        "@type": "Person",
        "name": "Dustin Crump"
      },
      "sameAs": [
        "https://foundforai.com"
      ]
    });
    document.head.appendChild(schemaScript);

    return () => {
      const schema = document.querySelector('#about-page-schema');
      if (schema) {
        schema.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeSection="about" />
      
      {/* Hero Banner */}
      <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden relative mt-28">
        <img 
          src={aboutBannerImage}
          alt="Fripse AI Team - Professional AI Consulting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About Fripse AI
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
              Human-led AI consulting for Utah small businesses
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            
            <section className="text-center mb-16">
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Fripse AI is a human-led consulting company helping small businesses, especially in home services, professional services, and field-based industries, streamline operations, save time, and grow faster with custom AI solutions. Based in Utah and serving clients nationwide, we specialize in turning messy workflows into automated systems using tools like ChatGPT, Zapier, and AI-enabled CRMs.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Does Fripse AI Do?</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We design, build, and deploy AI-powered systems tailored to how your business actually runs. From automating job updates and estimating tools to streamlining client communication, we help companies get more done with less stress — without needing a tech team.
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary font-semibold mr-3">✔️</span>
                  <span>Workflow & SOP design with AI automation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-semibold mr-3">✔️</span>
                  <span>Custom GPTs and tools to reduce brainload</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-semibold mr-3">✔️</span>
                  <span>Sales systems for quoting, follow-up, and client conversion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-semibold mr-3">✔️</span>
                  <span>AI audits for small business operations</span>
                </li>
              </ul>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Work With</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Fripse AI works with business owners and teams who are tired of juggling text threads, spreadsheets, and scattered tools. Our clients include:
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">🏠</span>
                    <span>Home services and cleaning companies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">💼</span>
                    <span>Professional services firms</span>
                  </li>
                </ul>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">🧰</span>
                    <span>Service-based businesses needing operational help</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">📈</span>
                    <span>Founders building lean, tech-savvy businesses without hiring a full ops team</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-12 mb-16 text-white">
              <h2 className="text-3xl font-bold mb-6">Why Fripse AI?</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Most consultants either give you a 40-slide strategy doc or try to sell you software you don't need. We're different.
              </p>
              <ul className="space-y-4 text-gray-300 mb-8">
                <li className="flex items-start">
                  <span className="text-primary font-semibold mr-3">•</span>
                  <span>We build <strong className="text-white">custom tools</strong> that fit your real-life workflows.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-semibold mr-3">•</span>
                  <span>We focus on <strong className="text-white">human-first automation</strong> — no confusing tech lingo.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-semibold mr-3">•</span>
                  <span>We work fast, charge fairly, and don't lock you into anything.</span>
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Whether you want a fully automated estimating system, a better CRM setup, or just someone to take all the post-it notes out of your head and turn them into a workflow — we've got you.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet the Founder</h2>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="md:w-1/3">
                  <img 
                    src={dustinPhoto}
                    alt="Dustin Crump - Founder of Fripse AI"
                    className="w-64 h-80 rounded-lg object-contain shadow-lg mx-auto md:mx-0 bg-gray-50"
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Fripse AI was founded by Dustin Crump, a systems strategist, AI consultant, and builder with 25+ years in IT, operations, and sales. Dustin has led teams at Tesla and multiple startups, designing processes still in use today. He's helped businesses across the U.S. cut wasted hours, unlock hidden efficiency, and scale with confidence by putting AI to work in the real world.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    What sets Dustin apart is his ability to bridge the gap between cutting-edge technology and day-to-day business reality. He doesn't just talk AI, he implements it in ways that save time, increase margins, and free owners from the grind.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-primary/5 rounded-lg p-12 border border-primary/10 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Let's Talk</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                If you're looking to take the chaos out of your business and finally build systems that scale — book a free consultation and let's map it out together.
              </p>
              <Link href="/book">
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-6 bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Book Your Free Strategy Call Today
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </section>

          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}