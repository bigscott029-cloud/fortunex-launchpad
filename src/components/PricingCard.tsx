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
  currency: string;
  features: PricingFeature[];
  image?: string;
  popular?: boolean;
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
  index = 0,
}: PricingCardProps) => {
  const navigate = useNavigate();
  
  const handleRegister = () => {
    navigate(`/register?plan=${planKey}`);
  };

  return (
    <div
      className={`relative flex flex-col rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 ${
        popular
          ? "bg-gradient-to-br from-gold/20 via-card to-card border-2 border-gold"
          : "bg-card border border-border"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Plan Image */}
      {image && (
        <div className="w-full overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={`${name} plan`}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6 md:p-8">
        {/* Popular Badge */}
        {popular && (
          <div className="absolute top-4 right-4 px-3 py-1 gradient-gold rounded-full text-xs font-bold text-foreground flex items-center gap-1 shadow-gold">
            <Star className="w-3 h-3" />
            Popular
          </div>
        )}

        {/* Plan Name */}
        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
          {name}
        </h3>

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
            <li key={idx} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold/20">
                  <Check className="w-3 h-3 text-gold" />
                </span>
                <span className="text-foreground">{feature.label}</span>
              </div>
              <span className="font-semibold text-gold">{feature.value}</span>
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
          Register Now
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
