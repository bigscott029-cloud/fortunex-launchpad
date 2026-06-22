import { useState, useRef, useEffect } from "react";
import { X, Play, Loader2, Volume2, VolumeX } from "lucide-react";
import { CONFIG } from "@/config/glamour";
import glamourVideo1 from "@/assets/GLAMOUR - FULL EXPLANATION ON HOW GLAMOUR WORKS-1.mp4";
import glamourVideo2 from "@/assets/GLAMOUR - FULL EXPLANATION ON HOW GLAMOUR WORKS-2.mp4";

const demoVideos = [
  {
    title: "Glamour Guide 1",
    description: "Start here for the main earning breakdown.",
    src: glamourVideo1,
  },
  {
    title: "Glamour Guide 2",
    description: "Continue with the second explanation video.",
    src: glamourVideo2,
  },
];

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoMuted?: boolean;
  initialVideoIndex?: number;
  compact?: boolean;
}

const VideoModal = ({
  isOpen,
  onClose,
  autoMuted = false,
  initialVideoIndex = 0,
  compact = false,
}: VideoModalProps) => {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(autoMuted);
  const [activeVideoIndex, setActiveVideoIndex] = useState(initialVideoIndex);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = demoVideos[activeVideoIndex];

  useEffect(() => {
    if (isOpen) {
      setVideoError(false);
      setIsLoading(true);
      setActiveVideoIndex(initialVideoIndex);
      setIsMuted(autoMuted);
    }
  }, [autoMuted, initialVideoIndex, isOpen]);

  useEffect(() => {
    if (!isOpen || videoError || demoVideos.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveVideoIndex((current) => (current + 1) % demoVideos.length);
    }, 60000);

    return () => window.clearInterval(interval);
  }, [isOpen, videoError]);

  useEffect(() => {
    if (!isOpen || videoError) return;

    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
    videoRef.current?.load();
    videoRef.current?.play().catch(() => {
      setIsLoading(false);
    });
  }, [activeVideoIndex, isMuted, isOpen, videoError]);

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const selectVideo = (index: number) => {
    setActiveVideoIndex(index);
    setVideoError(false);
  };

  const toggleMuted = () => {
    setIsMuted((current) => {
      const nextValue = !current;
      if (videoRef.current) {
        videoRef.current.muted = nextValue;
        if (!nextValue) {
          videoRef.current.volume = 1;
        }
      }
      return nextValue;
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-foreground/80 p-3 backdrop-blur-sm animate-fade-up sm:p-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-card shadow-2xl ${
          compact ? "max-w-[min(92vw,360px)] sm:max-w-md" : "max-w-4xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg transition-colors hover:bg-gold hover:text-background sm:right-4 sm:top-4"
          aria-label="Close video"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Video Container */}
        <div
          className="relative w-full bg-card"
          style={{
            paddingBottom: compact ? "133.333%" : "177.778%",
            maxHeight: compact ? "min(70vh, 640px)" : undefined,
          }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-card">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          )}
          
          {!videoError ? (
            <video
              key={activeVideo.src}
              ref={videoRef}
              src={activeVideo.src}
              controls
              autoPlay
              muted={isMuted}
              className="absolute inset-0 w-full h-full object-contain"
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
              onEnded={() => setActiveVideoIndex((current) => (current + 1) % demoVideos.length)}
              poster="/og-image.png"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={`${CONFIG.DEMO_VIDEO_URL}?autoplay=1&rel=0`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Glamour Demo Video"
              onLoad={() => setIsLoading(false)}
            />
          )}

          {!videoError && (
            <button
              type="button"
              onClick={toggleMuted}
              className="absolute bottom-3 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur transition-colors hover:bg-gold hover:text-background sm:bottom-4 sm:right-4"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          )}
        </div>

        {!videoError && !compact && (
          <div className="grid gap-3 border-t border-border bg-background/95 p-4 sm:grid-cols-2">
            {demoVideos.map((video, index) => (
              <button
                key={video.title}
                type="button"
                onClick={() => selectVideo(index)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  index === activeVideoIndex
                    ? "border-gold bg-gold/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-gold/50 hover:text-foreground"
                }`}
              >
                <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Play className="h-4 w-4 text-gold" />
                  {video.title}
                </span>
                <span className="block text-xs leading-5">{video.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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
