import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/PricingCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PLANS, CONFIG } from "@/config/glamour";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import logoGold from "@/assets/logo-gold.png"; // ← Your custom golden Glamour logo

const Pricing = () => {
  return (
    <div className="min-h-screen bg-amber-50 bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center overflow-hidden">
              <img src={logoGold} alt="Glamour Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-foreground">
              <span className="text-gold">G</span>lamour
            </span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-gold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6 animate-fade-up">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">
              Trusted by {CONFIG.MEMBER_COUNT} Members
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4 animate-fade-up-delay-1">
            Choose Your{" "}
            <span className="text-gradient-gold">Glamour</span>ous <span className="text-gradient-gold">Plan</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up-delay-2">
            Select the perfect plan to start your earning journey. 
            Upgrade anytime as your wealth grows!
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <PricingCard
              planKey="starter"
              name={PLANS.starter.name}
              price={PLANS.starter.price}
              currency={PLANS.starter.currency}
              features={PLANS.starter.features}
              image={PLANS.starter.image}
              popular={PLANS.starter.popular}
              index={0}
            />
            <PricingCard
              planKey="plus"
              name={PLANS.plus.name}
              price={PLANS.plus.price}
              currency={PLANS.plus.currency}
              features={PLANS.plus.features}
              image={PLANS.plus.image}
              popular={PLANS.plus.popular}
              index={1}
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="bg-card/50 rounded-2xl p-6 md:p-8 border border-border max-w-3xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              100% Secure Fast Payment
            </h3>
            <p className="text-muted-foreground mb-6">
              Your payment is processed securely. After successful payment ~
              You'll be connected with a team automatically via WhatsApp after your registration.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                Instant Verification
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                24/7 Support
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                Money-Back Guarantee
              </span>
            </div>
          </div>
        </div>
      </section>

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

export default Pricing;
