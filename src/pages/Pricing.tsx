import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/PricingCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SitePulse } from "@/components/SitePulse";
import { PLANS, CONFIG } from "@/config/glamour";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Flame,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import logoGold from "@/assets/logo-gold.png"; // ← Your custom golden Glamour logo
import testimonialCoachVideo1 from "@/assets/testimonial-coach-video-1.MP4";
import testimonialMember1 from "@/assets/testimonial-member-1.jpg";
import testimonialPayment1 from "@/assets/testimonial-payment-1.jpg";
import testimonialPayment2 from "@/assets/testimonial-payment-2.jpg";

const rotatingBadgeLabels = [
  "Most Recommended",
  "Best Value",
  "Fastest Recovery",
  "Full Access",
];

const comparisonRows = [
  { label: "Entry fee", plus: "₦20,000", starter: "₦14,000" },
  { label: "Glam Link Bonus", plus: "₦16,000 (€8)", starter: "₦12,500 (€6)" },
  { label: "Glam Reward", plus: "₦20,000 (€10)", starter: "₦10,000 (€5)" },
  { label: "1st indirect", plus: "₦800", starter: "₦400" },
  { label: "2nd indirect", plus: "₦400", starter: "₦100" },
  { label: "Daily earning streams", plus: "7 channels", starter: "2+ channels" },
  { label: "Top hourly stream", plus: "€12/hour", starter: "€2/hour" },
  { label: "Total potential", plus: "€25/hour", starter: "Starter access" },
];

const socialProofStats = [
  { label: "Members", value: CONFIG.MEMBER_COUNT, icon: Users },
  { label: "Plus promo price", value: "₦20,000", icon: Flame },
  { label: "Potential", value: "€25/hour", icon: TrendingUp },
];

const testimonialSlots = [
  {
    name: "Member Proof",
    type: "image",
    note: "Real member testimonial",
    src: testimonialMember1,
  },
  {
    name: "Payment Proof",
    type: "image",
    note: "Payment/result screenshot",
    src: testimonialPayment1,
  },
  {
    name: "Coach Video",
    type: "video",
    note: "Short video proof",
    src: testimonialCoachVideo1,
  },
  {
    name: "More Payment Proof",
    type: "image",
    note: "Extra proof slot",
    src: testimonialPayment2,
  },
];

const getTimeLeft = () => {
  const distance = new Date(CONFIG.PROMO_ENDS_AT).getTime() - Date.now();
  const safeDistance = Math.max(distance, 0);

  return {
    days: Math.floor(safeDistance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((safeDistance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((safeDistance / (1000 * 60)) % 60),
    seconds: Math.floor((safeDistance / 1000) % 60),
    expired: safeDistance === 0,
  };
};

const Pricing = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  const plusBadgeLabel = useMemo(() => {
    const storageKey = "glamour-plus-badge-label";
    const fallback = rotatingBadgeLabels[0];

    if (typeof window === "undefined") {
      return fallback;
    }

    const savedLabel = window.sessionStorage.getItem(storageKey);
    if (savedLabel && rotatingBadgeLabels.includes(savedLabel)) {
      return savedLabel;
    }

    const nextLabel =
      rotatingBadgeLabels[Math.floor(Math.random() * rotatingBadgeLabels.length)];
    window.sessionStorage.setItem(storageKey, nextLabel);
    return nextLabel;
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
            Choose The{" "}
            <span className="text-gradient-gold">Glamour</span> Plan That Moves You Faster
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-up-delay-2">
            Glamour Plus is built for bigger earning channels and faster momentum. Starter remains available when you want a simpler way in.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 max-w-3xl mx-auto animate-fade-up-delay-3">
            <div className="flex items-center justify-center gap-2 rounded-xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-semibold text-foreground">
              <Zap className="h-4 w-4 text-gold" />
              Instant earning boost
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground">
              <TrendingUp className="h-4 w-4 text-gold" />
              Up to €25/hour potential
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-gold" />
              Multiple income channels
            </div>
          </div>
        </div>
      </section>

      {/* Promo Countdown */}
      <section className="pb-8">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-4 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/15 via-card to-card p-4 shadow-gold md:grid-cols-[1fr_auto] md:items-center md:p-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-xs font-bold text-background">
                <Flame className="h-3.5 w-3.5" />
                Limited GlamSlots
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Plus promo is live for a fixed window
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                The ₦20,000 access price is counting down from this launch window. The clock uses one fixed deadline, so it keeps moving when visitors come back.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center sm:gap-3">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="min-w-16 rounded-xl border border-gold/20 bg-background/80 px-3 py-3"
                >
                  <div className="font-display text-2xl font-bold text-gold md:text-3xl">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs font-semibold uppercase text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 md:py-16">
        <div className="container">
          <div className="mb-6 text-center">
            <p className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-bold text-gold">
              {timeLeft.expired
                ? "Promo window has closed. Contact your coach for current slot access."
                : "Grab it fast now: Glamour Plus is ₦20,000 today, normally ₦35,000"}
            </p>
          </div>

          <div className="grid items-start gap-6 md:grid-cols-[1.08fr_0.92fr] md:gap-8 max-w-5xl mx-auto">
            <PricingCard
              planKey="plus"
              name={PLANS.plus.name}
              price={PLANS.plus.price}
              originalPrice={PLANS.plus.originalPrice}
              currency={PLANS.plus.currency}
              features={PLANS.plus.features}
              image={PLANS.plus.image}
              popular={PLANS.plus.popular}
              eyebrow="Recommended package"
              description="The fuller Glamour earning structure with stronger direct rewards, bigger indirects, and more daily earning streams."
              ctaLabel="Grab Plus Now"
              badgeLabel={plusBadgeLabel}
              index={0}
            />
            <PricingCard
              planKey="starter"
              name={PLANS.starter.name}
              price={PLANS.starter.price}
              currency={PLANS.starter.currency}
              features={PLANS.starter.features}
              image={PLANS.starter.image}
              popular={PLANS.starter.popular}
              eyebrow="Alternative entry"
              description="A lighter package for getting started with the previous Glamour benefits while keeping your entry cost lower."
              ctaLabel="Start With Starter"
              index={1}
            />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">
                Compare Packages
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-4xl">
                Plus gives the bigger earning structure
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div className="grid grid-cols-[1.05fr_1fr_1fr] border-b border-border bg-muted/60 text-sm font-bold text-foreground">
                <div className="p-4">Benefit</div>
                <div className="border-l border-border p-4 text-gold">Glamour Plus</div>
                <div className="border-l border-border p-4">Starter</div>
              </div>

              {comparisonRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.05fr_1fr_1fr] text-sm ${
                    index !== comparisonRows.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="p-4 font-semibold text-foreground">{row.label}</div>
                  <div className="border-l border-border bg-gold/5 p-4 font-bold text-gold">
                    {row.plus}
                  </div>
                  <div className="border-l border-border p-4 text-muted-foreground">
                    {row.starter}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Credibility */}
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-gold">
                  <ShieldCheck className="h-4 w-4" />
                  Verified Checkout
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground md:text-4xl">
                  Secure payment, fast confirmation
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                  Payments are routed through SecureFlow Tech Hub and Flutterwave, then your registration connects you to the Glamour team for onboarding.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: CreditCard, title: "Flutterwave payment", text: "Card, transfer, and supported local methods." },
                  { icon: LockKeyhole, title: "Protected checkout", text: "Payment details stay inside the payment gateway." },
                  { icon: BadgeCheck, title: "Auto verification", text: "Successful payment moves you to the next step." },
                  { icon: Clock3, title: "Quick onboarding", text: "WhatsApp connection after registration." },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-background/60 p-4">
                    <item.icon className="mb-3 h-5 w-5 text-gold" />
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">
                  Proof And Momentum
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-4xl">
                  Built to feel active, trusted, and ready
                </h2>
              </div>
              <Link to="/register?plan=plus">
                <Button variant="gold" size="lg" className="w-full md:w-auto">
                  Join Plus Today
                </Button>
              </Link>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              {socialProofStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-5 text-center shadow-card">
                  <stat.icon className="mx-auto mb-3 h-6 w-6 text-gold" />
                  <div className="font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {testimonialSlots.map((slot) => (
                <div key={slot.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                  <div className="flex aspect-[4/3] items-center justify-center bg-muted">
                    {slot.type === "video" ? (
                      <video
                        src={slot.src}
                        controls
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={slot.src}
                        alt={slot.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground">{slot.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{slot.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              Start Once, Unlock Multiple Glamour Channels
            </h3>
            <p className="text-muted-foreground mb-6">
              Your payment is processed securely. After successful payment, you'll be connected with a team automatically via WhatsApp after your registration.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold" />
                Instant Verification
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold" />
                Global Earning Access
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold" />
                WhatsApp Team Connection
              </span>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/register?plan=plus">
                <Button variant="gold" size="lg" className="w-full sm:w-auto">
                  Secure Plus Slot
                </Button>
              </Link>
              <Link to="/register?plan=starter">
                <Button variant="goldOutline" size="lg" className="w-full sm:w-auto">
                  View Starter Instead
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
            © {new Date().getFullYear()} Glamour. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
