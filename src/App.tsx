import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AddMemory from "./pages/AddMemory";
import NewEvent from "./pages/NewEvent";
import PhotoMemory from "./pages/PhotoMemory";
import VoiceNote from "./pages/VoiceNote";
import Relationships from "./pages/Relationships";
import AIChat from "./pages/AIChat";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/add-memory" element={<AddMemory />} />
          <Route path="/new-event" element={<NewEvent />} />
          <Route path="/photo-memory" element={<PhotoMemory />} />
          <Route path="/voice-note" element={<VoiceNote />} />
          <Route path="/relationships" element={<Relationships />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
