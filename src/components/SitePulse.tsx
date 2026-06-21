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
  User,
} from "lucide-react";

const pulseItems = [
  {
    icon: Flame,
    title: "Limited GlamSlots",
    message: "Plus promo access is active at ₦20,000! Hurry before it runs out.",
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    message: "Pay through verified gateways, no hassle.",
  },
    // === Pricing & Offer Items ===
  {
    icon: Tag,
    title: "Special Promo",
    message: "Register now at ₦20,000 (limited time) before it returns to ₦35,000 and goes up again.",
  },
  {
    icon: Package,
    title: "Two Powerful Packages",
    message: "Choose between ₦14,000 and ₦20,000 packages — both have Full time withdrawal access.",
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
    message: "I withdrew ₦185,000 within my first 3 days after joining the ₦20k promo. Highly recommended!",
  },
  {
    icon: Award,
    title: "Chinedu O.",
    message: "Just upgraded to the big package. Already seeing results. The support is top-notch.",
  },
  {
    icon: Users,
    title: "Multiple Successes",
    message: "Over 3,800+ people have registered in the last 7 days and still counting! Many are already cashing out, don't miss out.",
  },
  {
    icon: DollarSign,
    title: "Blessing A.",
    message: "Started with the ₦20,000 promo and made back times 3 of my money in 4 days. Thank you Glamour! God bless you pe",
  },
  {
    icon: Star,
    title: "Tunde K.",
    message: "The coach videos was telling the truth. Withdrew ₦320k last week. This stuff is real.",
  },
  {
    icon: UserCheck,
    title: "Funke P.",
    message: "Registered for the ₦20k package yesterday. It is fast and I am doing the training now.",
  },
  {
    icon: TrendingUp,
    title: "Live Withdrawals",
    message: "People are withdrawing daily from both packages. Check your coach group for proofs.",
  },
  {
    icon: Award,
    title: "David E.",
    message: "Hit my first million target inafter upgrading. The system works if you follow the coach instructiion.",
  },
  {
    icon: Users,
    title: "Join The Growing Community",
    message: "New registrations still pouring in. Don't miss the ₦20k limited offer.",
  },
  {
    icon: DollarSign,
    title: "Mariam S.",
    message: "Withdrew ₦95,000 within 3 days of registering. Best decision ever.",
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
    message: "₦20,000 promo closes in few days. Price reverts to ₦35,000 soon.",
  },
  {
    icon: UserCheck,
    title: "Ifeanyi R.",
    message: "Started small, now on the bigger package. The returns are consistent and I am paying my school fees with the next withdrawal.",
  },
  {
    icon: Star,
    title: "Sarah B.",
    message: "The testimonies are trueeee. I made my first withdrawal of 200k last Friday.",
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
    title: "7,000+ New Members",
    message: "In the past few days alone. Many are already posting proofs.",
  },
  {
    icon: DollarSign,
    title: "Kelvin D.",
    message: "Withdrew ₦240,000 after 1 week. The training made it easy.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Proofs",
    message: "Payment proofs, withdrawal proofs, and success stories available.",
  },
  {
    icon: Flame,
    title: "Don't Miss Out",
    message: "Limited slots at ₦20,000. Many will regretting waiting.",
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
    message: "Made ₦450k in 8 days, I say na lie..., this thing is easyyy. Thank you Glamour coach!",
  },
  {
    icon: User,
    title: "Aisha Bello",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Chinedu Okoro",
    message: "Successfully registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Funke Adebayo",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Tunde Adeyemi",
    message: "Registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Blessing Nwosu",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "David Okafor",
    message: "Successfully registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Ngozi Eze",
    message: "Registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Emmanuel Adewale",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Fatima Ibrahim",
    message: "Registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Ifeanyi Okeke",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Chioma Onwuka",
    message: "Successfully registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Oluwatosin Balogun",
    message: "Registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Kelvin Chukwu",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Mariam Yusuf",
    message: "Registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Segun Ajayi",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Precious Ekanem",
    message: "Successfully registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Ahmed Musa",
    message: "Registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Titilayo Adeola",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Victor Nnamdi",
    message: "Registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Sarah Okon",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "John Oluwafemi",
    message: "Successfully registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Halima Abubakar",
    message: "Registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Chukwuma Eze",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Abigail Peters",
    message: "Registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Rotimi Williams",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Esther Gabriel",
    message: "Successfully registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Francis Udo",
    message: "Registered for the ₦14,000 package.",
  },
  {
    icon: User,
    title: "Patience Nwankwo",
    message: "Just registered for the ₦20,000 package.",
  },
  {
    icon: User,
    title: "Solomon Adegbite",
    message: "Registered for the ₦14,000 package.",
  },

  // === 18 Withdrawals ===
  {
    icon: User,
    title: "Aisha Bello",
    message: "Successfully withdrew ₦185,000.",
  },
  {
    icon: User,
    title: "Chinedu Okoro",
    message: "Withdrew ₦472,000 from the package.",
  },
  {
    icon: User,
    title: "Funke Adebayo",
    message: "Just cashed out ₦98,000.",
  },
  {
    icon: User,
    title: "Tunde Adeyemi",
    message: "Successfully withdrew ₦1,250,000.",
  },
  {
    icon: User,
    title: "Blessing Nwosu",
    message: "Withdrew ₦67,000.",
  },
  {
    icon: User,
    title: "David Okafor",
    message: "Cashed out ₦340,000.",
  },
  {
    icon: User,
    title: "Ngozi Eze",
    message: "Successfully withdrew ₦2,850,000.",
  },
  {
    icon: User,
    title: "Emmanuel Adewale",
    message: "Withdrew ₦124,000.",
  },
  {
    icon: User,
    title: "Fatima Ibrahim",
    message: "Just cashed out ₦890,000.",
  },
  {
    icon: User,
    title: "Ifeanyi Okeke",
    message: "Successfully withdrew ₦47,500.",
  },
  {
    icon: User,
    title: "Chioma Onwuka",
    message: "Withdrew ₦675,000.",
  },
  {
    icon: User,
    title: "Oluwatosin Balogun",
    message: "Cashed out ₦1,780,000.",
  },
  {
    icon: User,
    title: "Kelvin Chukwu",
    message: "Successfully withdrew ₦215,000.",
  },
  {
    icon: User,
    title: "Mariam Yusuf",
    message: "Withdrew ₦3,450,000.",
  },
  {
    icon: User,
    title: "Segun Ajayi",
    message: "Just cashed out ₦520,000.",
  },
  {
    icon: User,
    title: "Precious Ekanem",
    message: "Successfully withdrew ₦1,920,000.",
  },
  {
    icon: User,
    title: "Titilayo Adeola",
    message: "Withdrew ₦285,000.",
  },
  {
    icon: User,
    title: "Victor Nnamdi",
    message: "Cashed out ₦6,000,000.",
  },
  {
    icon: User,
    title: "Aisha Bello",
    message: "Successfully withdrew ₦450,000.",
  },
  {
    icon: User,
    title: "Chinedu Okoro",
    message: "Cashed out ₦1,250,000.",
  },
  {
    icon: User,
    title: "Funke Adebayo",
    message: "Just withdrew ₦780,000.",
  },
  {
    icon: User,
    title: "Tunde Adeyemi",
    message: "Successfully withdrew ₦2,850,000.",
  },
  {
    icon: User,
    title: "Blessing Nwosu",
    message: "Cashed out ₦520,000.",
  },
  {
    icon: User,
    title: "David Okafor",
    message: "Withdrew ₦3,450,000.",
  },
  {
    icon: User,
    title: "Ngozi Eze",
    message: "Successfully withdrew ₦920,000.",
  },
  {
    icon: User,
    title: "Emmanuel Adewale",
    message: "Cashed out ₦1,680,000.",
  },
  {
    icon: User,
    title: "Fatima Ibrahim",
    message: "Just withdrew ₦2,150,000.",
  },
  {
    icon: User,
    title: "Ifeanyi Okeke",
    message: "Successfully withdrew ₦750,000.",
  },
  {
    icon: User,
    title: "Chioma Onwuka",
    message: "Cashed out ₦4,200,000.",
  },
  {
    icon: User,
    title: "Oluwatosin Balogun",
    message: "Withdrew ₦1,950,000.",
  },
  {
    icon: User,
    title: "Kelvin Chukwu",
    message: "Successfully withdrew ₦680,000.",
  },
  {
    icon: User,
    title: "Mariam Yusuf",
    message: "Cashed out ₦5,800,000.",
  },
  {
    icon: User,
    title: "Segun Ajayi",
    message: "Just withdrew ₦1,320,000.",
  },
  {
    icon: User,
    title: "Precious Ekanem",
    message: "Successfully withdrew ₦2,450,000.",
  },
  {
    icon: User,
    title: "Titilayo Adeola",
    message: "Cashed out ₦890,000.",
  },
  {
    icon: User,
    title: "Victor Nnamdi",
    message: "Withdrew ₦3,750,000.",
  },
  {
    icon: User,
    title: "Sarah Okon",
    message: "Successfully withdrew ₦1,150,000.",
  },
  {
    icon: User,
    title: "John Oluwafemi",
    message: "Cashed out ₦2,980,000.",
  },
  {
    icon: User,
    title: "Halima Abubakar",
    message: "Just withdrew ₦650,000.",
  },
  {
    icon: User,
    title: "Rotimi Williams",
    message: "Successfully withdrew ₦4,850,000.",
  },
  {
    icon: User,
    title: "Esther Gabriel",
    message: "Cashed out ₦1,480,000.",
  },
  {
    icon: User,
    title: "Francis Udo",
    message: "Withdrew ₦2,750,000.",
  },
  {
    icon: User,
    title: "Patience Nwankwo",
    message: "Successfully withdrew ₦980,000.",
  },
  {
    icon: User,
    title: "Solomon Adegbite",
    message: "Cashed out ₦5,200,000.",
  },
  {
    icon: User,
    title: "Ahmed Musa",
    message: "Just withdrew ₦1,850,000.",
  },
  {
    icon: User,
    title: "Abigail Peters",
    message: "Successfully withdrew ₦3,250,000.",
  },
  {
    icon: User,
    title: "Chukwuma Eze",
    message: "Cashed out ₦2,680,000.",
  },
  {
    icon: User,
    title: "Fatima Lawal",
    message: "Withdrew ₦6,000,000.",
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
