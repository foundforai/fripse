import React from "react";
import { Clock, Clipboard, Bot } from "lucide-react";
import { motion } from "framer-motion";

const Benefits: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            AI That Pays for Itself
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our solutions are designed to deliver immediate ROI by automating your most time-consuming tasks.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <motion.div 
            className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-secondary text-4xl mb-4">
              <Clock className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Save 10+ Hours Per Week</h3>
            <p className="text-gray-700">Reclaim your productive time by automating repetitive administrative tasks and processes.</p>
          </motion.div>
          
          {/* Benefit 2 */}
          <motion.div 
            className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-secondary text-4xl mb-4">
              <Clipboard className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Reduce Manual Admin by 80%</h3>
            <p className="text-gray-700">Transform your workflow with intelligent systems that handle data entry, follow-ups, and documentation.</p>
          </motion.div>
          
          {/* Benefit 3 */}
          <motion.div 
            className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-secondary text-4xl mb-4">
              <Bot className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Custom AI Without Code</h3>
            <p className="text-gray-700">Launch powerful AI tools custom-built for your business without needing technical expertise.</p>
          </motion.div>
        </div>
        
        {/* Use Cases */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-gray-50 border-l-4 border-secondary p-6 rounded-r-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">Service Company Saves $45K Annually</h3>
            <p className="text-gray-700">A 12-person service company automated their quoting process and client communications, saving 15 hours per week and improving quote accuracy by 30%.</p>
          </motion.div>
          
          <motion.div 
            className="bg-gray-50 border-l-4 border-secondary p-6 rounded-r-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">Project Management Team Scales Without Hiring</h3>
            <p className="text-gray-700">A project management firm handled 40% more clients without adding staff by implementing AI tools for status reports, follow-ups, and documentation.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
