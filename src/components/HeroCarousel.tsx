import { useState, useEffect } from "react";
import { HERO_IMAGES } from "@/assets/hero-mockup";

interface HeroCarouselProps {
  className?: string;
}

export const HeroCarousel = ({ className = "" }: HeroCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load explicit hero images from barrel export
  useEffect(() => {
    setImages(HERO_IMAGES);
    setIsLoading(false);
  }, []);

  // Rotate images every 7 seconds
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (isLoading || images.length === 0) {
    return (
      <div className={`${className} bg-muted animate-pulse rounded-xl`} />
    );
  }

  return (
    <div className={`${className} relative overflow-hidden rounded-xl`}>
      {/* Image Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Hero carousel slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Carousel Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
