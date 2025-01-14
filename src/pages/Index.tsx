import { useState, useEffect } from "react";
import { CalendarHeader } from "@/components/CalendarHeader";
import { CalendarGrid } from "@/components/CalendarGrid";
import { EventDialog, CalendarEvent } from "@/components/EventDialog";
import { AuthDialog } from "@/components/AuthDialog";
import { SettingsDialog } from "@/components/SettingsDialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface IndexProps {
  initialUser: any;
}

const Index = ({ initialUser }: IndexProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [user, setUser] = useState<any>(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    if (!user) {
      setIsAuthDialogOpen(true);
      return;
    }
    setSelectedDate(date);
    setIsEventDialogOpen(true);
  };

  const handleSaveEvent = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onTodayClick={handleTodayClick}
        />
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.email}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSettingsDialogOpen(true)}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsAuthDialogOpen(true)}>
              Login / Sign Up
            </Button>
          )}
        </div>
      </div>
      <div className="mt-4">
        <CalendarGrid
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
        />
      </div>
      <EventDialog
        isOpen={isEventDialogOpen}
        onClose={() => setIsEventDialogOpen(false)}
        onSave={handleSaveEvent}
        selectedDate={selectedDate}
      />
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />
      <SettingsDialog
        isOpen={isSettingsDialogOpen}
        onClose={() => setIsSettingsDialogOpen(false)}
      />
    </div>
  );
};

export default Index;