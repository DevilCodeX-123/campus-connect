import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your college email",
        variant: "destructive",
      });
      return;
    }

    setOtpSent(true);
    toast({
      title: "OTP Sent!",
      description: "Check your email for the verification code",
    });

    // Start timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    // Mock verification - in real app, verify with backend
    toast({
      title: "Success!",
      description: "Logged in successfully",
    });
    
    navigate("/profile-setup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Card className="w-full max-w-md shadow-elevated animate-scale-in">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-hero flex items-center justify-center">
            <span className="text-3xl">🎓</span>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your CampusConnect account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">College Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
            />
          </div>

          {!otpSent ? (
            <Button 
              onClick={handleSendOTP}
              className="w-full gradient-boy"
            >
              Get OTP
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-2xl tracking-widest"
                />
                <p className="text-sm text-muted-foreground text-center">
                  {timer > 0 ? `Resend in ${timer}s` : ""}
                </p>
              </div>

              <Button 
                onClick={handleVerifyOTP}
                className="w-full gradient-boy"
              >
                Verify & Login
              </Button>

              {timer === 0 && (
                <Button 
                  onClick={() => {
                    setTimer(60);
                    handleSendOTP();
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Resend OTP
                </Button>
              )}
            </>
          )}

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Powered by <span className="font-semibold">Devil KK</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
