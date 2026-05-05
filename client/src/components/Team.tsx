import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Team: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3" 
              alt="Fripse AI consulting experts in a meeting" 
              className="rounded-xl shadow-xl w-full h-auto"
              loading="lazy"
            />
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Expert Team, Exceptional Results
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our team of AI specialists combines deep technical expertise with practical business experience. We don't just implement technology – we transform how your business operates.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-secondary/20 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Business-First Approach</h3>
                  <p className="text-gray-600">We start with your business goals, not with technology.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/20 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Rapid Implementation</h3>
                  <p className="text-gray-600">See results in days or weeks, not months or years.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/20 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Team Enablement</h3>
                  <p className="text-gray-600">We ensure your team can maintain and expand your AI systems.</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={scrollToContact}
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 shadow-md hover:shadow-lg"
            >
              Schedule a Consultation
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Team;
