import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { submitToFormspree } from "@/lib/formspree";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { contactFormSchema, type ContactFormData } from "@/lib/contactSchema";

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await submitToFormspree(data, "Fripse contact form");
    },
    onSuccess: () => {
      toast({
        title: "Message received!",
        description: "Thank you for your interest. We'll be in touch shortly.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  function onSubmit(data: ContactFormData) {
    contactMutation.mutate(data);
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row">
          <motion.div 
            className="md:w-1/2 md:pr-12 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Let's Build Your AI Plan</h2>
            <p className="text-lg text-gray-700 mb-6">Tell us about your business. We'll show you what's possible with AI in just one Zoom call.</p>
            
            <img 
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3" 
              alt="Modern office workspace with computers and collaborative environment" 
              className="rounded-xl shadow-lg w-full h-auto"
              loading="lazy"
            />
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <div className="text-secondary text-xl mr-4">
                  <Check className="h-6 w-6" />
                </div>
                <p className="text-gray-700">Free, no-obligation consultation</p>
              </div>
              <div className="flex items-start">
                <div className="text-secondary text-xl mr-4">
                  <Check className="h-6 w-6" />
                </div>
                <p className="text-gray-700">Concrete ideas you can implement immediately</p>
              </div>
              <div className="flex items-start">
                <div className="text-secondary text-xl mr-4">
                  <Check className="h-6 w-6" />
                </div>
                <p className="text-gray-700">Clear pricing and timeline if you choose to work with us</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 bg-gray-50 rounded-xl p-8 shadow-md"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Get My Free Consult</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Company</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Quick description of goals or problems</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 rounded-lg"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Submitting..." : "Get My Free Consult"}
                </Button>
              </form>
            </Form>
            
            <p className="text-sm text-gray-500 mt-4">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
