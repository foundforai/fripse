import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { pageGraph, SITE } from "@/lib/schema";

const Proof: React.FC = () => {
  const description =
    "What a Fripse AI business assessment covers, what you receive, and how to decide whether an implementation is worth pursuing.";

  return (
    <div className="min-h-screen">
      <Seo
        title="What a Fripse AI Assessment Produces"
        description={description}
        path="/proof"
        jsonLd={pageGraph({
          url: `${SITE}/proof`,
          name: "What a Fripse AI Assessment Produces",
          description,
          breadcrumbs: [
            { name: "Home", url: `${SITE}/` },
            { name: "Assessment outcomes", url: `${SITE}/proof` },
          ],
        })}
      />
      <Navbar activeSection="proof" />

      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              What you leave with after an assessment
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              The point is to understand the work before choosing tools or automation. We map the workflow, identify practical opportunities, and give you a prioritized next-step plan.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What the work looks at</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Repeated administrative work, handoffs, and follow-up",
                "Where information gets lost between people or systems",
                "Customer communication, scheduling, and reporting workflows",
                "The tools your team already uses and where they do not connect",
              ].map((item) => (
                <div key={item} className="flex gap-3 p-5 bg-gray-50 rounded-lg">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What you receive</h2>
            <div className="space-y-5">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-2">A written workflow summary</h3>
                <p className="text-gray-700">A plain-language picture of the current process and the points where work gets stuck, repeated, or dropped.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-2">A prioritized opportunity list</h3>
                <p className="text-gray-700">Recommendations are ranked by practical value, implementation effort, and the systems involved.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-2">A decision point</h3>
                <p className="text-gray-700">You can use the roadmap internally, have Fripse help implement it, or decide the timing is not right. There is no requirement to continue into implementation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#007CFF]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start with the workflow, not a tool pitch</h2>
            <p className="text-xl text-blue-100 mb-10">Book a call to talk through the work that is taking too much time and whether an assessment makes sense.</p>
            <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-[#007CFF] font-semibold text-xl px-12 py-6">
              <a href="/book">
                Book an assessment
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
