import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Target, Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Assessment: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar activeSection="" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI Business Assessment
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Choose a 2 Hour Checkup or a 1 Day Deep Dive. We interview your team, review processes, and identify 3 to 10 high impact opportunities
            </p>
            
            <Button 
              asChild
              size="lg" 
              className="text-xl px-12 py-6 bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              data-testid="button-book-assessment-hero"
            >
              <a 
                href="https://fripse.com/book"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Your Assessment
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Detailed Offers Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
              Choose Your Assessment
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* 2 Hour Checkup */}
              <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
                <div className="mb-8">
                  <Clock className="w-12 h-12 text-[#007CFF] mb-6" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">2 Hour AI Business Checkup</h3>
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                    A fast audit for owners and small teams. You leave with 3 to 5 concrete ways to save time or increase revenue
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Session Agenda:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">30-minute team interview about current workflows</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">45-minute process review and bottleneck identification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">30-minute AI opportunity mapping</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">15-minute next steps and priority roadmap</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">You'll Receive:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Written summary of findings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">3-5 specific AI implementation recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Prioritized action plan with time savings estimates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Follow-up email support for 30 days</span>
                    </li>
                  </ul>
                </div>

                <Button 
                  asChild
                  className="w-full bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold text-lg py-6"
                  data-testid="button-book-checkup-detailed"
                >
                  <a 
                    href="https://fripse.com/book"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book the 2 Hour Checkup
                  </a>
                </Button>
              </div>
              
              {/* 1 Day Deep Dive */}
              <div className="bg-[#007CFF]/5 p-8 rounded-lg border-2 border-[#007CFF]">
                <div className="mb-8">
                  <Target className="w-12 h-12 text-[#007CFF] mb-6" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">1 Day AI Deep Dive</h3>
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                    For teams of 5 to 15. We map workflows, find bottlenecks, and deliver a custom AI playbook your team can use immediately
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Full-Day Agenda:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>Morning (3 hours):</strong> Comprehensive team interviews and workflow documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>Midday (2 hours):</strong> Process mapping and bottleneck analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>Afternoon (2.5 hours):</strong> AI opportunity identification and solution design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>End (1.5 hours):</strong> Team training session and implementation planning</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Complete Deliverables:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Custom AI playbook with exact prompts and workflows</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Detailed workflow maps and optimization recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Team training materials and role assignments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">90-day implementation roadmap with milestones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Follow-up support for 90 days</span>
                    </li>
                  </ul>
                </div>

                <Button 
                  asChild
                  className="w-full bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold text-lg py-6"
                  data-testid="button-book-deep-dive-detailed"
                >
                  <a 
                    href="https://fripse.com/book"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book the 1 Day Deep Dive
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What Happens After Your Assessment?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#007CFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Roadmap and Training</h3>
                <p className="text-gray-700 leading-relaxed">
                  You receive a practical playbook with exact prompts, workflows, and roles. We train your staff so it sticks
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#007CFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">You Implement</h3>
                <p className="text-gray-700 leading-relaxed">
                  Start with the highest ROI opportunities. Most clients see time savings within 1-2 weeks
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#007CFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Optional Support</h3>
                <p className="text-gray-700 leading-relaxed">
                  If you want help, we implement the highest ROI items and track results
                </p>
              </div>
            </div>
            
            <Button 
              asChild
              size="lg"
              className="bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold text-xl px-12 py-6"
              data-testid="button-book-assessment-final"
            >
              <a 
                href="https://fripse.com/book"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Your Assessment Today
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Assessment;