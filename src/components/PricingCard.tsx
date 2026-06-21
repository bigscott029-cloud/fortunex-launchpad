import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PricingFeature {
  label: string;
  value: string;
}

interface PricingCardProps {
  planKey: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  features: PricingFeature[];
  image?: string;
  popular?: boolean;
  eyebrow?: string;
  description?: string;
  ctaLabel?: string;
  badgeLabel?: string;
  index?: number;
}

const PricingCard = ({
  planKey,
  name,
  price,
  originalPrice,
  currency,
  features,
  image,
  popular = false,
  eyebrow,
  description,
  ctaLabel = "Register Now",
  badgeLabel = "Best Value",
  index = 0,
}: PricingCardProps) => {
  const navigate = useNavigate();
  
  const handleRegister = () => {
    navigate(`/register?plan=${planKey}`);
  };

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 ${
        popular
          ? "bg-gradient-to-br from-gold/20 via-card to-card border-2 border-gold shadow-gold"
          : "bg-card border border-border"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Plan Image */}
      {image && (
        <div className="w-full overflow-hidden">
          <img
            src={image}
            alt={`${name} plan`}
            className="h-44 w-full object-cover sm:h-52"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6 md:p-8">
        {/* Popular Badge */}
        {popular && (
          <div className="absolute top-4 right-4 px-3 py-1 gradient-gold rounded-full text-xs font-bold text-foreground flex items-center gap-1 shadow-gold">
            <Star className="w-3 h-3" />
            {badgeLabel}
          </div>
        )}

        {/* Plan Name */}
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </p>
        )}
        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
          {name}
        </h3>
        {description && (
          <p className="mb-5 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-6 flex-wrap">
          {originalPrice && (
            <span className="text-lg md:text-xl text-muted-foreground line-through">
              {currency}{originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-3xl md:text-4xl font-bold text-gold font-display">
            {currency}{price.toLocaleString()}
          </span>
          <span className="text-muted-foreground">/one-time</span>
        </div>

        {/* Features */}
        <ul className="flex-1 space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl bg-background/55 px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20">
                  <Check className="w-3 h-3 text-gold" />
                </span>
                <span className="min-w-0 text-sm text-foreground md:text-base">
                  {feature.label}
                </span>
              </div>
              <span className="whitespace-nowrap text-sm font-semibold text-gold md:text-base">
                {feature.value}
              </span>
            </li>
          ))}
        </ul>

        {/* Register Button */}
        <Button
          onClick={handleRegister}
          variant={popular ? "gold" : "goldOutline"}
          size="lg"
          className="w-full"
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
