import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { generateWhatsAppUrl, PLANS, CONFIG } from "@/config/glamour";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CheckCircle2, Sparkles, MessageCircle, XCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [planName, setPlanName] = useState("Glamour");
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const requestedPlan = searchParams.get("plan") || "starter";
    const safePlan = requestedPlan in PLANS ? requestedPlan : "starter";
    const ref = searchParams.get("tx_ref") || searchParams.get("ref") || "";
    
    const planData = PLANS[safePlan as keyof typeof PLANS];
    setPlanName(planData.name);
    setReference(ref || "Not provided");

    if (!ref) {
      setStatus("not-detected");
      return;
    }

    fetch(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${ref}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_FLW_SECRET_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data?.status === "successful") {
          setStatus("success");
        } else {
          setStatus("not-detected");
        }
      })
      .catch(() => {
        setStatus("not-detected");
      });
  }, [searchParams]);

  const whatsappMessage = CONFIG.WHATSAPP_MESSAGE;
  const whatsappUrl = generateWhatsAppUrl(whatsappMessage);
  const whatsappGroupLink = CONFIG.WHATSAPP_GROUP_LINK;

  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="bg-background border-b border-border">
          <div className="container flex items-center justify-center h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xl md:text-2xl font-display font-bold text-foreground">
                Glamour
              </span>
            </Link>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Verifying payment...
              </h1>
              <p className="text-muted-foreground">
                Please wait while we confirm your transaction with Flutterwave.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "not-detected") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="bg-background border-b border-border">
          <div className="container flex items-center justify-center h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xl md:text-2xl font-display font-bold text-foreground">
                Glamour
              </span>
            </Link>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/20 mb-6">
                <XCircle className="w-12 h-12 text-destructive" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Payment Not Detected ❌
              </h1>
              <p className="text-muted-foreground mb-2">
                We could not verify your payment for <span className="text-gold font-semibold">{planName}</span>.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Reference: <span className="font-mono text-foreground">{reference}</span>
              </p>
            </div>

            <div className="space-y-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="xl" className="w-full">
                  <MessageCircle className="w-5 h-5" />
                  Contact Admin
                </Button>
              </a>
              <p className="text-sm text-muted-foreground">
                Contact our WhatsApp support to resolve your payment status.
              </p>
              <Link to="/" className="text-gold hover:underline text-sm block">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="bg-background border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-foreground">
              <span className="text-gold">Glamour</span>
            </span>
          </Link>
          <ThemeToggle />
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
            <a href={whatsappGroupLink} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="xl" className="w-full">
                <MessageCircle className="w-5 h-5" />
                Join WhatsApp Group
              </Button>
            </a>
            
            <p className="text-sm text-muted-foreground">
              Click the button above to join our exclusive WhatsApp group and get started!
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

export default PaymentSuccess;
