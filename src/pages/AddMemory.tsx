import { useState } from "react";
import { ArrowLeft, Save, MapPin, Users, Camera, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AddMemory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [memory, setMemory] = useState({
    title: "",
    description: "",
    location: "",
    people: "",
    category: "personal",
    emotion: "neutral"
  });

  const categories = [
    { id: "personal", label: "Personal", color: "bg-memory-personal/20 text-memory-personal" },
    { id: "work", label: "Work", color: "bg-memory-work/20 text-memory-work" },
    { id: "family", label: "Family", color: "bg-memory-family/20 text-memory-family" },
    { id: "health", label: "Health", color: "bg-memory-health/20 text-memory-health" }
  ];

  const emotions = ["joy", "peaceful", "accomplished", "grateful", "excited", "content", "neutral"];

  const handleSave = () => {
    if (!memory.title || !memory.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and description",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Memory Saved",
      description: "Your memory has been added to your vault",
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
            Add Memory
          </h1>
        </div>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary-glow" />
              Capture Your Memory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="What happened?"
                value={memory.title}
                onChange={(e) => setMemory({ ...memory, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Tell the story of this memory..."
                rows={4}
                value={memory.description}
                onChange={(e) => setMemory({ ...memory, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <Input
                  placeholder="Where did this happen?"
                  value={memory.location}
                  onChange={(e) => setMemory({ ...memory, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  People
                </label>
                <Input
                  placeholder="Who was there? (comma separated)"
                  value={memory.people}
                  onChange={(e) => setMemory({ ...memory, people: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat.id}
                    className={`cursor-pointer transition-all ${
                      memory.category === cat.id ? cat.color : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => setMemory({ ...memory, category: cat.id })}
                  >
                    {cat.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">How did you feel?</label>
              <div className="flex flex-wrap gap-2">
                {emotions.map((emotion) => (
                  <Badge
                    key={emotion}
                    className={`cursor-pointer transition-all capitalize ${
                      memory.emotion === emotion 
                        ? "bg-primary/20 text-primary-glow" 
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => setMemory({ ...memory, emotion })}
                  >
                    {emotion}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Memory
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

export default AddMemory;