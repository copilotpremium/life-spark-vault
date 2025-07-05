import { Calendar, Heart, Briefcase, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DailyBriefing = () => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const briefingItems = [
    {
      icon: Calendar,
      text: "2 events today: Team meeting at 2pm, Sarah's birthday",
      category: "schedule"
    },
    {
      icon: Heart,
      text: "Remember to call Mom - it's been 3 days",
      category: "relationships"
    },
    {
      icon: Briefcase,
      text: "Project deadline in 5 days",
      category: "work"
    },
    {
      icon: Activity,
      text: "You've created 12 memories this week!",
      category: "achievements"
    }
  ];

  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-glow rounded-full animate-pulse" />
          Daily Briefing
        </CardTitle>
        <p className="text-muted-foreground text-sm">{today}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {briefingItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-4 h-4 text-primary-glow" />
            </div>
            <p className="text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};