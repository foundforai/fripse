import { Button } from "@/components/ui/button";

export default function Booking() {
  return (
    <section id="booking" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book a free consultation with our AI experts and discover how automation can streamline your operations and boost your bottom line.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Schedule Your Free AI Strategy Call
              </h3>
              <p className="text-gray-600">
                Choose a time that works for you - no commitment required
              </p>
            </div>
            
            <div className="relative">
              <iframe 
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2Q0ZET91WXgP9MG9yK8fFooZcSxs4zoSjiHW2xEbvuAs1ZStM5qvQdzkf5wcz1P25_im7nQ6_J?gv=true" 
                style={{ border: 0 }} 
                width="100%" 
                height="600" 
                frameBorder="0"
                className="rounded-lg"
                title="Schedule an appointment with Fripse AI"
              />
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                Can't find a suitable time? <Button variant="link" className="p-0 text-primary">Contact us directly</Button> and we'll work something out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}