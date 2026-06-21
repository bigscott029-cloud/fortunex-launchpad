import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Clock3,
  CreditCard,
  Flame,
  Package,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const pulseItems = [
  {
    icon: Flame,
    title: "Limited GlamSlots",
    message: "Plus promo access is active at ₦20,000 while the countdown runs.",
  },
  {
    icon: PlayCircle,
    title: "Watch First",
    message: "The Glamour guide videos are ready before package selection.",
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    message: "Payments continue through the Flutterwave powered gateway.",
  },
  {
    icon: BadgeCheck,
    title: "Package Proof",
    message: "Member proof, payment proof, and coach video are available on pricing.",
  },
  {
    icon: ShieldCheck,
    title: "Team Onboarding",
    message: "Successful registration connects users to WhatsApp onboarding.",
  },
  {
    icon: Clock3,
    title: "Fixed Promo Timer",
    message: "The offer countdown keeps moving when visitors come back.",
  },
  {
    icon: Tag,
    title: "Special Promo",
    message: "Register now at ₦20,000 before the listed ₦35,000 anchor price returns.",
  },
  {
    icon: Package,
    title: "Two Packages",
    message: "Choose Glamour Plus for full access or Starter as the lighter entry.",
  },
  {
    icon: TrendingUp,
    title: "Bigger Structure",
    message: "Plus includes higher link bonus, reward value, and more earning channels.",
  },
  {
    icon: Users,
    title: "Community Flow",
    message: "Registration leads into WhatsApp onboarding with the Glamour team.",
  },
  {
    icon: Zap,
    title: "Quick Decision",
    message: "Compare the plans, watch the guide, and secure your preferred package.",
  },
  {
    icon: Sparkles,
    title: "Proof Section",
    message: "Scroll pricing to view testimonial images, payment proof, and coach video.",
  },
];

interface SitePulseProps {
  className?: string;
}

export const SitePulse = ({ className = "" }: SitePulseProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = useMemo(() => {
    return [...pulseItems].sort(() => Math.random() - 0.5);
  }, []);
  const activeItem = items[activeIndex] || items[0];
  const Icon = activeItem.icon;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <div
      aria-live="polite"
      className={`pointer-events-none fixed bottom-4 left-4 z-30 max-w-[calc(100vw-2rem)] sm:max-w-sm ${className}`}
    >
      <div className="pointer-events-auto rounded-2xl border border-gold/30 bg-background/95 p-4 shadow-gold backdrop-blur-md">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15">
            <Icon className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{activeItem.title}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{activeItem.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
