import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { submitToFormspree } from "@/lib/formspree";
import Seo from "@/components/Seo";
import { pageGraph, SITE } from "@/lib/schema";

interface Question {
  id: number;
  question: string;
  options: { value: string; text: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "How many hours per week does your team spend on repetitive, manual tasks?",
    options: [
      { value: "0-5", text: "0-5 hours", score: 1 },
      { value: "6-15", text: "6-15 hours", score: 2 },
      { value: "16-30", text: "16-30 hours", score: 3 },
      { value: "30+", text: "More than 30 hours", score: 4 }
    ]
  },
  {
    id: 2,
    question: "How often do you find yourself doing the same task over and over again?",
    options: [
      { value: "rarely", text: "Rarely - most tasks are unique", score: 1 },
      { value: "sometimes", text: "Sometimes - maybe once a week", score: 2 },
      { value: "often", text: "Often - multiple times per week", score: 3 },
      { value: "daily", text: "Daily - it's a significant part of my work", score: 4 }
    ]
  },
  {
    id: 3,
    question: "How familiar is your team with AI tools like ChatGPT, Claude, or similar platforms?",
    options: [
      { value: "expert", text: "We're power users and integrate AI daily", score: 1 },
      { value: "familiar", text: "We use them occasionally for basic tasks", score: 2 },
      { value: "learning", text: "We've tried them but don't use them regularly", score: 3 },
      { value: "unfamiliar", text: "We haven't really explored AI tools yet", score: 4 }
    ]
  },
  {
    id: 4,
    question: "What's your biggest challenge when it comes to business efficiency?",
    options: [
      { value: "time", text: "Not enough time to get everything done", score: 3 },
      { value: "costs", text: "High operational costs eating into profits", score: 3 },
      { value: "scaling", text: "Difficulty scaling without adding more staff", score: 4 },
      { value: "processes", text: "Lack of standardized processes", score: 2 }
    ]
  },
  {
    id: 5,
    question: "If you could save 10-20 hours per week through automation, what would you do with that time?",
    options: [
      { value: "growth", text: "Focus on business growth and strategy", score: 4 },
      { value: "clients", text: "Serve more clients or improve service quality", score: 3 },
      { value: "innovation", text: "Develop new products or services", score: 3 },
      { value: "balance", text: "Improve work-life balance", score: 2 }
    ]
  }
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { toast } = useToast();

  const handleAnswerSelect = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          totalScore += option.score;
        }
      }
    });
    return totalScore;
  };

  const getResultsContent = (score: number) => {
    if (score <= 8) {
      return {
        level: "AI Ready",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        description: "Great news! Your business already has good efficiency practices in place. AI could help you optimize further and stay ahead of the competition.",
        recommendations: [
          "Fine-tune existing processes with AI enhancements",
          "Explore advanced AI applications for competitive advantage",
          "Consider AI for data analysis and decision-making",
          "Look into customer experience improvements with AI"
        ]
      };
    } else if (score <= 14) {
      return {
        level: "AI Opportunity",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        description: "You have moderate opportunities to improve efficiency with AI. There are several areas where automation could make a significant impact.",
        recommendations: [
          "Start with the most repetitive tasks in your workflow",
          "Implement AI tools for document processing and communication",
          "Automate reporting and data collection processes",
          "Use AI for customer service and support functions"
        ]
      };
    } else {
      return {
        level: "AI Transformation Needed",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        description: "Excellent potential for AI transformation! You could see dramatic improvements in efficiency and cost savings by implementing the right AI solutions.",
        recommendations: [
          "Prioritize automating your most time-consuming manual tasks",
          "Implement AI for workflow management and process optimization",
          "Use AI to reduce operational costs and improve accuracy",
          "Consider a comprehensive AI strategy to transform your business operations"
        ]
      };
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast({
        title: "Missing Information",
        description: "Please enter both your name and email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const score = calculateScore();
      const result = getResultsContent(score);
      await submitToFormspree(
        { name, email, quizScore: score, quizLevel: result.level },
        "Fripse AI Readiness Quiz submission",
      );
      setEmailSubmitted(true);
      toast({
        title: "Success!",
        description: "Your AI Readiness Report has been sent to your email.",
      });
    } catch (error) {
      console.error('Email submission error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const score = calculateScore();
  const results = getResultsContent(score);

  if (emailSubmitted) {
    return (
      <div className="min-h-screen">
        <Navbar activeSection="" />
        
        <section className="pt-20 pb-16">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Thank You!
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Your personalized AI Readiness Report has been sent to <strong>{email}</strong>.
                Check your inbox (and spam folder) in the next few minutes.
              </p>
              
              <div className="space-y-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold"
                  data-testid="button-book-after-quiz"
                >
                  <a 
                    href="https://fripse.com/book"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ready to Book an Assessment?
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                
                <div>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/'}
                    data-testid="button-back-home"
                  >
                    Back to Homepage
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen">
        <Navbar activeSection="" />
        
        <section className="pt-20 pb-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Your AI Readiness Results
                </h1>
                <p className="text-xl text-gray-700">
                  Based on your answers, here's your personalized assessment:
                </p>
              </div>

              <Card className={`mb-8 ${results.bgColor} ${results.borderColor}`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${results.color}`} data-testid="quiz-result-level">
                    {results.level}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-700 mb-6">
                    {results.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Recommended Next Steps:
                  </h3>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-[#007CFF]" />
                    Get Your Detailed AI Readiness Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    Enter your details below to receive a comprehensive PDF report with specific AI recommendations 
                    tailored to your business, plus 5 actionable AI prompts you can use today.
                  </p>
                  
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        data-testid="input-quiz-name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        data-testid="input-quiz-email"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#007CFF] hover:bg-[#0066CC] text-white font-semibold"
                      data-testid="button-submit-quiz-email"
                    >
                      {isSubmitting ? "Sending..." : "Send My AI Readiness Report"}
                      {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Seo
        title="AI Readiness Quiz | Fripse AI"
        description="Take the 5-question Fripse AI Readiness Quiz to see where AI can save your business the most time."
        path="/quiz"
        jsonLd={pageGraph({
          url: `${SITE}/quiz`,
          name: "AI Readiness Quiz | Fripse AI",
          description:
            "Take the 5-question Fripse AI Readiness Quiz to see where AI can save your business the most time.",
          breadcrumbs: [
            { name: "Home", url: `${SITE}/` },
            { name: "Quiz", url: `${SITE}/quiz` },
          ],
        })}
      />
      <Navbar activeSection="" />

      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                AI Readiness Quiz
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Discover how AI can transform your business in just 5 questions
              </p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl" data-testid={`question-${currentQuestion + 1}`}>
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-8">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswerSelect(questions[currentQuestion].id, option.value)}
                      className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                        answers[questions[currentQuestion].id] === option.value
                          ? 'bg-[#007CFF] text-white border-[#007CFF]'
                          : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                      data-testid={`option-${option.value}`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentQuestion === 0}
                    data-testid="button-quiz-back"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={!answers[questions[currentQuestion].id]}
                    className="bg-[#007CFF] hover:bg-[#0066CC]"
                    data-testid="button-quiz-next"
                  >
                    {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Quiz;