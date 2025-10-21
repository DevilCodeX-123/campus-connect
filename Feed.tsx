import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const mockStories = [
  { id: 1, name: "Sarah", avatar: "👩‍💻", hasStory: true },
  { id: 2, name: "Mike", avatar: "👨‍🎓", hasStory: true },
  { id: 3, name: "Emma", avatar: "👩‍🎨", hasStory: true },
  { id: 4, name: "John", avatar: "👨‍💼", hasStory: false },
];

const mockPosts = [
  {
    id: 1,
    author: "Sarah",
    avatar: "👩‍💻",
    content: "Just finished my project! Feeling accomplished 🎉",
    likes: 42,
    comments: 8,
    timestamp: "2h ago",
  },
  {
    id: 2,
    author: "Mike",
    avatar: "👨‍🎓",
    content: "Beautiful day on campus! Anyone up for frisbee? 🥏",
    likes: 28,
    comments: 12,
    timestamp: "4h ago",
  },
  {
    id: 3,
    author: "Emma",
    avatar: "👩‍🎨",
    content: "New art piece done! Check out my portfolio 🎨",
    likes: 56,
    comments: 15,
    timestamp: "6h ago",
  },
];

const Feed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-20">
      <div className="container max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-6 px-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Campus Feed
          </h1>
          <p className="text-muted-foreground">Stay connected with friends</p>
        </div>

        {/* Stories */}
        <div className="px-4 mb-6">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {mockStories.map((story) => (
              <div key={story.id} className="flex flex-col items-center gap-2 min-w-fit">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                    story.hasStory
                      ? "bg-gradient-to-br from-primary to-secondary p-1"
                      : "bg-muted"
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span>{story.avatar}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{story.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4 px-4">
          {mockPosts.map((post) => (
            <Card key={post.id} className="shadow-card">
              <CardContent className="p-4 space-y-3">
                {/* Post Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-girl flex items-center justify-center text-xl">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.author}</h3>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-sm leading-relaxed">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center gap-1 pt-2 border-t">
                  <Button variant="ghost" size="sm" className="flex-1 gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 gap-2">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share</span>
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

export default Feed;
