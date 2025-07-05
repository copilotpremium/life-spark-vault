import { useState } from "react";
import { ArrowLeft, Settings as SettingsIcon, User, Bell, Palette, Shield, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // Profile Settings
    displayName: "Alex",
    email: "alex@example.com",
    
    // Notification Settings
    enableNotifications: true,
    emailNotifications: false,
    birthdayReminders: true,
    eventReminders: true,
    memoryHighlights: true,
    reminderTiming: "1 day before",
    
    // Appearance Settings
    theme: "dark",
    accentColor: "neural",
    
    // Privacy Settings
    biometricLock: false,
    autoLock: "5 minutes",
    encryptMemories: true,
    
    // Data Settings
    autoBackup: true,
    backupFrequency: "weekly"
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export will be ready shortly",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Please contact support to delete your account",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-neural opacity-5 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-6 space-y-6 max-w-2xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-neural bg-clip-text text-transparent">
            Settings
          </h1>
        </div>

        {/* Profile Settings */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary-glow" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <Input
                value={settings.displayName}
                onChange={(e) => handleSettingChange('displayName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary-glow" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleSettingChange('enableNotifications', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive reminders via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Birthday Reminders</p>
                <p className="text-sm text-muted-foreground">Get reminded of upcoming birthdays</p>
              </div>
              <Switch
                checked={settings.birthdayReminders}
                onCheckedChange={(checked) => handleSettingChange('birthdayReminders', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Event Reminders</p>
                <p className="text-sm text-muted-foreground">Get reminded of scheduled events</p>
              </div>
              <Switch
                checked={settings.eventReminders}
                onCheckedChange={(checked) => handleSettingChange('eventReminders', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Memory Highlights</p>
                <p className="text-sm text-muted-foreground">Weekly memory summaries</p>
              </div>
              <Switch
                checked={settings.memoryHighlights}
                onCheckedChange={(checked) => handleSettingChange('memoryHighlights', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Reminder Timing</label>
              <Select value={settings.reminderTiming} onValueChange={(value) => handleSettingChange('reminderTiming', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15 minutes before">15 minutes before</SelectItem>
                  <SelectItem value="1 hour before">1 hour before</SelectItem>
                  <SelectItem value="1 day before">1 day before</SelectItem>
                  <SelectItem value="3 days before">3 days before</SelectItem>
                  <SelectItem value="1 week before">1 week before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary-glow" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Accent Color</label>
              <Select value={settings.accentColor} onValueChange={(value) => handleSettingChange('accentColor', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="neural">Neural Blue</SelectItem>
                  <SelectItem value="warmth">Warm Orange</SelectItem>
                  <SelectItem value="memory">Memory Purple</SelectItem>
                  <SelectItem value="nature">Nature Green</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-glow" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Biometric Lock</p>
                <p className="text-sm text-muted-foreground">Use fingerprint/face to unlock</p>
              </div>
              <Switch
                checked={settings.biometricLock}
                onCheckedChange={(checked) => handleSettingChange('biometricLock', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Auto Lock</label>
              <Select value={settings.autoLock} onValueChange={(value) => handleSettingChange('autoLock', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediately</SelectItem>
                  <SelectItem value="1 minute">1 minute</SelectItem>
                  <SelectItem value="5 minutes">5 minutes</SelectItem>
                  <SelectItem value="15 minutes">15 minutes</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Encrypt Private Memories</p>
                <p className="text-sm text-muted-foreground">End-to-end encryption for sensitive data</p>
              </div>
              <Switch
                checked={settings.encryptMemories}
                onCheckedChange={(checked) => handleSettingChange('encryptMemories', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary-glow" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto Backup</p>
                <p className="text-sm text-muted-foreground">Automatically backup your data</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Backup Frequency</label>
              <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Button variant="outline" onClick={handleExportData} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export My Data
              </Button>
              
              <Button variant="destructive" onClick={handleDeleteAccount} className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;