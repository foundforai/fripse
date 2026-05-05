import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SmsOptIn: React.FC = () => {
  useEffect(() => {
    // Add JSON-LD schema markup for legal notice
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "SMS Opt-In Disclosure",
      "description": "SMS messaging terms and conditions for Fripse AI services",
      "url": "https://www.fripse.com/sms-optin",
      "mainEntity": {
        "@type": "LegalService",
        "name": "SMS Opt-In Agreement",
        "description": "Terms and conditions for SMS messaging services",
        "provider": {
          "@type": "Organization",
          "name": "Fripse AI",
          "url": "https://www.fripse.com"
        }
      },
      "about": {
        "@type": "Thing",
        "name": "SMS Messaging Terms",
        "description": "Legal disclosure for SMS messaging consent and opt-out procedures"
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>SMS Opt-In Disclosure - Fripse AI</title>
        <meta name="description" content="SMS messaging terms and conditions for Fripse AI services. Learn about our text messaging policies and how to opt out." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.fripse.com/sms-optin" />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="SMS Opt-In Disclosure - Fripse AI" />
        <meta property="og:description" content="SMS messaging terms and conditions for Fripse AI services." />
        <meta property="og:url" content="https://www.fripse.com/sms-optin" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="SMS Opt-In Disclosure - Fripse AI" />
        <meta name="twitter:description" content="SMS messaging terms and conditions for Fripse AI services." />
      </Helmet>
      
      <Navbar activeSection="" />
      
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border p-8 md:p-12">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                SMS Opt-In Disclosure
              </h1>
              
              <div className="prose prose-lg max-w-none text-center">
                <p className="text-gray-700 leading-relaxed mb-6">
                  By texting our estimator number, you agree to receive SMS messages 
                  related to project quotes, updates, and customer service. Message 
                  and data rates may apply. Reply <strong>STOP</strong> at any time to opt out.
                </p>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    This disclosure is part of our commitment to transparent communication 
                    practices. For questions about our messaging policies, please contact us 
                    at <a href="mailto:info@fripse.com" className="text-[#007CFF] hover:text-blue-700">info@fripse.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SmsOptIn;