import { useState } from "react";
import { ArrowLeft, Bell, Check, X, Clock, Heart, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'reminder' | 'birthday' | 'anniversary' | 'event' | 'memory';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'birthday',
      title: "Mom's Birthday Reminder",
      message: "Mom's birthday is in 3 days (January 20th). Don't forget to call her!",
      time: '2 hours ago',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'event',
      title: "Team Meeting Today",
      message: "Your team meeting is scheduled for 2:00 PM in Conference Room A.",
      time: '4 hours ago',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'reminder',
      title: "Call Sarah",
      message: "You wanted to call Sarah this week. It's been 5 days since your last chat.",
      time: '1 day ago',
      isRead: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'anniversary',
      title: "Work Anniversary",
      message: "Congratulations! Today marks 2 years at your current job.",
      time: '1 day ago',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '5',
      type: 'memory',
      title: "Memory Highlight",
      message: "You've created 12 memories this week! Your most joyful was the beach weekend.",
      time: '2 days ago',
      isRead: true,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    const icons = {
      reminder: Clock,
      birthday: Heart,
      anniversary: Heart,
      event: Calendar,
      memory: Briefcase
    };
    return icons[type as keyof typeof icons] || Bell;
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return "text-destructive";
    if (type === 'birthday' || type === 'anniversary') return "text-memory-family";
    if (type === 'event') return "text-memory-work";
    return "text-primary-glow";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "bg-destructive/20 text-destructive",
      medium: "bg-secondary/20 text-secondary-foreground",
      low: "bg-accent/20 text-accent-foreground"
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast({
      title: "Notification Dismissed",
      description: "The notification has been removed",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast({
      title: "All Marked as Read",
      description: "All notifications have been marked as read",
    });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
              Notifications
            </h1>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
        </div>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary-glow" />
              Your Notifications
              {unreadCount > 0 && (
                <Badge className="bg-destructive/20 text-destructive">
                  {unreadCount} unread
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-all hover:shadow-warm ${
                      notification.isRead
                        ? "bg-muted/20 border-border/30"
                        : "bg-muted/40 border-border/50 shadow-card"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-5 h-5 ${getNotificationColor(notification.type, notification.priority)}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${notification.isRead ? 'text-muted-foreground' : ''}`}>
                            {notification.title}
                          </h3>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary-glow rounded-full" />
                          )}
                        </div>
                        
                        <p className={`text-sm leading-relaxed ${
                          notification.isRead ? 'text-muted-foreground' : 'text-foreground'
                        }`}>
                          {notification.message}
                        </p>
                        
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.time}
                        </p>
                      </div>
                      
                      <div className="flex gap-1 flex-shrink-0">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-muted-foreground hover:text-destructive"
                          onClick={() => dismissNotification(notification.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;