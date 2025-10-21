import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const mockConfessions = [
  {
    id: 1,
    text: "I have a crush on someone in my CS class but I'm too shy to talk to them 🙈",
    gender: "female",
    timestamp: "2h ago",
    likes: 24,
  },
  {
    id: 2,
    text: "Just aced my midterm! Hard work really pays off 💪",
    gender: "male",
    timestamp: "4h ago",
    likes: 18,
  },
  {
    id: 3,
    text: "Sometimes I feel like everyone else has it all figured out except me",
    gender: "female",
    timestamp: "6h ago",
    likes: 42,
  },
  {
    id: 4,
    text: "Best day ever! Got asked out by my study partner 😊",
    gender: "male",
    timestamp: "8h ago",
    likes: 56,
  },
];

const ConfessionWall = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-20">
      <div className="container max-w-2xl mx-auto p-4 pt-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Confession Wall
          </h1>
          <p className="text-muted-foreground">Share your thoughts anonymously</p>
        </div>

        {/* Post Button */}
        <Button
          onClick={() => navigate("/post-confession")}
          className="w-full mb-6 gradient-hero shadow-elevated"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Post a Confession
        </Button>

        {/* Confessions Feed */}
        <div className="space-y-4">
          {mockConfessions.map((confession) => (
            <Card
              key={confession.id}
              className={`shadow-card hover-lift ${
                confession.gender === "male"
                  ? "border-l-4 border-l-primary"
                  : "border-l-4 border-l-secondary"
              }`}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <Badge
                    className={`${
                      confession.gender === "male" ? "gradient-boy" : "gradient-girl"
                    } text-white`}
                  >
                    {confession.gender === "male" ? "♂ Male" : "♀ Female"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {confession.timestamp}
                  </span>
                </div>

                <p className="text-sm leading-relaxed">{confession.text}</p>

                <div className="flex items-center gap-4 pt-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{confession.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Reply</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ConfessionWall;
