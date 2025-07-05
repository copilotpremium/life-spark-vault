import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DailyBriefing } from "@/components/DailyBriefing";
import { MemoryCards } from "@/components/MemoryCards";
import { QuickActions } from "@/components/QuickActions";
import { UpcomingEvents } from "@/components/UpcomingEvents";

const Index = () => {
  const [userName] = useState("Alex"); // This would come from user profile

  return (
    <div className="min-h-screen bg-background">
      {/* Neural gradient overlay */}
      <div className="fixed inset-0 bg-gradient-neural opacity-5 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-6 space-y-8">
        <DashboardHeader userName={userName} />
        <DailyBriefing />
        
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <MemoryCards />
            <UpcomingEvents />
          </div>
          <div className="space-y-8">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;