import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle, Loader2, FileText, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Form validation schema
const checklistFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  honeypot: z.string().optional(), // Honeypot field for spam protection
});

type ChecklistFormData = z.infer<typeof checklistFormSchema>;

interface ChecklistLeadCaptureProps {
  className?: string;
  compact?: boolean;
}

export default function ChecklistLeadCapture({ className = "", compact = false }: ChecklistLeadCaptureProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChecklistFormData>({
    resolver: zodResolver(checklistFormSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ChecklistFormData) => {
      // Check honeypot field for spam protection
      if (data.honeypot) {
        throw new Error("Spam detected");
      }

      const { honeypot, ...cleanData } = data;
      const response = await fetch("/api/checklist-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit checklist request");
      }

      return response.json();
    },
    onSuccess: (response: any) => {
      setIsSuccess(true);
      setDownloadUrl(response.downloadUrl);
      reset();
      toast({
        title: "Success!",
        description: "Your AI Readiness Checklist is ready for download.",
      });
    },
    onError: (error: any) => {
      console.error("Checklist submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ChecklistFormData) => {
    mutation.mutate(data);
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
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
            Your AI Readiness Checklist has been prepared. Check your email for additional details.
          </p>
          <Button 
            onClick={handleDownload}
            className="w-full bg-[#007CFF] hover:bg-[#0066CC] text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Checklist
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader className={compact ? "pb-4" : ""}>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5 text-[#007CFF]" />
          <CardTitle className={compact ? "text-lg" : "text-xl"}>
            Get the Free AI Readiness Checklist
          </CardTitle>
        </div>
        <CardDescription>
          See if your business is ready to use AI tools effectively.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Honeypot field - hidden from users but visible to bots */}
          <input
            {...register("honeypot")}
            type="text"
            style={{ 
              position: 'absolute', 
              left: '-9999px', 
              opacity: 0, 
              pointerEvents: 'none' 
            }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Your full name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your@email.com"
              className={errors.email ? "border-red-500" : ""}
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
                  <li>• 6-category business readiness assessment</li>
                  <li>• Practical checklist for immediate action</li>
                  <li>• Automation opportunity identification</li>
                  <li>• Clear next steps for AI implementation</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-[#007CFF] hover:bg-[#0066CC] text-white"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Send Me the Checklist
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}