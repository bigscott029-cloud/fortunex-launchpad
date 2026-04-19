// Configuration for Glamour
// Edit these values to customize the platform

import planStarterImage from "@/assets/plan-starter.jpg";
import planPlusImage from "@/assets/plan-plus.jpg";

export const CONFIG = {
  // Admin WhatsApp number (include country code without +)
  ADMIN_WHATSAPP: "2349134719121",
  
  // Demo video URL (YouTube embed or custom video)
  DEMO_VIDEO_URL: "https://www.youtube.com/embed/8ILqJsM0B6E",
  
  // Payment gateway base URL
  PAYMENT_GATEWAY_URL: "/payment",
  
  // Platform stats
  MEMBER_COUNT: "50,000+",
};

export const PLANS = {
  starter: {
    name: "Glamour Starter",
    price: parseInt(import.meta.env.VITE_STARTER_PRICE || "7500"),
    currency: "₦",
    image: planStarterImage,
    features: [
      { label: "Glamour Connect", value: "₦6,000" },
      { label: "ROI (Return of ADS)", value: "10%" },
      { label: "Indirect Connect 1", value: "₦200" },
      { label: "Indirect Connect 2", value: "₦100" },
      { label: "Glamour Box", value: "₦500" },
      { label: "Instant Glamour Claim", value: "₦5,000" },
      { label: "Casino Games", value: "$50" },
    ],
    popular: false,
  },
  plus: {
    name: "Glamour Plus",
    price: parseInt(import.meta.env.VITE_PLUS_PRICE || "14500"),
    currency: "₦",
    image: planPlusImage,
    features: [
      { label: "Glamour Connect", value: "₦12,500" },
      { label: "ROI (Return of ADS)", value: "10%" },
      { label: "Indirect Connect 1", value: "₦400" },
      { label: "Indirect Connect 2", value: "₦100" },
      { label: "Glamour Box", value: "₦500" },
      { label: "Instant Glamour Claim", value: "₦12,000" },
      { label: "Casino Games", value: "$100" },
    ],
    popular: true,
  },
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
