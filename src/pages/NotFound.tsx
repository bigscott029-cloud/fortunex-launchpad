import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Sparkles } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="bg-background border-b border-border">
        <div className="container flex items-center justify-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-foreground">
              <span className="text-gold">Glamour</span>
            </span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 animate-fade-up">
            <h1 className="text-8xl md:text-9xl font-display font-bold text-gradient-gold mb-4">
              404
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            
            <p className="text-muted-foreground mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="animate-fade-up-delay-1">
            <Link to="/">
              <Button variant="gold" size="xl">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
