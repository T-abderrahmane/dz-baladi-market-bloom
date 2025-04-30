
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes - hardcoded credentials
    // In a real app, this would validate against a secure backend
    setTimeout(() => {
      if (email === "admin@baladi.com" && password === "admin123") {
        // Store auth state in localStorage
        localStorage.setItem("adminAuthenticated", "true");
        toast({
          title: "Success",
          description: "Welcome to the admin dashboard",
        });
        navigate("/admin");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid credentials",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center">
              <span className="text-baladi-navy font-noto-kufi font-bold text-3xl">بلادي</span>
              <span className="ml-2 text-baladi-terracotta font-semibold text-xl">Market</span>
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-bold">Admin Sign In</h1>
          <p className="mt-2 text-gray-600">Enter your credentials to access the admin panel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@baladi.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-sm text-right mt-2">
                <span className="text-gray-500">Default: admin@baladi.com / admin123</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-baladi-terracotta hover:bg-baladi-terracotta/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;
