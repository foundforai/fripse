import React, { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFoundPage() {
  // Update page title for SEO
  useEffect(() => {
    document.title = "404 - Page Not Found | Fripse AI";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "The page you're looking for doesn't exist. Return to Fripse AI homepage for AI consulting services in Utah.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeSection="404" />
      
      <div className="pt-24 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            
            {/* 404 Header */}
            <div className="mb-12">
              <h1 className="text-8xl font-bold text-gray-200 mb-4">404</h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Page Not Found
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back to exploring how AI can transform your business.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button 
                  size="lg"
                  className="bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold px-8 py-6 text-lg"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go to Homepage
                </Button>
              </Link>
              
              <Link href="/blog">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Read Our Blog
                </Button>
              </Link>
            </div>
            
            {/* Popular Pages */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Popular Pages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/about">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all">
                    <h4 className="font-medium text-gray-900 mb-2">About Us</h4>
                    <p className="text-sm text-gray-600">Learn about Fripse AI</p>
                  </div>
                </Link>
                
                <Link href="/book">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all">
                    <h4 className="font-medium text-gray-900 mb-2">Book a Call</h4>
                    <p className="text-sm text-gray-600">Schedule your AI consultation</p>
                  </div>
                </Link>
                
                <Link href="/blog">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all">
                    <h4 className="font-medium text-gray-900 mb-2">AI Insights</h4>
                    <p className="text-sm text-gray-600">Read our latest articles</p>
                  </div>
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}