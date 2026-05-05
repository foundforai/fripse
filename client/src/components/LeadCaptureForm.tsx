import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle, Loader2, Mail, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const emailFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailFormSchema>;

interface LeadCaptureFormProps {
  className?: string;
  title?: string;
  description?: string;
}

export default function LeadCaptureForm({ 
  className = "", 
  title = "Get the Free AI Checklist",
  description = "Enter your email to download the Fripse AI business readiness checklist."
}: LeadCaptureFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        reset();
        toast({
          title: "Success!",
          description: "Your download link is ready.",
        });
      } else {
        throw new Error(result.message || "Failed to submit email");
      }
    } catch (error) {
      console.error("Email submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    window.open("/files/fripse-ai-checklist.pdf", "_blank");
  };

  if (isSuccess) {
    return (
      <Card className={`w-full max-w-md mx-auto ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            Your AI business readiness checklist is ready for download.
          </p>
          <Button 
            onClick={handleDownload}
            className="w-full bg-[#007CFF] hover:bg-[#0066CC] text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Checklist
          </Button>
          <p className="text-xs text-gray-500 mt-3">
            Check your email for additional resources and updates.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-5 w-5 text-[#007CFF]" />
          <CardTitle className="text-xl">
            {title}
          </CardTitle>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your@email.com"
              className={errors.email ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 mt-0.5 text-[#007CFF] flex-shrink-0" />
              <div>
                <strong>What you'll get:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• 6-category business operations assessment</li>
                  <li>• Simple checkbox format for quick evaluation</li>
                  <li>• Identify automation opportunities in your workflow</li>
                  <li>• Clear scoring to determine AI readiness</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#007CFF] hover:bg-[#0066CC] text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Get Free Checklist
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. No spam, unsubscribe anytime.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}