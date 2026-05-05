import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Booking() {
  // Update page title and meta description for SEO
  useEffect(() => {
    document.title = "Book a Free AI Strategy Call - Fripse AI";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Book your free 30-minute AI strategy call with Fripse AI. We'll identify your biggest time drain and show you how to automate it with no pressure and no tech jargon.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeSection="booking" />
      
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Book a Free AI Strategy Call
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Schedule your free 30-minute consultation with our AI experts. We'll identify your biggest time drain and show you exactly how to automate it—with no pressure and no tech jargon.
              </p>
            </div>
            
            {/* Calendar Container */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Choose Your Preferred Time
                </h2>
                <p className="text-gray-600">
                  Select a time that works best for you - no commitment required
                </p>
              </div>
              
              {/* Embedded Calendar */}
              <div className="relative">
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2Q0ZET91WXgP9MG9yK8fFooZcSxs4zoSjiHW2xEbvuAs1ZStM5qvQdzkf5wcz1P25_im7nQ6_J?gv=true"
                  style={{ border: 0 }}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Fripse AI Booking"
                  loading="lazy"
                  className="rounded-lg"
                />
              </div>
              
              {/* Footer Note */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Can't find a suitable time? Email us at <a href="mailto:info@fripse.com" className="text-primary hover:text-primary/80 font-medium">info@fripse.com</a> and we'll work something out.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}