import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VideoModal, { VideoButton } from "@/components/VideoModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroCarousel } from "@/components/HeroCarousel";
import { SitePulse } from "@/components/SitePulse";
import { CONFIG } from "@/config/glamour";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import logoGold from "@/assets/logo-gold.png"; // ← Your custom golden Glamour logo

const Index = () => {
  const [showIntroVideo, setShowIntroVideo] = useState(false);

  useEffect(() => {
    const storageKey = "glamour-intro-video-seen";
    const hasSeenIntro = window.localStorage.getItem(storageKey);

    if (hasSeenIntro) return;

    const timer = window.setTimeout(() => {
      setShowIntroVideo(true);
      window.localStorage.setItem(storageKey, "true");
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <VideoModal
        isOpen={showIntroVideo}
        onClose={() => setShowIntroVideo(false)}
        autoMuted
        initialVideoIndex={0}
        compact
      />
      <SitePulse />

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
            <Link to="/pricing">
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 gradient-gold-subtle opacity-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-2xl" />
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6 animate-fade-up">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Trusted by {CONFIG.MEMBER_COUNT} Members
                </span>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6 animate-fade-up-delay-1">
                Start Your Glam Journey With{" "}
                <span className="text-gradient-gold">Daily Earning Streams</span>
              </h1>
              
              {/* Subtext */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up-delay-2">
                Join the Glamour community, watch the earning guide, choose your package, and connect with the team after secure payment.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-up-delay-3">
                <Link to="/pricing">
                  <Button variant="gold" size="xl" className="w-full sm:w-auto">
                    Start Earning Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                
                <VideoButton />
              </div>
            </div>
            
            {/* Right Content - Hero Image */}
            <div className="relative flex justify-center lg:justify-end animate-float">
              <div className="relative w-full max-w-md lg:max-w-lg min-h-96">
                <HeroCarousel className="w-full drop-shadow-2xl rounded-xl" />
                {/* Floating Stats Cards */}
                <div className="absolute -left-4 md:-left-8 top-1/4 bg-card rounded-xl p-3 shadow-card border border-border animate-fade-up">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Plus Potential</p>
                      <p className="font-bold text-foreground">€25/hr</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-4 md:-right-8 bottom-1/4 bg-card rounded-xl p-3 shadow-card border border-border animate-fade-up-delay-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Checkout</p>
                      <p className="font-bold text-foreground">Secure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Momentum Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { icon: Zap, label: "Instant boost", value: "₦16,000 link bonus" },
              { icon: TrendingUp, label: "Daily streams", value: "Up to €25/hour" },
              { icon: CreditCard, label: "Secure payment", value: "Flutterwave checkout" },
              { icon: Clock3, label: "Promo window", value: "Limited GlamSlots" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-card p-5 text-center shadow-card"
              >
                <item.icon className="mx-auto mb-3 h-6 w-6 text-gold" />
                <p className="text-sm font-semibold text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-display text-xl font-bold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose <span className="text-gradient-gold">GLAMOUR</span> Plus?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The higher package gives users a stronger reason to act now while Starter remains available as a lighter entry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Full Earning Access",
                description: "Unlock more Glamour channels including lifestyle, scripts, realtime, lingua, facetime, works, and dark mode.",
                isCustomIcon: true, // Flag for our custom logo
              },
              {
                icon: TrendingUp,
                title: "Stronger Rewards",
                description: "Plus raises the Glam Reward, Glam Link Bonus, and indirect earning values compared with Starter.",
              },
              {
                icon: Shield,
                title: "Official Flow",
                description: "Register, pay through the secure gateway, and get connected through WhatsApp for onboarding.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                  {feature.isCustomIcon ? (
                    <img src={logoGold} alt="Glamour Logo" className="w-10 h-10 object-contain" />
                  ) : (
                    <feature.icon className="w-6 h-6 text-foreground" />
                  )}
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Hook Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">
                Watch First
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-foreground">
                Let the guide sell the next click
              </h2>
              <p className="mt-4 text-muted-foreground leading-7">
                The first demo video now opens with your new uploaded guide, giving visitors a fast explanation before they choose their package.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <VideoButton className="rounded-xl border border-gold/30 bg-gold/10 px-5" />
                <Link to="/pricing">
                  <Button variant="gold" size="lg" className="w-full sm:w-auto">
                    Compare Packages
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                "Watch the Glamour earning guide",
                "Choose Plus for the fuller earning structure",
                "Pay securely and connect with the team",
              ].map((step) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                  <span className="font-semibold text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl gradient-gold p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-foreground/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ready to Secure Your GlamSlot?
              </h2>
              <p className="text-foreground/80 max-w-xl mx-auto mb-8">
                Plus is positioned for faster momentum, stronger rewards, and multiple earning channels.
              </p>
              <Link to="/pricing">
                <Button 
                  size="xl"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 font-semibold"
                >
                  View Plus Package
                <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GLAMOUR. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
