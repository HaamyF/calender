import { cn } from "@/lib/utils";
import { CalendarEvent } from "./EventDialog";

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
}

export function CalendarGrid({ currentDate, events, onDateClick }: CalendarGridProps) {
  const today = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const days = [];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Add previous month's days
  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevMonthDay = new Date(firstDayOfMonth);
    prevMonthDay.setDate(prevMonthDay.getDate() - (startingDayOfWeek - i));
    days.push({
      date: prevMonthDay,
      isCurrentMonth: false,
    });
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    days.push({
      date,
      isCurrentMonth: true,
    });
  }

  // Add next month's days
  const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDay = new Date(lastDayOfMonth);
    nextMonthDay.setDate(nextMonthDay.getDate() + i);
    days.push({
      date: nextMonthDay,
      isCurrentMonth: false,
    });
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="grid grid-cols-7 gap-px border-b">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {days.map(({ date, isCurrentMonth }, index) => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
          const dateEvents = getEventsForDate(date);

          return (
            <button
              key={index}
              onClick={() => onDateClick(date)}
              className={cn(
                "h-24 p-2 text-left transition-colors hover:bg-muted/50",
                !isCurrentMonth && "text-muted-foreground",
                isToday && "bg-primary/10"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                  isToday && "bg-primary text-primary-foreground"
                )}
              >
                {date.getDate()}
              </span>
              <div className="mt-1 space-y-1">
                {dateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="overflow-hidden text-ellipsis whitespace-nowrap rounded bg-primary/20 px-1 py-0.5 text-xs"
                  >
                    {event.time} {event.title}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}