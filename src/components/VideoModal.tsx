import { useState } from "react";
import { X, Play } from "lucide-react";
import { CONFIG } from "@/config/glamour";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
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
        <div className="aspect-video">
          <iframe
            src={`${CONFIG.DEMO_VIDEO_URL}?autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Glamour Demo Video"
          />
        </div>
      </div>
    </div>
  );
};

interface VideoButtonProps {
  className?: string;
}

export const VideoButton = ({ className }: VideoButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`inline-flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-foreground transition-colors group ${className}`}
      >
        <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gold bg-gold/10 group-hover:bg-gold/20 transition-colors">
          <Play className="w-5 h-5 text-gold ml-0.5" />
        </span>
        <span className="font-medium">Watch Demo</span>
      </button>
      
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default VideoModal;
