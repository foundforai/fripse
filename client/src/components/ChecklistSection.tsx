import ChecklistLeadCapture from "./ChecklistLeadCapture";

interface ChecklistSectionProps {
  className?: string;
  id?: string;
}

export default function ChecklistSection({ className = "", id = "checklist" }: ChecklistSectionProps) {
  return (
    <section className={`py-16 bg-gray-50 ${className}`} id={id}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Start with our comprehensive AI Readiness Assessment
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              Discover Your AI Implementation Roadmap
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#007CFF] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Assess Your Current State</h4>
                  <p className="text-gray-600">Evaluate your business operations, workflows, and automation opportunities across 6 key areas.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#007CFF] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Identify Opportunities</h4>
                  <p className="text-gray-600">Find repeatable processes and manual tasks that are perfect for AI automation.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#007CFF] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Build Your Strategy</h4>
                  <p className="text-gray-600">Get clear next steps and practical recommendations for implementing AI in your business.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#007CFF]">
              <h4 className="font-medium text-gray-900 mb-2">What Utah Businesses Say:</h4>
              <p className="text-gray-700 italic">
                "The checklist showed us we were ready for automation. Now we save 15 hours per week 
                on estimates and customer follow-ups alone."
              </p>
              <p className="text-sm text-gray-600 mt-2">- Local Construction Company</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <ChecklistLeadCapture />
          </div>
        </div>
      </div>
    </section>
  );
}