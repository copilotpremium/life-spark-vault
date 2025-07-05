import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Brain, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your personal AI assistant. I can help you with your memories, suggest activities, remind you about important dates, or just have a conversation. What would you like to talk about?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "What should I do this weekend?",
    "Remind me about upcoming birthdays",
    "Help me plan Mom's birthday surprise",
    "What memories did I create last month?",
    "Give me a motivational quote",
    "How can I be more organized?"
  ];

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    // Simulate AI response (in real app, this would call an AI API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(userMessage.content),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('weekend') || input.includes('do this')) {
      return "Based on your interests and past activities, here are some suggestions for this weekend:\n\n• Visit that new coffee shop you bookmarked\n• Call Sarah - you haven't talked in a while\n• Try that hiking trail you mentioned wanting to explore\n• Work on your photography project\n\nWould you like me to help you plan any of these activities?";
    }
    
    if (input.includes('birthday') || input.includes('birthdays')) {
      return "I see you have some upcoming birthdays:\n\n• Mom's birthday is in 8 days (January 20th)\n• Sarah's birthday is next month (February 15th)\n\nWould you like me to help you plan something special for any of these occasions?";
    }
    
    if (input.includes('memory') || input.includes('memories')) {
      return "You've been quite active lately! This past month you created 12 memories including:\n\n• Beach weekend with Alex and Jordan\n• Project launch celebration\n• Coffee date with Sarah\n• Several work achievements\n\nYour most joyful memory was the surprise party - you seemed really happy that day! Is there a particular memory you'd like to revisit or discuss?";
    }
    
    if (input.includes('motivational') || input.includes('motivation') || input.includes('quote')) {
      return "Here's a quote that matches your recent accomplishments:\n\n\"Success is not just about what you accomplish in your life, it's about what you inspire others to do.\" \n\nYou've been doing great with maintaining your relationships and capturing important moments. Keep up the wonderful work of being present in your life!";
    }
    
    if (input.includes('organized') || input.includes('organization')) {
      return "Great question! Based on your current habits, here are some personalized organization tips:\n\n• You're already doing well with memory tracking - keep that up!\n• Consider setting weekly reminders to call family members\n• Use your photo memories to create monthly highlights\n• Schedule specific times for planning upcoming events\n\nWould you like me to help you set up any of these organizational systems?";
    }
    
    if (input.includes('plan') && input.includes('surprise')) {
      return "I'd love to help you plan a surprise! For Mom's upcoming birthday, based on what I know about her:\n\n• She loves gardening - maybe a new plant or garden tool?\n• She enjoys cooking - a cookbook or cooking class?\n• Consider organizing a family video call if family is far away\n• You could create a photo album of memories with her\n\nWhat type of surprise were you thinking about? I can help you plan the details!";
    }
    
    // Default responses
    const defaultResponses = [
      "That's interesting! Can you tell me more about that?",
      "I'd be happy to help you with that. What specific aspect would you like to focus on?",
      "Based on your previous activities and preferences, I think I can provide some good suggestions. What are you looking for exactly?",
      "That sounds important to you. How can I best assist you with this?",
      "I'm here to help! Could you provide a bit more context so I can give you the most relevant advice?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSuggestedQuestion = (question: string) => {
    setNewMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-neural opacity-5 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-6 space-y-6 max-w-4xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-neural bg-clip-text text-transparent">
            AI Assistant
          </h1>
        </div>

        <Card className="bg-gradient-card shadow-card border-border/50 h-[600px] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary-glow" />
              Chat with Your AI Assistant
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'ai' && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-primary/20 text-primary-glow">
                          <Brain className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-muted/50'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-secondary/20 text-secondary-foreground">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-primary/20 text-primary-glow">
                        <Brain className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-6 py-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Message Input */}
            <div className="p-6 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim() || isLoading}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;