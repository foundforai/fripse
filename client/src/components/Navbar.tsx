import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import fripseLogo from "../assets/fripse-logo-new.jpeg";

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if scrolled for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If section doesn't exist on current page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };



  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 w-full bg-white z-50 transition-all duration-300 border-b border-gray-200",
        scrolled ? "shadow-lg bg-white/95 backdrop-blur-sm" : "shadow-sm"
      )}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <a 
            href="/" 
            className="block cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img 
              src={fripseLogo} 
              alt="Fripse AI Logo" 
              className="h-20 w-auto block" 
            />
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-secondary font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/assessment" 
              className="text-gray-700 hover:text-secondary font-medium transition-colors"
            >
              Assessment
            </Link>
            <Link 
              href="/proof" 
              className="text-gray-700 hover:text-secondary font-medium transition-colors"
            >
              Proof
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-secondary font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-secondary font-medium transition-colors"
            >
              Blog
            </Link>
            <a 
              href="https://fripse.com/book"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                className="bg-[#007CFF] hover:bg-[#0066CC] text-white font-medium"
                data-testid="button-book-assessment-nav"
                aria-label="Book Assessment"
              >
                Book Assessment
              </Button>
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="md:hidden p-4 h-12 w-12"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="container-custom py-3 space-y-3">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-secondary font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/assessment" 
              className="block text-gray-700 hover:text-secondary font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Assessment
            </Link>
            <Link 
              href="/proof" 
              className="block text-gray-700 hover:text-secondary font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Proof
            </Link>
            <Link 
              href="/about" 
              className="block text-gray-700 hover:text-secondary font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className="block text-gray-700 hover:text-secondary font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <a 
              href="https://fripse.com/book"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                className="w-full bg-[#007CFF] hover:bg-[#0066CC] text-white font-medium"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="button-book-assessment-mobile"
                aria-label="Book Assessment"
              >
                Book Assessment
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
