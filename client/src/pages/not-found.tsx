import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Seo
        title="Page Not Found | Fripse AI"
        description="The page you're looking for doesn't exist."
        path="/404"
        noindex
      />
      <Card className="w-full max-w-lg mx-4">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-orange-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the page you're looking for. Let's get you back to exploring our AI solutions for Utah contractors and small businesses.
          </p>
          
          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
            
            <Link href="/blog">
              <Button variant="outline" className="w-full">
                Visit Our Blog
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Need AI consulting help? Contact us for Utah contractor and small business solutions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
