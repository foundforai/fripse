import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ServiceTier: React.FC<{
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  delay: number;
}> = ({ title, price, features, isPopular = false, delay }) => {
  // Scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div 
      className={cn(
        "bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-2 duration-300",
        isPopular && "shadow-lg transform scale-105 relative"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-secondary text-white py-1 px-4 text-sm font-semibold">
          Most Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
        <div className="text-3xl font-bold text-secondary mb-6">{price}</div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-secondary mt-1 mr-3" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          onClick={scrollToContact}
          className={cn(
            "w-full font-semibold py-6 h-auto",
            isPopular 
              ? "bg-secondary hover:bg-secondary/90 text-white" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          )}
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            AI Solutions for Utah Professional & Service Businesses
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform your professional or service business with AI automation tailored to your operations and budget.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tier 1 */}
          <ServiceTier
            title="Quick Win Day"
            price="$2,500"
            features={[
              "Audit + process recommendations",
              "Custom GPT prompt pack",
              "Training + support"
            ]}
            delay={0.1}
          />
          
          {/* Tier 2 (Popular) */}
          <ServiceTier
            title="Ops Overhaul"
            price="$15,000"
            features={[
              "Full system audit",
              "2-3 Proprietary GPT Systems",
              "SOPs, training, 30-day support"
            ]}
            isPopular={true}
            delay={0.2}
          />
          
          {/* Tier 3 */}
          <ServiceTier
            title="AI Co-Pilot"
            price="$60,000"
            features={[
              "2-week full install",
              "Staff training, tools, coaching",
              "60-day rollout support"
            ]}
            delay={0.3}
          />
        </div>

        {/* AI SEO Readiness Callout */}
        <motion.div 
          className="mt-12 max-w-3xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-primary mb-3">AI SEO Readiness</h3>
          <p className="text-gray-700">
            For schema, GEO, and AI search visibility audits, we partner with <a href="https://foundforai.com" target="_blank" rel="noopener" className="text-[#007CFF] hover:text-blue-700 underline font-medium">Found For AI</a> for expert optimization.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
