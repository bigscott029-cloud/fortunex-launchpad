import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoGold from "@/assets/logo-gold.png";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <nav className="border-b border-border bg-background">
        <div className="container flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg gradient-gold">
              <img src={logoGold} alt="Glamour Logo" className="h-6 w-6 object-contain" />
            </div>
            <span className="text-xl font-display font-bold text-foreground md:text-2xl">
              <span className="text-gold">G</span>lamour
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="flex flex-1 items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 text-center shadow-card md:p-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
            <AlertCircle className="h-8 w-8 text-gold" />
          </div>

          <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            You Do Not Have An Account
          </h1>

          <p className="mx-auto mb-8 max-w-md text-muted-foreground">
            Click the Sign Up button below to get registered now.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/register?plan=plus">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                Sign Up
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="goldOutline" size="lg" className="w-full sm:w-auto">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Glamour. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
