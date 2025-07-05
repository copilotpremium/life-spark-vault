import { Calendar, MapPin, Users, Camera, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const MemoryCards = () => {
  const memories = [
    {
      id: 1,
      title: "Sarah's Surprise Party",
      date: "2024-01-15",
      category: "family",
      location: "Central Park",
      people: ["Sarah", "Mike", "Emma"],
      description: "Amazing surprise party with all friends. Sarah was so happy!",
      image: "🎉",
      emotion: "joy"
    },
    {
      id: 2,
      title: "Project Launch Success",
      date: "2024-01-10",
      category: "work",
      location: "Office",
      people: ["Team"],
      description: "Finally launched the new app. 6 months of hard work paid off!",
      image: "🚀",
      emotion: "accomplished"
    },
    {
      id: 3,
      title: "Beach Weekend",
      date: "2024-01-05",
      category: "personal",
      location: "Santa Monica",
      people: ["Alex", "Jordan"],
      description: "Perfect weather, great waves, and amazing sunset. Feeling recharged.",
      image: "🏖️",
      emotion: "peaceful"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      family: "bg-memory-family/20 text-memory-family",
      work: "bg-memory-work/20 text-memory-work",
      personal: "bg-memory-personal/20 text-memory-personal",
      health: "bg-memory-health/20 text-memory-health"
    };
    return colors[category as keyof typeof colors] || colors.personal;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Memories</h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary-glow">
          {memories.length} this week
        </Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {memories.map((memory) => (
          <Card key={memory.id} className="bg-gradient-card shadow-card border-border/50 hover:shadow-memory transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{memory.image}</div>
                  <div>
                    <CardTitle className="text-base group-hover:text-primary-glow transition-colors">
                      {memory.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(memory.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={getCategoryColor(memory.category)}>
                  {memory.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {memory.description}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {memory.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {memory.people.join(", ")}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};