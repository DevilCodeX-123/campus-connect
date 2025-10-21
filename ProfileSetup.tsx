import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const ProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [bio, setBio] = useState("");
  const [anonymousMode, setAnonymousMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const progress = (step / 3) * 100;

  const handleNext = () => {
    if (step === 1 && (!username || !age || !gender)) {
      toast({
        title: "Missing Info",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (step === 3) {
      toast({
        title: "Profile Created!",
        description: "Welcome to CampusConnect",
      });
      navigate("/discover");
      return;
    }

    setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Card className="w-full max-w-md shadow-elevated animate-scale-in">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <CardTitle>Setup Your Profile</CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Choose a unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="18"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="18"
                  max="99"
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={gender === "male" ? "default" : "outline"}
                    className={gender === "male" ? "gradient-boy" : ""}
                    onClick={() => setGender("male")}
                  >
                    Male
                  </Button>
                  <Button
                    type="button"
                    variant={gender === "female" ? "default" : "outline"}
                    className={gender === "female" ? "gradient-girl" : ""}
                    onClick={() => setGender("female")}
                  >
                    Female
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself... (max 150 characters)"
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 150))}
                  maxLength={150}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {bio.length}/150
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                  <span className="text-4xl">📸</span>
                </div>
                <Button variant="outline" className="w-full">
                  Upload Profile Photo
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymous" className="text-base">
                    Anonymous Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Hide your photo from others
                  </p>
                </div>
                <Switch
                  id="anonymous"
                  checked={anonymousMode}
                  onCheckedChange={setAnonymousMode}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext}
              className={`flex-1 ${gender === "male" ? "gradient-boy" : gender === "female" ? "gradient-girl" : "gradient-hero"}`}
            >
              {step === 3 ? "Complete" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
