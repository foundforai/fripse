import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import NotFoundPage from "@/pages/404";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Assessment from "@/pages/Assessment";
import Proof from "@/pages/Proof";
import Quiz from "@/pages/Quiz";
import Booking from "@/pages/Booking";
import LeadCaptureDemo from "@/pages/LeadCaptureDemo";
import SmsOptIn from "@/pages/SmsOptIn";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/proof" component={Proof} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/book" component={Booking} />
      <Route path="/booking" component={Booking} />
      <Route path="/admin" component={Admin} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/lead-capture-demo" component={LeadCaptureDemo} />
      <Route path="/sms-optin" component={SmsOptIn} />
      <Route path="/404" component={NotFoundPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
