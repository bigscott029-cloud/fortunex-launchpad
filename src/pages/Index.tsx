import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VideoButton } from "@/components/VideoModal";
import { CONFIG } from "@/config/fortunex";
import { ArrowRight, Users, TrendingUp, Shield } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.png";
import logoGold from "@/assets/logo-gold.png"; // ← Your custom golden FortuneX logo

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center overflow-hidden">
              <img src={logoGold} alt="FortuneX Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-foreground">
              <span className="text-gold">G</span>lamour
            </span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/pricing">
              <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                Pricing
              </Button>
            </Link>
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
                Turn Your Time Into{" "}
                <span className="text-gradient-gold">Unlimited Income</span>
              </h1>
              
              {/* Subtext */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up-delay-2">
                Join thousands of Africans earning daily rewards through simple tasks, 
                engaging content, and exciting games. No experience needed!
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
              <div className="relative">
                <img
                  src={heroMockup}
                  alt="FortuneX App showing earnings dashboard"
                  className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
                />
                {/* Floating Stats Cards */}
                <div className="absolute -left-4 md:-left-8 top-1/4 bg-card rounded-xl p-3 shadow-card border border-border animate-fade-up">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Daily ROI</p>
                      <p className="font-bold text-foreground">+10%</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-4 md:-right-8 bottom-1/4 bg-card rounded-xl p-3 shadow-card border border-border animate-fade-up-delay-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Verified</p>
                      <p className="font-bold text-foreground">100% Safe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose <span className="text-gradient-gold">GLAMOUR</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start your earning journey with the most trusted platform in Africa!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Simple Tasks",
                description: "Complete easy daily tasks and watch your earnings grow automatically",
                isCustomIcon: true, // Flag for our custom logo
              },
              {
                icon: TrendingUp,
                title: "High Returns",
                description: "Enjoy up to 10% ROI on your activities with transparent payouts",
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Your funds and data are protected with bank-grade security",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                  {feature.isCustomIcon ? (
                    <img src={logoGold} alt="FortuneX Logo" className="w-10 h-10 object-contain" />
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

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl gradient-gold p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-foreground/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ready to Start Earning?
              </h2>
              <p className="text-foreground/80 max-w-xl mx-auto mb-8">
                Join over {CONFIG.MEMBER_COUNT} members who are already earning daily with Glamour!
              </p>
              <Link to="/pricing">
                <<Button size="xl" className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 font-semibold">
                  View Plans & Register
                  <ArrowRight className="w-5 h-5 w-5 ml-2" />
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
