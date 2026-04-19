import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { generateWhatsAppUrl, PLANS, CONFIG } from "@/config/glamour";
import FlutterwaveButton from "@/components/FlutterwaveButton";
import { Copy, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoGold from "@/assets/logo-gold.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Payment account details - edit these values
const PAYMENT_ACCOUNT = {
  accountNumber: "3002992678",
  bankName: "KUDA BANK",
  accountName: "Skillnify Networks_Glamour",
};

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [planName, setPlanName] = useState("Glamour Starter");
  const [planKey, setPlanKey] = useState("starter");
  const [amount, setAmount] = useState(7500);
  const [userName, setUserName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [txRef, setTxRef] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [copied, setCopied] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const plan = searchParams.get("plan") || "starter";
    setPlanKey(plan);
    
    const planData = PLANS[plan as keyof typeof PLANS];
    if (planData) {
      setPlanName(planData.name);
      setAmount(planData.price);
    }
    
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

    setTxRef(`fort-${usernameParam || plan}-${Date.now()}`);
  }, [searchParams]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_ACCOUNT.accountNumber);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Account number copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const handlePaymentMade = () => {
    // Show the "not paid" popup
    setShowPaymentDialog(true);
  };

  const handleContactAdmin = () => {
    const reference = `FX${Date.now()}`;
    const whatsappMessage = `Hello Admin, I want to register for ${planName} (₦${amount.toLocaleString()}). My payment reference is ${reference} (Send your payment screenshot). Please verify my payment.`;
    const whatsappUrl = generateWhatsAppUrl(whatsappMessage);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen wine-theme bg-background flex flex-col">
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
        <div className="container flex items-center justify-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center overflow-hidden">
              <img src={logoGold} alt="Glamour Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-foreground">
              <span className="text-gold">Glamour</span>
            </span>
          </Link>
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
                Payment Gateway
              </h1>
              <p className="text-gold font-semibold">Glamour Payment</p>
              <p className="text-muted-foreground text-sm mt-2">
                Choose the secure payment method below to complete your plan purchase.
              </p>
            </div>

            {/* Warning Note */}
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 mb-6">
              <p className="text-center text-sm font-medium text-foreground">
                <span className="text-gold font-bold">Note:</span> DO NOT PAY WITH OPAY AS OPAY IS NOT ACCEPTED ON Glamour. YOU CAN USE ANY OTHER BANK.
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

            {/* Transfer Details */}
            <div className="mb-6">
              <p className="text-center text-muted-foreground mb-4">
                Transfer to the account below
              </p>

              <div className="space-y-3">
                {/* Account Number */}
                <div className="bg-gold/20 border border-gold/40 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Account Number</span>
                    <p className="font-bold text-foreground text-lg">{PAYMENT_ACCOUNT.accountNumber}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAccountNumber}
                    className="border-gold/50 hover:bg-gold/20"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="ml-1">{copied ? "Copied" : "Copy"}</span>
                  </Button>
                </div>

                {/* Bank Name */}
                <div className="bg-muted/50 border border-border rounded-xl p-4 flex justify-between items-center">
                  <span className="text-muted-foreground">Bank</span>
                  <span className="font-semibold text-foreground">{PAYMENT_ACCOUNT.bankName}</span>
                </div>

                {/* Account Name */}
                <div className="bg-muted/50 border border-border rounded-xl p-4 flex justify-between items-center">
                  <span className="text-muted-foreground">Account Name</span>
                  <span className="font-semibold text-gold">{PAYMENT_ACCOUNT.accountName}</span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                Hurry!! Payment Expires in{" "}
                <span className={`font-bold ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
                  {formatTime(timeLeft)}
                </span>
              </p>
            </div>

            {/* Warning Text */}
            <p className="text-center text-sm text-muted-foreground mb-6">
              After making payment, Click on "<span className="text-gold font-semibold">I HAVE MADE PAYMENT</span>"... DO NOT CLICK IF YOU HAVEN'T MADE PAYMENT YET AS YOUR REGISTRATION WILL NOT BE APPROVED.
            </p>

            {/* Payment Button */}
            <Button
              variant="gold"
              size="xl"
              className="w-full"
              onClick={handlePaymentMade}
            >
              I have made payment
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-muted-foreground text-sm">
              Join our channel{" "}
              <a href="#" className="text-gold hover:underline">
                CLICK HERE
              </a>
            </p>
            <p className="text-muted-foreground text-xs">
              © 2025 GLAMOUR. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
