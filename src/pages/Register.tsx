import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PLANS } from "@/config/glamour";
import { useToast } from "@/hooks/use-toast";
import logoGold from "@/assets/logo-gold.png";
import { Menu } from "lucide-react";

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [planKey, setPlanKey] = useState("starter");
  const [planName, setPlanName] = useState("Glamour Starter");
  const [amount, setAmount] = useState(7500);
  
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    country: "",
  });

  useEffect(() => {
    const plan = searchParams.get("plan") || "starter";
    setPlanKey(plan);
    
    const planData = PLANS[plan as keyof typeof PLANS];
    if (planData) {
      setPlanName(planData.name);
      setAmount(planData.price);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName.trim() || !formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Password validation (min 6 characters)
    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    // Navigate to payment page with plan and user data
    const params = new URLSearchParams({
      plan: planKey,
      amount: amount.toString(),
      name: formData.fullName,
      username: formData.username,
      email: formData.email,
      country: formData.country,
    });
    
    navigate(`/payment?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="bg-background border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center overflow-hidden">
              <img src={logoGold} alt="Glamour Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-foreground">
              <span className="text-gold">Glamour</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="max-w-md w-full">
          {/* Registration Card */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            {/* Logo and Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center overflow-hidden">
                  <img src={logoGold} alt="Glamour Logo" className="w-8 h-8 object-contain" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                <span className="text-gold">Glamour</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2">
                Create Your <span className="text-gold">Account</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Join the Glamour community and start your journey.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleProceed} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground font-semibold">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-semibold">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-foreground font-semibold">
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-semibold">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Proceed Button */}
              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full mt-6"
              >
                Proceed
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-muted-foreground text-sm mt-6">
              Already have an account?{" "}
              <Link to="/" className="text-foreground font-semibold hover:text-gold transition-colors">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Glamour. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
