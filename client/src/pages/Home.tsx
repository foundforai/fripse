import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Clock, Target, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminLink from "@/components/AdminLink";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar activeSection="" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Not sure how AI fits your business?
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Start with an AI Business Assessment that maps where AI saves time and makes money in your workflows
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://fripse.com/book"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-6 bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="button-book-assessment-hero"
                >
                  Book Assessment
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
              
              <a 
                href="/quiz"
                className="text-[#007CFF] hover:text-[#0066CC] font-medium underline"
                data-testid="link-quiz-hero"
              >
                Take the 5 minute AI Readiness Quiz
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              How it works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#007CFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Assessment</h3>
                <p className="text-gray-700 leading-relaxed">
                  Choose a 2 Hour Checkup or a 1 Day Deep Dive. We interview your team, review processes, and identify 3 to 10 high impact opportunities
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#007CFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Roadmap and Training</h3>
                <p className="text-gray-700 leading-relaxed">
                  You receive a practical playbook with exact prompts, workflows, and roles. We train your staff so it sticks
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#007CFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Implementation</h3>
                <p className="text-gray-700 leading-relaxed">
                  If you want help, we implement the highest ROI items and track results
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <div className="mb-6">
                  <Clock className="w-8 h-8 text-[#007CFF] mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">2 Hour AI Business Checkup</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A fast audit for owners and small teams. You leave with 3 to 5 concrete ways to save time or increase revenue
                  </p>
                </div>
                <a 
                  href="https://fripse.com/book"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    className="w-full bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold"
                    data-testid="button-book-checkup"
                  >
                    Book the 2 Hour Checkup
                  </Button>
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <div className="mb-6">
                  <Target className="w-8 h-8 text-[#007CFF] mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">1 Day AI Deep Dive</h3>
                  <p className="text-gray-700 leading-relaxed">
                    For teams of 5 to 15. We map workflows, find bottlenecks, and deliver a custom AI playbook your team can use immediately
                  </p>
                </div>
                <a 
                  href="https://fripse.com/book"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    className="w-full bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold"
                    data-testid="button-book-deep-dive"
                  >
                    Book the 1 Day Deep Dive
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-medium text-[#007CFF] mb-4 text-center">Recent client wins</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700 leading-relaxed">
                  Flooring company reduced texting chaos, centralized notes, and captured KPIs with a simple company OS and GPT workflows
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700 leading-relaxed">
                  Project team scaled workload without new hires by automating status updates, follow ups, and documentation
                </p>
              </div>
            </div>
            
            <div className="bg-[#007CFF]/10 border border-[#007CFF]/20 rounded-lg p-6 text-center">
              <p className="text-gray-800 font-medium">
                Want the details? Ask for the Sparkle OS case summary on our call
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fripse Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <Users className="w-8 h-8 text-[#007CFF] mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Utah local, hands on, tool agnostic</h3>
              </div>
              
              <div>
                <Target className="w-8 h-8 text-[#007CFF] mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Practical over hype, we use the tools you already have</h3>
              </div>
              
              <div>
                <Check className="w-8 h-8 text-[#007CFF] mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Measurable outcomes, hours saved and errors reduced</h3>
              </div>
            </div>
            
            <a 
              href="https://fripse.com/book"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                className="bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold"
                data-testid="button-book-assessment-micro"
              >
                Book Assessment
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Not ready yet Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Take the 5 minute AI Readiness Quiz
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Find out where AI fits today and what to do first
            </p>
            
            <a href="/quiz">
              <Button 
                size="lg"
                className="bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold"
                data-testid="button-start-quiz"
              >
                Start the Quiz
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">FAQ</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">How fast can we see results?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Most clients see time savings within one to two weeks for admin and communication use cases
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Do you only work with contractors?</h3>
                <p className="text-gray-700 leading-relaxed">
                  We work with professional and service businesses across the Salt Lake Valley, including contractors, tax and accounting, and home services
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">What do the sessions include?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Interviews, workflow mapping, prompt design, a prioritized roadmap, and optional team training
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA bar */}
      <section className="py-16 bg-[#007CFF]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Ready to see where AI fits in your business?
            </h2>
            
            <a 
              href="https://fripse.com/book"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg"
                className="bg-white text-[#007CFF] hover:bg-gray-100 font-semibold text-xl px-12 py-6"
                data-testid="button-book-assessment-final"
              >
                Book Your Assessment
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
      <AdminLink />
    </div>
  );
};

export default Home;
