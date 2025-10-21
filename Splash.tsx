import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroCampus from "@/assets/hero-campus.jpg";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroCampus} 
          alt="College Campus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
        {/* Logo/Brand */}
        <div className="mb-8 animate-bounce-in">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full gradient-hero shadow-elevated flex items-center justify-center">
            <span className="text-4xl">💕</span>
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CampusConnect
          </h1>
          <p className="text-muted-foreground text-lg">
            Where College Hearts Meet
          </p>
        </div>

        <Button 
          onClick={() => navigate("/login")}
          size="lg"
          className="gradient-hero text-white shadow-elevated hover:scale-105 transition-transform px-12 py-6 text-lg rounded-full"
        >
          Get Started
        </Button>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 pb-8 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by <span className="font-semibold">Devil KK</span>
        </p>
      </div>
    </div>
  );
};

export default Splash;
