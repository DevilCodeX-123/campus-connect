import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const mockChats = [
  {
    id: 1,
    name: "Sarah",
    lastMessage: "Hey! How's your day going?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
    image: "👩‍💻",
  },
  {
    id: 2,
    name: "Emma",
    lastMessage: "Let's grab coffee tomorrow!",
    timestamp: "1h ago",
    unread: 0,
    online: false,
    image: "👩‍🎨",
  },
  {
    id: 3,
    name: "Mike",
    lastMessage: "Thanks for the help!",
    timestamp: "3h ago",
    unread: 1,
    online: true,
    image: "👨‍🎓",
  },
];

const ChatList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-20">
      <div className="container max-w-2xl mx-auto p-4 pt-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-muted-foreground">Your conversations</p>
        </div>

        {/* Chat List */}
        <div className="space-y-3">
          {mockChats.map((chat) => (
            <Card
              key={chat.id}
              className="shadow-card hover-lift cursor-pointer"
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full gradient-girl flex items-center justify-center text-2xl">
                    {chat.image}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse-glow" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <Badge className="gradient-hero text-white">
                    {chat.unread}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ChatList;
