import { useState } from "react";
import { ArrowLeft, Save, Plus, Heart, Phone, Mail, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Relationships = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "friend",
    phone: "",
    email: "",
    birthday: "",
    location: "",
    notes: "",
    interests: ""
  });

  const relationships = [
    { id: "family", label: "Family", color: "bg-memory-family/20 text-memory-family", icon: "👨‍👩‍👧‍👦" },
    { id: "friend", label: "Friend", color: "bg-memory-personal/20 text-memory-personal", icon: "👥" },
    { id: "colleague", label: "Colleague", color: "bg-memory-work/20 text-memory-work", icon: "💼" },
    { id: "acquaintance", label: "Acquaintance", color: "bg-accent/20 text-accent-foreground", icon: "🤝" }
  ];

  const existingContacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      relationship: "friend",
      phone: "+1 (555) 123-4567",
      email: "sarah@email.com",
      birthday: "1995-07-15",
      location: "San Francisco",
      notes: "Met at college, loves hiking and photography",
      interests: "Photography, Hiking, Coffee",
      lastContact: "2024-01-10"
    },
    {
      id: 2,
      name: "Mom",
      relationship: "family",
      phone: "+1 (555) 987-6543",
      birthday: "1970-03-22",
      location: "Chicago",
      notes: "Call every Sunday, loves gardening",
      interests: "Gardening, Cooking, Reading",
      lastContact: "2024-01-12"
    }
  ];

  const handleSave = () => {
    if (!newContact.name || !newContact.relationship) {
      toast({
        title: "Missing Information",
        description: "Please fill in the name and relationship",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Contact Added",
      description: "Your contact has been saved successfully",
    });
    
    setNewContact({
      name: "",
      relationship: "friend",
      phone: "",
      email: "",
      birthday: "",
      location: "",
      notes: "",
      interests: ""
    });
    setShowAddForm(false);
  };

  const getRelationshipInfo = (relId: string) => {
    return relationships.find(r => r.id === relId) || relationships[1];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-neural opacity-5 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-neural bg-clip-text text-transparent">
              Relationships
            </h1>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>

        {showAddForm && (
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary-glow" />
                Add New Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    placeholder="Full name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Relationship</label>
                  <div className="flex flex-wrap gap-2">
                    {relationships.map((rel) => (
                      <Badge
                        key={rel.id}
                        className={`cursor-pointer transition-all ${
                          newContact.relationship === rel.id ? rel.color : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                        }`}
                        onClick={() => setNewContact({ ...newContact, relationship: rel.id })}
                      >
                        {rel.icon} {rel.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Birthday
                  </label>
                  <Input
                    type="date"
                    value={newContact.birthday}
                    onChange={(e) => setNewContact({ ...newContact, birthday: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <Input
                    placeholder="City, State"
                    value={newContact.location}
                    onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Interests</label>
                <Input
                  placeholder="What do they enjoy? (comma separated)"
                  value={newContact.interests}
                  onChange={(e) => setNewContact({ ...newContact, interests: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  placeholder="Any special notes about this person..."
                  rows={3}
                  value={newContact.notes}
                  onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Contact
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Existing Contacts */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Contacts</h2>
          <div className="grid gap-4">
            {existingContacts.map((contact) => {
              const relInfo = getRelationshipInfo(contact.relationship);
              return (
                <Card key={contact.id} className="bg-gradient-card shadow-card border-border/50 hover:shadow-memory transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/20 text-primary-glow">
                          {getInitials(contact.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold group-hover:text-primary-glow transition-colors">
                            {contact.name}
                          </h3>
                          <Badge className={relInfo.color}>
                            {relInfo.icon} {relInfo.label}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {contact.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              {contact.phone}
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              {contact.email}
                            </div>
                          )}
                          {contact.birthday && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              Birthday: {new Date(contact.birthday).toLocaleDateString()}
                            </div>
                          )}
                          {contact.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              {contact.location}
                            </div>
                          )}
                        </div>
                        
                        {contact.notes && (
                          <p className="text-sm mt-2 text-muted-foreground italic">
                            "{contact.notes}"
                          </p>
                        )}
                        
                        {contact.interests && (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground mb-1">Interests:</p>
                            <div className="flex flex-wrap gap-1">
                              {contact.interests.split(',').map((interest, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {interest.trim()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relationships;
