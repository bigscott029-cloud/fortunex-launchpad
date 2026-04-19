import { useState, useRef, useEffect } from "react";
import { X, Play, Loader2 } from "lucide-react";
import { CONFIG } from "@/config/glamour";
import glamourVideo from "@/assets/GLAMOUR - FULL EXPLANATION ON HOW GLAMOUR WORKS.mp4";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setVideoError(false);
      setIsLoading(true);
    }
  }, [isOpen]);

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm animate-fade-up"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/90 text-foreground hover:bg-background transition-colors"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Video Container */}
        <div className="aspect-video relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-card">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          )}
          
          {!videoError ? (
            <video
              ref={videoRef}
              src={glamourVideo}
              controls
              autoPlay
              className="w-full h-full"
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
              poster="/og-image.png" // Optional poster image
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={`${CONFIG.DEMO_VIDEO_URL}?autoplay=1&rel=0`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Glamour Demo Video"
              onLoad={() => setIsLoading(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface VideoButtonProps {
  className?: string;
}

interface VideoButtonProps {
  className?: string;
}

export const VideoButton = ({ className }: VideoButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`inline-flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-foreground transition-colors group ${className}`}
        >
          <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gold bg-gold/10 group-hover:bg-gold/20 transition-colors relative overflow-hidden">
            <Play className="w-5 h-5 text-gold ml-0.5" />
            
            {/* Hover Preview Overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-xs font-medium">Watch Demo</div>
              </div>
            )}
          </span>
          <span className="font-medium">Watch Demo</span>
        </button>
        
        {/* Hover Preview Card */}
        {isHovered && (
          <div className="absolute top-full left-0 mt-2 p-4 bg-card border border-border rounded-xl shadow-lg z-10 min-w-[280px] animate-fade-up">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-16 h-12 bg-gold/20 rounded-lg flex items-center justify-center overflow-hidden">
                <Play className="w-6 h-6 text-gold" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  Glamour Demo Video
                </h4>
                <p className="text-muted-foreground text-xs">
                  Learn how Glamour works and start earning today
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default VideoModal;
