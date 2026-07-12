import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { generateWhatsAppUrl, PLANS, CONFIG, getEffectivePlan } from "@/config/glamour";
import FlutterwaveButton from "@/components/FlutterwaveButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoGold from "@/assets/logo-gold.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [planName, setPlanName] = useState("Glamour Starter");
  const [planKey, setPlanKey] = useState("starter");
  const [amount, setAmount] = useState(PLANS.starter.price);
  const [userName, setUserName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [txRef, setTxRef] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  useEffect(() => {
    const requestedPlan = searchParams.get("plan") || "starter";
    const safePlan = requestedPlan in PLANS ? requestedPlan : "starter";
    const planData = getEffectivePlan(safePlan as keyof typeof PLANS);

    setPlanKey(safePlan);
    setPlanName(planData.name);
    setAmount(planData.price);
    
    // Get user name from params
    const name = searchParams.get("name");
    if (name) {
      setUserName(name);
    }

    const usernameParam = searchParams.get("username");
    if (usernameParam) {
      setUsername(usernameParam);
    }

    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }

    const countryParam = searchParams.get("country");
    if (countryParam) {
      setCountry(countryParam);
    }

    setTxRef(`fort-${usernameParam || safePlan}-${Date.now()}`);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Payment Not Made Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground text-center text-xl font-display">
              Payment Not Detected
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground pt-4">
              You have not made payment, try again or contact admin.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              variant="gold"
              onClick={() => setShowPaymentDialog(false)}
              className="w-full"
            >
              Try Again
                  </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <nav className="bg-background border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex-1"></div>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center overflow-hidden">
              <img src={logoGold} alt="Glamour Logo" className="w-6 h-6 object-contain" />
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
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="max-w-md w-full">
          {/* Payment Gateway Card */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
                SECUREFLOW TECH HUB PAYMENT GATEWAY
              </h1>
              <p className="text-gold font-semibold">Glamour Payment</p>
              <p className="text-muted-foreground text-sm mt-2">
                GLAMOUR IS EVERYWHERE, BE A PART OF IT TODAY!
              </p>
            </div>

            {/* Warning Note */}
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 mb-6">
              <p className="text-center text-sm font-medium text-foreground">
                <span className="text-gold font-bold">Note:</span> YOU ARE MAKING PAYMENT FOR GLAMOUR THROUGH "SECUREFLOW TECH HUB" PAYMENT GATEWAY FOR FAST AND SECURE PAYMENT, IF YOU ENCOUNTER ANY PROBLEMS, CONTACT YOUR COACH IMMEDIATELY!
              </p>
            </div>

            {/* Package Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Package:</span>
                <span className="font-semibold text-foreground">{planName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount to Pay:</span>
                <span className="font-bold text-gold text-lg">₦{amount.toLocaleString()}</span>
              </div>
              {country && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Country:</span>
                  <span className="font-semibold text-foreground">{country}</span>
                </div>
              )}
            </div>

            {/* Flutterwave Payment */}
            <div className="mb-6">
              <FlutterwaveButton
                amount={amount}
                email={email}
                name={userName}
                tx_ref={txRef}
                planKey={planKey}
              />
            </div>

            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-center text-sm font-medium text-green-800">
                YOUR PAYMENT WILL BE AUTOMATICALLY VERIFIED AND YOU WILL BE CONNECTED
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-muted-foreground text-sm">
              NEED HELP?{" "}
              <a href={import.meta.env.VITE_WHATSAPP_HELP_LINK || "#"} className="text-gold hover:underline">
                Message Admin on WhatsApp
              </a>
            </p>
            <p className="text-muted-foreground text-sm">
              Join Our Channel For More Updates{" "}
              <a href={import.meta.env.VITE_CHANNEL_LINK || "#"} className="text-gold hover:underline">
                Join Channel
              </a>
            </p>
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} GLAMOUR. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
