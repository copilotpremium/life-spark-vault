import { Plus, Camera, Mic, Calendar, Heart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      icon: Plus,
      label: "Add Memory",
      description: "Capture a moment",
      gradient: "bg-gradient-memory",
      onClick: () => navigate("/add-memory")
    },
    {
      icon: Calendar,
      label: "New Event",
      description: "Schedule reminder",
      gradient: "bg-gradient-neural",
      onClick: () => navigate("/new-event")
    },
    {
      icon: Camera,
      label: "Photo Memory",
      description: "Save with photo",
      gradient: "bg-gradient-warmth",
      onClick: () => navigate("/photo-memory")
    },
    {
      icon: Mic,
      label: "Voice Note",
      description: "Quick recording",
      gradient: "bg-gradient-card",
      onClick: () => navigate("/voice-note")
    },
    {
      icon: Heart,
      label: "Relationship",
      description: "Update contact",
      gradient: "bg-gradient-warmth",
      onClick: () => navigate("/relationships")
    },
    {
      icon: Brain,
      label: "AI Chat",
      description: "Ask assistant",
      gradient: "bg-gradient-neural",
      onClick: () => navigate("/ai-chat")
    }
  ];

  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            className="h-auto flex-col gap-2 p-4 hover:scale-105 transition-transform group"
            onClick={action.onClick}
          >
            <div className={`w-10 h-10 rounded-xl ${action.gradient} flex items-center justify-center shadow-warm group-hover:shadow-memory transition-all`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};