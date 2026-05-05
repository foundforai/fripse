import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const LeadMagnet: React.FC = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const leadMagnetMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest("POST", "/api/lead-magnet", { email });
    },
    onSuccess: () => {
      setEmail("");
      toast({
        title: "Thank you!",
        description: "Your playbook is on its way to your inbox.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      leadMagnetMutation.mutate(email);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-primary text-white">
      <div className="container-custom">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Steal Our Playbook</h2>
          <p className="text-xl mb-8 opacity-90">Get our free PDF: 5 AI Workflows Every Small Business Should Steal</p>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-6 px-4 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary border-0 mb-3 sm:mb-0 h-auto"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-6 px-6 rounded-lg sm:rounded-l-none h-auto"
              disabled={leadMagnetMutation.isPending}
            >
              {leadMagnetMutation.isPending ? "Sending..." : "Get the Playbook"}
            </Button>
          </form>
          
          <p className="text-sm mt-4 opacity-75">We respect your privacy. Unsubscribe at any time.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnet;
