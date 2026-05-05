import LeadCaptureForm from "@/components/LeadCaptureForm";
import Seo from "@/components/Seo";

export default function LeadCaptureDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <Seo
        title="Lead Capture Demo | Fripse AI"
        description="Internal demo page."
        path="/lead-capture-demo"
        noindex
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            AI Business Readiness Assessment
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Get your free checklist and discover if your business is ready for AI automation
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Why Download Our AI Readiness Checklist?
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#007CFF] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Quick Assessment</h3>
                  <p className="text-gray-600">Simple checklist format covering 6 key business areas to identify automation opportunities.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#007CFF] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Clear Scoring</h3>
                  <p className="text-gray-600">Easy checkbox system to determine if you're ready for AI automation right now.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#007CFF] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Instant Action Steps</h3>
                  <p className="text-gray-600">Know immediately if you can start saving time and cutting costs with automation today.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#007CFF]">
              <h4 className="font-medium text-gray-900 mb-2">Assessment Categories:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Business Operations & Repeatable Processes</li>
                <li>• Customer Communication & Follow-ups</li>
                <li>• Marketing & Content Creation</li>
                <li>• Team Workflow & Standard Procedures</li>
                <li>• Data Management & Document Handling</li>
                <li>• Growth Mindset & Automation Readiness</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center">
            <LeadCaptureForm />
          </div>
        </div>
      </div>
    </div>
  );
}