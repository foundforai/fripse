import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { pageGraph, SITE } from "@/lib/schema";

const SmsOptIn: React.FC = () => {
  const description =
    "SMS messaging terms and conditions for Fripse AI services. Learn about our text messaging policies and how to opt out.";

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="SMS Opt-In Disclosure - Fripse AI"
        description={description}
        path="/sms-optin"
        jsonLd={pageGraph({
          url: `${SITE}/sms-optin`,
          name: "SMS Opt-In Disclosure - Fripse AI",
          description,
          breadcrumbs: [
            { name: "Home", url: `${SITE}/` },
            { name: "SMS Opt-In", url: `${SITE}/sms-optin` },
          ],
        })}
      />

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
