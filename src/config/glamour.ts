// Configuration for Glamour
// Edit these values to customize the platform

import planStarterImage from "@/assets/plan-starter.jpg";
import planPlusImage from "@/assets/plan-plus.jpg";

export const CONFIG = {
  // Admin WhatsApp number (include country code without +)
  ADMIN_WHATSAPP: import.meta.env.VITE_ADMIN_WHATSAPP || "2349123850317",
  
  // WhatsApp message for contact (editable via .env)
  WHATSAPP_MESSAGE: import.meta.env.VITE_WHATSAPP_MESSAGE || "Hello Admin, I've successfully paid for my plan. Please add me to the group!",
  
  // WhatsApp group link after successful payment (editable via .env)
  WHATSAPP_GROUP_LINK: import.meta.env.VITE_WHATSAPP_GROUP_LINK || "https://chat.whatsapp.com/your-group-invite-link",
  
  // Demo video URL (YouTube embed or custom video)
  DEMO_VIDEO_URL: "https://www.youtube.com/embed/8ILqJsM0B6E",
  
  // Payment gateway base URL
  PAYMENT_GATEWAY_URL: "/payment",
  
  // Platform stats
  MEMBER_COUNT: "150,000+",

  // Fixed promo deadline. Update VITE_PROMO_ENDS_AT in .env to control/reset the timer.
  PROMO_ENDS_AT: import.meta.env.VITE_PROMO_ENDS_AT || "2026-07-27T23:59:59-05:00",
};

export const PROMO = {
  plusPromoPrice: parseInt(import.meta.env.VITE_PLUS_PRICE || "20000"),
  plusRegularPrice: parseInt(import.meta.env.VITE_PLUS_ORIGINAL_PRICE || "35000"),
};

export const PLANS = {
  starter: {
    name: "Glamour Starter",
    price: parseInt(import.meta.env.VITE_STARTER_PRICE || "14000"),
    currency: "₦",
    image: planStarterImage,
    features: [
      { label: "Glam Link Bonus", value: "₦12,500 (€6)" },
      { label: "GlamLifestyle", value: "€2/hour" },
      { label: "Indirect Connect 1", value: "₦400" },
      { label: "Indirect Connect 2", value: "₦100" },
      { label: "Glam Reward", value: "₦10,000 (€5)" },
      { label: "GlamFaceTime", value: "€2/hour" },
      { label: "GlamGains", value: "€12" },
    ],
    popular: false,
  },
  plus: {
    name: "Glamour Plus",
    price: PROMO.plusPromoPrice,
    originalPrice: PROMO.plusRegularPrice,
    currency: "₦",
    image: planPlusImage,
    features: [
      { label: "Glam Fee", value: "₦20,000 (€10)" },
      { label: "Glam Link Bonus", value: "₦16,000 (€8)" },
      { label: "Glam Reward", value: "₦20,000 (€10)" },
      { label: "1st Indirect", value: "₦800" },
      { label: "2nd Indirect", value: "₦400" },
      { label: "GlamLifestyle", value: "€7/hour" },
      { label: "GlamScript2Cash", value: "€8/script" },
      { label: "GlamRealtime", value: "€7/hour" },
      { label: "GlamLingua", value: "€7/hour" },
      { label: "GlamFaceTime", value: "€10/hour" },
      { label: "GlamWorks", value: "€8/hour" },
      { label: "GlamDarkMode", value: "€12/hour" },
      { label: "Total Potential", value: "€25/hour" },
    ],
    popular: true,
  },
};

export const getPromoState = () => {
  const endsAt = new Date(CONFIG.PROMO_ENDS_AT).getTime();
  const distance = Number.isNaN(endsAt) ? 0 : endsAt - Date.now();
  const safeDistance = Math.max(distance, 0);

  return {
    endsAt,
    isActive: safeDistance > 0,
    distance: safeDistance,
    days: Math.floor(safeDistance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((safeDistance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((safeDistance / (1000 * 60)) % 60),
    seconds: Math.floor((safeDistance / 1000) % 60),
  };
};

export const getEffectivePlan = (planKey: keyof typeof PLANS) => {
  const plan = PLANS[planKey];

  if (planKey !== "plus") {
    return {
      ...plan,
      originalPrice: undefined,
      promoActive: false,
    };
  }

  const promoActive = getPromoState().isActive;

  return {
    ...plan,
    price: promoActive ? PROMO.plusPromoPrice : PROMO.plusRegularPrice,
    originalPrice: promoActive ? PROMO.plusRegularPrice : undefined,
    promoActive,
  };
};

// Generate WhatsApp URL with prefilled message
export const generateWhatsAppUrl = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONFIG.ADMIN_WHATSAPP}?text=${encodedMessage}`;
};

// Generate payment URL with parameters
export const generatePaymentUrl = (planKey: string, amount: number): string => {
  return `${CONFIG.PAYMENT_GATEWAY_URL}?plan=${planKey}&amount=${amount}`;
};
