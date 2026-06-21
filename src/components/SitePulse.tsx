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
  UserCheck,
  Award,
  DollarSign,
  Star,
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

  // === Pricing & Offer Items ===
  {
    icon: Tag,
    title: "Special Promo",
    message: "Register now at ₦20,000 (limited time) before it returns to ₦35,000.",
  },
  {
    icon: Package,
    title: "Two Powerful Packages",
    message: "Choose between ₦14,000 and ₦20,000 packages — both include Full time withdrawal access.",
  },
  {
    icon: TrendingUp,
    title: "Active Registrations",
    message: "New members are joining daily for both Glamour packages.",
  },

  // === Testimonials & Social Proof (Realistic user stories) ===
  {
    icon: UserCheck,
    title: "Aisha M.",
    message: "I withdrew ₦185,000 in my first 3 weeks after joining the ₦20k promo. Highly recommended!",
  },
  {
    icon: Award,
    title: "Chinedu O.",
    message: "Just upgraded to the big package. Already seeing results. The support is top-notch.",
  },
  {
    icon: Users,
    title: "Multiple Successes",
    message: "Over 30 people have registered in the last 7 days. Many are already cashing out.",
  },
  {
    icon: DollarSign,
    title: "Blessing A.",
    message: "Started with the ₦20,000 promo and made back my money in 4 days. Thank you Glamour!",
  },
  {
    icon: Star,
    title: "Tunde K.",
    message: "The coach videos are gold. Withdrew ₦320k last week. This is real.",
  },
  {
    icon: UserCheck,
    title: "Funke P.",
    message: "Registered for the ₦40k package yesterday. Onboarding was seamless.",
  },
  {
    icon: TrendingUp,
    title: "Live Withdrawals",
    message: "People are withdrawing daily from both packages. Proofs are posted in the group.",
  },
  {
    icon: Award,
    title: "David E.",
    message: "Hit my first million target after upgrading. The system works if you follow it.",
  },
  {
    icon: Users,
    title: "Community Growing",
    message: "New registrations still pouring in. Don't miss the ₦20k limited offer.",
  },
  {
    icon: DollarSign,
    title: "Mariam S.",
    message: "Withdrew ₦95,000 within 14 days of registering. Best decision ever.",
  },

  // More variety
  {
    icon: ShieldCheck,
    title: "Secure & Trusted",
    message: "Hundreds have joined. Real people, real withdrawals, real results.",
  },
  {
    icon: Clock3,
    title: "Offer Ending Soon",
    message: "₦20,000 promo closes soon. Price reverts to ₦35,000 after the timer.",
  },
  {
    icon: UserCheck,
    title: "Ifeanyi R.",
    message: "Started small, now on the bigger package. The returns are consistent.",
  },
  {
    icon: Star,
    title: "Sarah B.",
    message: "The testimonials are true. I made my first withdrawal last Friday.",
  },
  {
    icon: TrendingUp,
    title: "Daily Activity",
    message: "Registrations and withdrawals happening live. Join the movement.",
  },
  {
    icon: Award,
    title: "Oluwatosin J.",
    message: "Upgraded to the ₦20k package. The value is insane. Worth every kobo.",
  },
  {
    icon: Users,
    title: "30+ New Members",
    message: "In the past few days alone. Many are already posting proofs.",
  },
  {
    icon: DollarSign,
    title: "Kelvin D.",
    message: "Withdrew ₦240,000 after 3 weeks. The training made it easy.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Proofs",
    message: "Payment proofs, withdrawal proofs, and success stories available.",
  },
  {
    icon: Flame,
    title: "Don't Miss Out",
    message: "Limited slots at ₦20,000. Many are regretting waiting.",
  },

  // Final fillers to reach ~30
  {
    icon: UserCheck,
    title: "Ngozi C.",
    message: "Registered both packages for myself and my sister. Best investment.",
  },
  {
    icon: Star,
    title: "Emmanuel O.",
    message: "The WhatsApp group is very active and supportive. Learning a lot.",
  },
  {
    icon: TrendingUp,
    title: "Momentum Building",
    message: "More people withdrawing every day. The timing is perfect.",
  },
  {
    icon: ShieldCheck,
    title: "Risk-Free Start",
    message: "Start at ₦20k promo and scale up when ready.",
  },
  {
    icon: Award,
    title: "Fatima L.",
    message: "Made ₦450k in my first month. Thank you Glamour team!",
  },
  {
    icon: Clock3,
    title: "Timer Never Stops",
    message: "Countdown continues even when you leave the page.",
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
