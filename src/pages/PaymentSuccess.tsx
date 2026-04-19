import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { generateWhatsAppUrl, PLANS } from "@/config/glamour";
import { CheckCircle2, Sparkles, MessageCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [planName, setPlanName] = useState("Glamour");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const plan = searchParams.get("plan") || "starter";
    const ref = searchParams.get("ref") || `FX${Date.now()}`;
    
    const planData = PLANS[plan as keyof typeof PLANS];
    if (planData) {
      setPlanName(planData.name);
    }
    setReference(ref);
  }, [searchParams]);

  const whatsappMessage = `Hello Admin, I've successfully paid for ${planName}. My payment reference is ${reference}.`;
  const whatsappUrl = generateWhatsAppUrl(whatsappMessage);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="bg-background border-b border-border">
        <div className="container flex items-center justify-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-foreground">
              Fortune<span className="text-gold">X</span>
            </span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Payment Verified Successfully ✅
            </h1>
            
            <p className="text-muted-foreground mb-2">
              Thank you for choosing <span className="text-gold font-semibold">{planName}</span>!
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Reference: <span className="font-mono text-foreground">{reference}</span>
            </p>
          </div>

          {/* WhatsApp CTA */}
          <div className="space-y-4 animate-fade-up-delay-1">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="xl" className="w-full">
                <MessageCircle className="w-5 h-5" />
                Continue on WhatsApp
              </Button>
            </a>
            
            <p className="text-sm text-muted-foreground">
              Click the button above to complete your registration with our admin team
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
    </div>
  );
};

export default PaymentSuccess;
