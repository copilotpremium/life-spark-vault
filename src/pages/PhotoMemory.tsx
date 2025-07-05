import { useState, useRef } from "react";
import { ArrowLeft, Save, Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PhotoMemory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [memory, setMemory] = useState({
    title: "",
    description: "",
    location: "",
    people: "",
    category: "personal"
  });
  
  const [photos, setPhotos] = useState<string[]>([]);

  const categories = [
    { id: "personal", label: "Personal", color: "bg-memory-personal/20 text-memory-personal" },
    { id: "work", label: "Work", color: "bg-memory-work/20 text-memory-work" },
    { id: "family", label: "Family", color: "bg-memory-family/20 text-memory-family" },
    { id: "health", label: "Health", color: "bg-memory-health/20 text-memory-health" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotos(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!memory.title || photos.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add a title and at least one photo",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Photo Memory Saved",
      description: "Your photo memory has been added to your vault",
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
            Photo Memory
          </h1>
        </div>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary-glow" />
              Capture with Photos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Photo Upload Section */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Photos</label>
              
              {photos.length === 0 ? (
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">Click to add photos</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Memory photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Add More Photos
                  </Button>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="What's this photo about?"
                value={memory.title}
                onChange={(e) => setMemory({ ...memory, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Tell the story behind these photos..."
                rows={4}
                value={memory.description}
                onChange={(e) => setMemory({ ...memory, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="Where was this taken?"
                  value={memory.location}
                  onChange={(e) => setMemory({ ...memory, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">People</label>
                <Input
                  placeholder="Who's in the photos?"
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

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Photo Memory
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

export default PhotoMemory;