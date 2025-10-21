import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const mockMatches = [
  { id: 1, name: "Sarah", age: 20, image: "👩‍💻", mutualInterests: 3 },
  { id: 2, name: "Emma", age: 19, image: "👩‍🎨", mutualInterests: 2 },
];

const mockAdmirers = [
  { id: 3, name: "???", age: 21, image: "🎭", hidden: true },
  { id: 4, name: "???", age: 20, image: "🎭", hidden: true },
];

const Matches = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-20">
      <div className="container max-w-2xl mx-auto p-4 pt-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Matches
          </h1>
          <p className="text-muted-foreground">Connect with your admirers</p>
        </div>

        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="matches">My Matches</TabsTrigger>
            <TabsTrigger value="admirers">Secret Admirers</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-4">
            {mockMatches.map((match) => (
              <Card key={match.id} className="shadow-card hover-lift cursor-pointer">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-20 h-20 rounded-full gradient-girl flex items-center justify-center text-4xl">
                    {match.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {match.name}, {match.age}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {match.mutualInterests} mutual interests
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      <Heart className="w-3 h-3 mr-1 fill-current" />
                      Matched
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    className="gradient-hero"
                    onClick={() => navigate(`/chat/${match.id}`)}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="admirers" className="space-y-4">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-dashed">
              <CardHeader>
                <CardTitle className="text-center text-sm">
                  💝 Like them back to reveal their identity!
                </CardTitle>
              </CardHeader>
            </Card>

            {mockAdmirers.map((admirer) => (
              <Card key={admirer.id} className="shadow-card">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-lg flex items-center justify-center text-4xl relative">
                    <span className="blur-sm">{admirer.image}</span>
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">
                      🔒
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{admirer.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Someone liked you!
                    </p>
                    <Badge variant="secondary" className="mt-1 gradient-hero text-white">
                      Secret Admirer
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate("/discover")}
                  >
                    Discover
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Matches;
