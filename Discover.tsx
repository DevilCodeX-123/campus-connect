import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const mockProfiles = [
  {
    id: 1,
    name: "Sarah",
    age: 20,
    gender: "female",
    bio: "CS major, love coffee and coding ☕💻",
    interests: ["Coding", "Music", "Travel"],
    image: "👩‍💻",
  },
  {
    id: 2,
    name: "Mike",
    age: 21,
    gender: "male",
    bio: "Engineering student, gym enthusiast 💪",
    interests: ["Fitness", "Gaming", "Sports"],
    image: "👨‍🎓",
  },
  {
    id: 3,
    name: "Emma",
    age: 19,
    gender: "female",
    bio: "Art student, love painting and nature 🎨🌿",
    interests: ["Art", "Photography", "Hiking"],
    image: "👩‍🎨",
  },
];

const Discover = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const currentProfile = mockProfiles[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
      setSwipeDirection(null);
      if (currentIndex < mockProfiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 300);
  };

  if (!currentProfile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-20">
      <div className="container max-w-md mx-auto p-4 pt-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Discover
          </h1>
          <p className="text-muted-foreground">Find your campus match</p>
        </div>

        {/* Profile Card */}
        <div className="relative mb-8">
          <Card 
            className={`overflow-hidden shadow-elevated transition-all duration-300 ${
              swipeDirection === "left" ? "animate-slide-out-left" : 
              swipeDirection === "right" ? "animate-slide-out-right" : 
              "animate-scale-in"
            }`}
          >
            {/* Profile Image Section */}
            <div className={`h-96 flex items-center justify-center ${
              currentProfile.gender === "male" ? "gradient-boy" : "gradient-girl"
            }`}>
              <span className="text-9xl">{currentProfile.image}</span>
            </div>

            {/* Profile Info */}
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {currentProfile.name}
                  <span className="text-lg text-muted-foreground">
                    {currentProfile.age}
                  </span>
                  <Badge 
                    variant="secondary" 
                    className={currentProfile.gender === "male" ? "gradient-boy text-white" : "gradient-girl text-white"}
                  >
                    {currentProfile.gender === "male" ? "♂" : "♀"}
                  </Badge>
                </h2>
              </div>

              <p className="text-muted-foreground">{currentProfile.bio}</p>

              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-8">
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleSwipe("left")}
            className="w-16 h-16 rounded-full border-2 hover:bg-destructive hover:text-white hover:border-destructive transition-all"
          >
            <X className="w-8 h-8" />
          </Button>

          <Button
            size="lg"
            onClick={() => handleSwipe("right")}
            className="w-20 h-20 rounded-full gradient-hero shadow-elevated hover:scale-110 transition-transform"
          >
            <Heart className="w-10 h-10 fill-current" />
          </Button>
        </div>

        {/* Counter */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          {currentIndex + 1} / {mockProfiles.length}
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Discover;
