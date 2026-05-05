import React from "react";
import { Mail, FileText, FileSpreadsheet, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AutomationCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="text-secondary text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-primary mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
};

const Automation: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            What We Automate
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From tedious administrative tasks to complex workflows, our AI solutions transform how your business operates.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AutomationCard
            icon={<Mail className="h-8 w-8" />}
            title="Project Updates"
            description="Auto-generated emails and reports keep clients and team members informed without manual effort."
            delay={0.1}
          />
          
          <AutomationCard
            icon={<FileText className="h-8 w-8" />}
            title="Meeting Summaries"
            description="Convert audio recordings into detailed meeting notes with action items automatically assigned."
            delay={0.2}
          />
          
          <AutomationCard
            icon={<FileSpreadsheet className="h-8 w-8" />}
            title="Sales Proposals"
            description="Transform voice notes and client requirements into professionally formatted proposals."
            delay={0.3}
          />
          
          <AutomationCard
            icon={<ClipboardList className="h-8 w-8" />}
            title="SOPs & Training"
            description="Create comprehensive documentation and training materials from rough notes or recordings."
            delay={0.4}
          />
        </div>
        
        {/* Visual section */}
        <motion.div 
          className="mt-16 bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                alt="Architect working on a draft with a pencil and ruler - professional AI consulting for construction and design" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Custom AI Solutions for Your Industry</h3>
              <p className="text-gray-700 mb-6">We specialize in creating tailored AI solutions for construction, project management, and small professional service firms. Our systems integrate with your existing tools and workflows.</p>
              <Button 
                onClick={scrollToContact}
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-6 shadow-md hover:shadow-lg w-fit"
              >
                Explore Industry Solutions
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Automation;
