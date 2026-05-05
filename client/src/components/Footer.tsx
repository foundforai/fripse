import React from "react";
import { Linkedin, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Footer: React.FC = () => {
  // Handle smooth scrolling to different sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="text-2xl font-bold mb-4">Fripse AI</div>
            <p className="text-gray-400 max-w-xs mb-4">AI Business Assessments to help Utah businesses save time and increase revenue.</p>
            <div className="text-gray-400 text-sm">
              <p className="mb-1">📍 Salt Lake City, Utah</p>
              <p className="mb-2">Serving the greater Salt Lake Valley including:</p>
              <p className="text-xs leading-relaxed">Salt Lake City • Park City • Provo • Ogden • West Valley City • Sandy • West Jordan • Orem • Taylorsville • Murray • Millcreek • Cottonwood Heights • Draper • South Jordan • Lehi • Riverton • Midvale • American Fork • Bountiful • Clearfield</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Assessments</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/assessment" className="text-gray-400 hover:text-white transition-colors">
                    2 Hour AI Business Checkup
                  </Link>
                </li>
                <li>
                  <Link href="/assessment" className="text-gray-400 hover:text-white transition-colors">
                    1 Day AI Deep Dive
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="text-gray-400 hover:text-white transition-colors">
                    AI Readiness Quiz
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
                </li>
                <li>
                  <Link href="/proof" className="text-gray-400 hover:text-white transition-colors">Success Stories</Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Button 
                    asChild
                    className="bg-[#007CFF] hover:bg-[#0066CC] text-white font-medium"
                  >
                    <a 
                      href="https://fripse.com/book"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Assessment
                    </a>
                  </Button>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Get in Touch
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 mb-4 md:mb-0">
            <p className="text-sm mb-2">
              Need AI SEO readiness? Visit <a href="https://foundforai.com" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors underline">Found For AI</a>.
            </p>
            &copy; {new Date().getFullYear()} Fripse. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
