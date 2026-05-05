import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { submitToFormspree } from "@/lib/formspree";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const Hero: React.FC = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      await submitToFormspree({ email }, "Fripse newsletter signup");
    },
    onSuccess: () => {
      setEmail("");
      toast({
        title: "Success!",
        description: "You've been added to our newsletter.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <>
      {/* New CTA Hero Section */}
      <section className="pt-16 pb-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Automate Smarter. <span className="text-[#007CFF]">Grow Faster.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Book your free 30-minute AI strategy call. We'll find your biggest time drain and show you how to fix it—with no pressure and no tech jargon.
            </p>
            <Link href="/book">
              <Button 
                size="lg" 
                className="text-xl px-12 py-6 bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Book My Free AI Call
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Original Hero Section - Now Secondary */}
      <section className="pt-8 pb-16 md:pb-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 leading-tight">
                AI Consulting for Small Business
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Transform your Utah small business with AI automation. From streamlining operations to enhancing client communications, we help local businesses in the Salt Lake City area save time, improve efficiency, and scale faster.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/book">
                  <Button 
                    className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-6 px-6 h-auto shadow-md hover:shadow-lg"
                    size="lg"
                  >
                    Book a Free AI Strategy Call
                  </Button>
                </Link>
                
                <div className="relative">
                  <form onSubmit={handleNewsletterSubmit} className="flex items-center">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="w-full py-6 pl-4 pr-32 h-auto rounded-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button
                      type="submit"
                      className="absolute right-0 top-0 h-full rounded-l-none bg-gray-200 hover:bg-gray-300 text-gray-800"
                      disabled={newsletterMutation.isPending}
                    >
                      {newsletterMutation.isPending ? "Joining..." : "Join Newsletter"}
                    </Button>
                  </form>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Not ready yet? Join our newsletter to see what's possible.
              </p>
            </div>
            
            <div className="md:w-1/2 md:pl-10">
              <img 
                src="https://images.unsplash.com/photo-1744627049721-73c27008ad28?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Utah AI consulting team helping contractors implement automation solutions" 
                className="rounded-xl shadow-xl w-full h-auto"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
