
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { nl } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types";
import { cn } from "@/lib/utils";

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onDateSelect: (date: string) => void;
  selectedDate?: string;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  appointments,
  onDateSelect,
  selectedDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const daysWithAppointments = appointments.reduce((acc, appointment) => {
    if (!acc[appointment.date]) {
      acc[appointment.date] = [];
    }
    acc[appointment.date].push(appointment);
    return acc;
  }, {} as Record<string, Appointment[]>);

  const weekdays = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

  const handleDateClick = (day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    onDateSelect(formattedDate);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Kalender</CardTitle>
            <CardDescription>
              Selecteer een datum om afspraken te bekijken
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevMonth}
              aria-label="Vorige maand"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {format(currentMonth, "MMMM yyyy", { locale: nl })}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              aria-label="Volgende maand"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}

          {/* Empty cells for days of the week before the first day of the month */}
          {Array.from({
            length: (days[0].getDay() + 6) % 7,
          }).map((_, index) => (
            <div key={`empty-${index}`} className="h-12 p-1" />
          ))}

          {days.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const hasAppointments = !!daysWithAppointments[dateStr];
            const isSelected = selectedDate === dateStr;
            const isToday = isSameDay(day, today);

            return (
              <div
                key={day.toString()}
                className="h-12 p-1"
                onClick={() => handleDateClick(day)}
              >
                <div
                  className={cn(
                    "calendar-day h-full flex items-center justify-center",
                    !isSameMonth(day, currentMonth) && "opacity-50",
                    hasAppointments && "has-appointments",
                    isSelected && "selected",
                    isToday && "today"
                  )}
                >
                  {format(day, "d")}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
