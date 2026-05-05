import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, CheckCircle, Loader2 } from "lucide-react";
import { submitToFormspree } from "@/lib/formspree";

interface SimpleEmailCaptureProps {
  className?: string;
}

export default function SimpleEmailCapture({ className = "" }: SimpleEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      await submitToFormspree({ email }, "Fripse AI checklist download");
      setIsSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Email submission error:", error);
      setError("Failed to submit email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    window.open("/files/fripse-ai-checklist.pdf", "_blank");
  };

  if (isSuccess) {
    return (
      <div className={`p-6 text-center bg-white rounded-lg shadow-sm border ${className}`}>
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          Your AI business readiness checklist is ready for download.
        </p>
        <Button 
          onClick={handleDownload}
          className="bg-[#007CFF] hover:bg-[#0066CC] text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Checklist
        </Button>
      </div>
    );
  }

  return (
    <div className={`p-6 bg-white rounded-lg shadow-sm border ${className}`}>
      <h3 className="text-lg font-semibold mb-2">Get the Free AI Readiness Checklist</h3>
      <p className="text-gray-600 mb-4">
        Simple checklist to see if your business can benefit from AI automation today.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={error ? "border-red-500" : ""}
            disabled={isSubmitting}
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}
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
      </form>
    </div>
  );
}