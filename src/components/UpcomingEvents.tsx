import { Calendar, Gift, Coffee, Briefcase, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Mom's Birthday",
      date: "2024-01-20",
      time: "All day",
      type: "birthday",
      priority: "high",
      reminder: "3 days before",
      icon: Gift,
      person: "Mom"
    },
    {
      id: 2,
      title: "Team Meeting",
      date: "2024-01-16",
      time: "2:00 PM",
      type: "work",
      priority: "medium",
      reminder: "1 hour before",
      icon: Briefcase,
      location: "Conference Room A"
    },
    {
      id: 3,
      title: "Coffee with Sarah",
      date: "2024-01-18",
      time: "10:00 AM",
      type: "personal",
      priority: "low",
      reminder: "30 minutes before",
      icon: Coffee,
      person: "Sarah"
    },
    {
      id: 4,
      title: "Annual Checkup",
      date: "2024-01-25",
      time: "3:00 PM",
      type: "health",
      priority: "high",
      reminder: "1 day before",
      icon: AlertCircle,
      location: "Dr. Smith's Office"
    }
  ];

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "bg-destructive/20 text-destructive",
      medium: "bg-secondary/20 text-secondary-foreground",
      low: "bg-accent/20 text-accent-foreground"
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 0) return "Past";
    return `In ${diffDays} days`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary-glow">
          {events.length} scheduled
        </Badge>
      </div>
      
      <div className="space-y-3">
        {events.map((event) => (
          <Card key={event.id} className="bg-gradient-card shadow-card border-border/50 hover:shadow-memory transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                  <event.icon className="w-5 h-5 text-primary-glow" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium group-hover:text-primary-glow transition-colors">
                      {event.title}
                    </h3>
                    <Badge className={getPriorityColor(event.priority)}>
                      {event.priority}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                  </div>
                  
                  {(event.person || event.location) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.person && `With ${event.person}`}
                      {event.location && `At ${event.location}`}
                    </p>
                  )}
                </div>
                
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-primary-glow">
                    {getDaysUntil(event.date)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Remind {event.reminder}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};