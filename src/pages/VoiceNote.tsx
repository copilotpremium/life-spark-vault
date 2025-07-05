import { useState, useRef } from "react";
import { ArrowLeft, Save, Mic, Square, Play, Pause, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VoiceNote = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [note, setNote] = useState({
    title: "",
    transcription: "",
    category: "personal"
  });
  
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);

  const categories = [
    { id: "personal", label: "Personal", color: "bg-memory-personal/20 text-memory-personal" },
    { id: "work", label: "Work", color: "bg-memory-work/20 text-memory-work" },
    { id: "family", label: "Family", color: "bg-memory-family/20 text-memory-family" },
    { id: "ideas", label: "Ideas", color: "bg-accent/20 text-accent-foreground" }
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setRecordingInterval(interval);

    } catch (error) {
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingInterval) {
        clearInterval(recordingInterval);
        setRecordingInterval(null);
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl("");
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    if (!note.title || !audioBlob) {
      toast({
        title: "Missing Information",
        description: "Please add a title and record audio",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Voice Note Saved",
      description: "Your voice note has been saved successfully",
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
            Voice Note
          </h1>
        </div>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-primary-glow" />
              Record Your Thoughts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recording Interface */}
            <div className="text-center space-y-4">
              {!audioBlob ? (
                <div className="space-y-4">
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all ${
                    isRecording 
                      ? "bg-destructive/20 animate-pulse" 
                      : "bg-primary/20 hover:bg-primary/30"
                  }`}>
                    {isRecording ? (
                      <Square className="w-8 h-8 text-destructive" />
                    ) : (
                      <Mic className="w-8 h-8 text-primary-glow" />
                    )}
                  </div>
                  
                  {isRecording ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Recording...</p>
                      <p className="font-mono text-lg text-destructive">{formatTime(recordingTime)}</p>
                      <Button onClick={stopRecording} variant="destructive">
                        <Square className="w-4 h-4 mr-2" />
                        Stop Recording
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={startRecording} size="lg">
                      <Mic className="w-4 h-4 mr-2" />
                      Start Recording
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={isPlaying ? pauseAudio : playAudio}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    
                    <div className="flex-1 text-center">
                      <p className="text-sm text-muted-foreground">Recording ready</p>
                      <p className="font-mono text-lg">{formatTime(recordingTime)}</p>
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={deleteRecording}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="What's this voice note about?"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Transcription / Notes</label>
              <Textarea
                placeholder="Add any text notes or transcription..."
                rows={4}
                value={note.transcription}
                onChange={(e) => setNote({ ...note, transcription: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat.id}
                    className={`cursor-pointer transition-all ${
                      note.category === cat.id ? cat.color : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => setNote({ ...note, category: cat.id })}
                  >
                    {cat.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1" disabled={!audioBlob}>
                <Save className="w-4 h-4 mr-2" />
                Save Voice Note
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

export default VoiceNote;