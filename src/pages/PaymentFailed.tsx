import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { generateWhatsAppUrl, PLANS } from "@/config/glamour";
import { ThemeToggle } from "@/components/ThemeToggle";
import { XCircle, Sparkles, MessageCircle, RefreshCcw } from "lucide-react";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const [planName, setPlanName] = useState("Glamour");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const requestedPlan = searchParams.get("plan") || "starter";
    const safePlan = requestedPlan in PLANS ? requestedPlan : "starter";
    const ref = searchParams.get("tx_ref") || searchParams.get("ref") || "Not provided";
    
    const planData = PLANS[safePlan as keyof typeof PLANS];
    setPlanName(planData.name);
    setReference(ref);
  }, [searchParams]);

  const whatsappMessage = `Hello Admin, I attempted payment for ${planName} but my payment failed. My reference is ${reference}.`;
  const whatsappUrl = generateWhatsAppUrl(whatsappMessage);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="bg-background border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex-1"></div>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-foreground">
              <span className="text-gold">Glamour</span>
            </span>
          </Link>
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          {/* Failed Icon */}
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/20 mb-6">
              <XCircle className="w-12 h-12 text-destructive" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Payment Not Approved ❌
            </h1>
            
            <p className="text-muted-foreground mb-2">
              Your payment for <span className="text-gold font-semibold">{planName}</span> could not be processed.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Reference: <span className="font-mono text-foreground">{reference}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 animate-fade-up-delay-1">
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="w-full mb-3">
                <RefreshCcw className="w-5 h-5" />
                Try Again
              </Button>
            </Link>
            
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="xl" className="w-full">
                <MessageCircle className="w-5 h-5" />
                Contact Admin
              </Button>
            </a>
            
            <p className="text-sm text-muted-foreground">
              Need help? Contact our admin team for assistance
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-8 animate-fade-up-delay-2">
            <Link to="/" className="text-gold hover:underline text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Glamour. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PaymentFailed;
