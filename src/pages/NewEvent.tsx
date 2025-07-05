import { useState } from "react";
import { ArrowLeft, Save, Calendar, Clock, Bell, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const NewEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    people: "",
    type: "personal",
    priority: "medium",
    reminder: "1 hour before",
    recurring: "none"
  });

  const eventTypes = [
    { id: "personal", label: "Personal", icon: "🌟" },
    { id: "work", label: "Work", icon: "💼" },
    { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
    { id: "health", label: "Health", icon: "🏥" },
    { id: "birthday", label: "Birthday", icon: "🎂" },
    { id: "anniversary", label: "Anniversary", icon: "💕" }
  ];

  const priorities = [
    { id: "low", label: "Low", color: "bg-accent/20 text-accent-foreground" },
    { id: "medium", label: "Medium", color: "bg-secondary/20 text-secondary-foreground" },
    { id: "high", label: "High", color: "bg-destructive/20 text-destructive" }
  ];

  const reminderOptions = [
    "15 minutes before",
    "30 minutes before", 
    "1 hour before",
    "2 hours before",
    "1 day before",
    "3 days before",
    "1 week before"
  ];

  const recurringOptions = [
    { id: "none", label: "One-time" },
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" }
  ];

  const handleSave = () => {
    if (!event.title || !event.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and date",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Event Created",
      description: "Your event has been scheduled successfully",
    });
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-neural opacity-5 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-neural bg-clip-text text-transparent">
            New Event
          </h1>
        </div>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-glow" />
              Schedule Your Event
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Title</label>
              <Input
                placeholder="What's the event?"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Add details about the event..."
                rows={3}
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </label>
                <Input
                  type="date"
                  value={event.date}
                  onChange={(e) => setEvent({ ...event, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time
                </label>
                <Input
                  type="time"
                  value={event.time}
                  onChange={(e) => setEvent({ ...event, time: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <Input
                  placeholder="Where will this happen?"
                  value={event.location}
                  onChange={(e) => setEvent({ ...event, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  People
                </label>
                <Input
                  placeholder="Who will be there?"
                  value={event.people}
                  onChange={(e) => setEvent({ ...event, people: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Event Type</label>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <Badge
                    key={type.id}
                    className={`cursor-pointer transition-all ${
                      event.type === type.id 
                        ? "bg-primary/20 text-primary-glow" 
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => setEvent({ ...event, type: type.id })}
                  >
                    {type.icon} {type.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <div className="flex gap-2">
                {priorities.map((priority) => (
                  <Badge
                    key={priority.id}
                    className={`cursor-pointer transition-all ${
                      event.priority === priority.id ? priority.color : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => setEvent({ ...event, priority: priority.id })}
                  >
                    {priority.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Reminder
                </label>
                <Select value={event.reminder} onValueChange={(value) => setEvent({ ...event, reminder: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reminderOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Recurring</label>
                <Select value={event.recurring} onValueChange={(value) => setEvent({ ...event, recurring: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {recurringOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Create Event
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewEvent;