import { useNavigate, useLocation } from "react-router-dom";
import { Home, Heart, MessageCircle, Newspaper, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/discover", icon: Home, label: "Discover" },
    { path: "/matches", icon: Heart, label: "Matches" },
    { path: "/confessions", icon: Newspaper, label: "Confessions" },
    { path: "/chats", icon: MessageCircle, label: "Chats" },
    { path: "/feed", icon: User, label: "Feed" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-elevated z-50">
      <div className="container max-w-2xl mx-auto px-2">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.path)}
                className={`flex flex-col gap-1 h-auto py-2 px-3 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "fill-current" : ""}`} />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
