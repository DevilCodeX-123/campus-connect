import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PostConfession = () => {
  const [confession, setConfession] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePost = () => {
    if (!confession.trim()) {
      toast({
        title: "Empty confession",
        description: "Please write something before posting",
        variant: "destructive",
      });
      return;
    }

    if (!gender) {
      toast({
        title: "Select gender",
        description: "Please select your gender for color coding",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Posted!",
      description: "Your confession has been shared anonymously",
    });

    navigate("/confessions");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container max-w-2xl mx-auto p-4 pt-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/confessions")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Share Your Confession</h1>
            <p className="text-sm text-muted-foreground">Anonymous and safe</p>
          </div>
        </div>

        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>What's on your mind?</CardTitle>
            <CardDescription>
              Your identity will remain completely anonymous
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="confession">Your Confession</Label>
              <Textarea
                id="confession"
                placeholder="Share your thoughts, feelings, or experiences..."
                value={confession}
                onChange={(e) => setConfession(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {confession.length} characters
              </p>
            </div>

            <div className="space-y-2">
              <Label>Select Gender (for color coding)</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={gender === "male" ? "default" : "outline"}
                  className={gender === "male" ? "gradient-boy" : ""}
                  onClick={() => setGender("male")}
                >
                  ♂ Male
                </Button>
                <Button
                  type="button"
                  variant={gender === "female" ? "default" : "outline"}
                  className={gender === "female" ? "gradient-girl" : ""}
                  onClick={() => setGender("female")}
                >
                  ♀ Female
                </Button>
              </div>
            </div>

            <Button
              onClick={handlePost}
              className="w-full gradient-hero"
              size="lg"
            >
              Post Anonymously
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostConfession;
