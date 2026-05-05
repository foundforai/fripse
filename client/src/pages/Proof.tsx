import React from "react";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Clock, DollarSign, Users, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { pageGraph, SITE } from "@/lib/schema";

const Proof: React.FC = () => {
  const description =
    "Real outcomes from Fripse AI engagements: hours saved, revenue gained, and the workflow changes that made it happen.";

  return (
    <div className="min-h-screen">
      <Seo
        title="Proof — Real Results from Fripse AI Clients"
        description={description}
        path="/proof"
        jsonLd={pageGraph({
          url: `${SITE}/proof`,
          name: "Proof — Real Results from Fripse AI Clients",
          description,
          breadcrumbs: [
            { name: "Home", url: `${SITE}/` },
            { name: "Proof", url: `${SITE}/proof` },
          ],
        })}
      />
      <Navbar activeSection="proof" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Real Results from Our AI Assessments
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              See how businesses across Utah are using AI to save time, reduce costs, and increase revenue after our assessment process
            </p>
          </div>
        </div>
      </section>

      {/* Results Overview */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
              Assessment Impact by the Numbers
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Clock className="w-12 h-12 text-[#007CFF] mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2" data-testid="stat-time-saved">15-30 hrs</div>
                <p className="text-gray-700">Average time saved per week after implementation</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <DollarSign className="w-12 h-12 text-[#007CFF] mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2" data-testid="stat-cost-reduction">40%</div>
                <p className="text-gray-700">Average reduction in operational costs</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <TrendingUp className="w-12 h-12 text-[#007CFF] mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2" data-testid="stat-revenue-increase">25%</div>
                <p className="text-gray-700">Average increase in revenue within 90 days</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Users className="w-12 h-12 text-[#007CFF] mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2" data-testid="stat-businesses-helped">150+</div>
                <p className="text-gray-700">Utah businesses transformed with AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
              Client Success Stories
            </h2>
            
            <div className="space-y-12">
              {/* Case Study 1 */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" data-testid="case-study-title-1">
                      Salt Lake City Marketing Agency
                    </h3>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      "After our 1 Day Deep Dive, we automated our client reporting process that was taking 20 hours per week. 
                      Now it takes 2 hours, and the reports are actually more detailed and accurate."
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700"><strong>Time Saved:</strong> 18 hours/week on reporting</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700"><strong>Cost Reduction:</strong> $3,600/month in labor costs</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700"><strong>Revenue Impact:</strong> Took on 3 more clients with saved time</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-center p-6 bg-[#007CFF]/5 rounded-lg border border-[#007CFF]/20">
                      <div className="text-4xl font-bold text-[#007CFF] mb-2">90%</div>
                      <p className="text-gray-700 font-semibold">Less Time on Reports</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" data-testid="case-study-title-2">
                      Utah County E-commerce Business
                    </h3>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      "The 2 Hour Checkup identified 5 bottlenecks in our order processing. We implemented their AI recommendations 
                      and reduced order processing time by 60%. Customer satisfaction scores went up significantly."
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700"><strong>Time Saved:</strong> 12 hours/week on order processing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700"><strong>Customer Impact:</strong> 40% improvement in satisfaction scores</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700"><strong>Revenue Impact:</strong> 30% increase in monthly revenue</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-4xl font-bold text-green-600 mb-2">60%</div>
                      <p className="text-gray-700 font-semibold">Faster Order Processing</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" data-testid="case-study-title-3">
                      Davis County Professional Services
                    </h3>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      "We thought AI was too complicated for our small firm. The Deep Dive showed us 8 specific ways to use AI 
                      in our daily work. Six months later, we're handling 50% more clients with the same team size."
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700"><strong>Capacity:</strong> 50% more clients with same team</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700"><strong>Revenue Impact:</strong> $80K additional monthly revenue</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700"><strong>Implementation:</strong> Results visible within 30 days</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="text-4xl font-bold text-yellow-600 mb-2">50%</div>
                      <p className="text-gray-700 font-semibold">More Clients Served</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
              What Our Clients Say
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "The assessment process was eye-opening. We had no idea how much time we were wasting on manual tasks. 
                  The roadmap they provided was clear and actionable."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900" data-testid="testimonial-author-1">Sarah Mitchell</p>
                  <p className="text-sm text-gray-600">CEO, Alpine Marketing</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "Best investment we made this year. The AI tools they recommended save us 20 hours a week. 
                  Our profit margins improved significantly."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900" data-testid="testimonial-author-2">Mike Rodriguez</p>
                  <p className="text-sm text-gray-600">Operations Director, Wasatch Supply Co.</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "They made AI accessible for our team. The training materials were perfect, and the ongoing support 
                  helped us implement everything successfully."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900" data-testid="testimonial-author-3">Jennifer Lee</p>
                  <p className="text-sm text-gray-600">Founder, Park City Consulting</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "We were skeptical about AI, but the assessment showed us practical applications we could implement immediately. 
                  Our customer service improved dramatically."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900" data-testid="testimonial-author-4">David Park</p>
                  <p className="text-sm text-gray-600">Owner, Summit Services</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "The deep dive session was worth every penny. They found inefficiencies we didn't even know existed. 
                  Our team is now more productive than ever."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900" data-testid="testimonial-author-5">Lisa Wong</p>
                  <p className="text-sm text-gray-600">COO, Jordan Valley Tech</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "Fripse doesn't just talk about AI - they show you exactly how to use it. The playbook they created for us 
                  has been our guide to consistent growth."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900" data-testid="testimonial-author-6">Robert Johnson</p>
                  <p className="text-sm text-gray-600">President, Ogden Manufacturing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#007CFF]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Ready to Get These Results for Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join 150+ Utah businesses that have transformed their operations with AI. Book your assessment today.
            </p>
            
            <Button 
              asChild
              size="lg"
              className="bg-white hover:bg-gray-100 text-[#007CFF] font-semibold text-xl px-12 py-6"
              data-testid="button-book-assessment-proof"
            >
              <a 
                href="https://fripse.com/book"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Your AI Assessment
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

export default Proof;