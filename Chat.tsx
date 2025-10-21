import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Image as ImageIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const mockMessages = [
  { id: 1, text: "Hey! How's it going?", sender: "them", timestamp: "10:30 AM" },
  { id: 2, text: "Hi! Going great, how about you?", sender: "me", timestamp: "10:32 AM" },
  { id: 3, text: "Pretty good! Want to study together?", sender: "them", timestamp: "10:33 AM" },
];

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const handleSend = () => {
    if (!message.trim()) return;

    if (isFirstMessage) {
      setShowPermissionDialog(true);
      return;
    }

    sendMessage();
  };

  const sendMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "me" as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handlePermissionAccept = () => {
    setIsFirstMessage(false);
    setShowPermissionDialog(false);
    sendMessage();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="bg-card border-b shadow-sm p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/chats")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-full gradient-girl flex items-center justify-center text-xl">
              👩‍💻
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <h2 className="font-semibold">Sarah</h2>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <Card
              className={`max-w-[80%] p-3 ${
                msg.sender === "me"
                  ? "gradient-boy text-white"
                  : "bg-card"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === "me" ? "text-white/70" : "text-muted-foreground"
              }`}>
                {msg.timestamp}
              </p>
            </Card>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-card border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ImageIcon className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} className="gradient-boy">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Permission Dialog */}
      <AlertDialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start Chatting?</AlertDialogTitle>
            <AlertDialogDescription>
              Sarah wants to start chatting with you. Do you want to reveal your profile photo to them?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Decline</AlertDialogCancel>
            <AlertDialogAction onClick={handlePermissionAccept} className="gradient-boy">
              Accept & Reveal
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Chat;
