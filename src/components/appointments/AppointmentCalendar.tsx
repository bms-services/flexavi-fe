
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
import { Badge } from "../ui/badge";

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

  // Helper to get appointments by team type for a specific day
  const getTeamTypeCount = (date: string) => {
    if (!daysWithAppointments[date]) return null;
    
    const counts = {
      sales: 0,
      installation: 0,
      repair: 0,
      maintenance: 0
    };
    
    daysWithAppointments[date].forEach(app => {
      counts[app.teamType]++;
    });
    
    return counts;
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
            <div key={`empty-${index}`} className="h-16 p-1" />
          ))}

          {days.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const appointments = daysWithAppointments[dateStr] || [];
            const appointmentCount = appointments.length;
            const isSelected = selectedDate === dateStr;
            const isToday = isSameDay(day, today);
            const teamCounts = getTeamTypeCount(dateStr);

            return (
              <div
                key={day.toString()}
                className={cn("h-16 p-1 border rounded cursor-pointer hover:bg-muted/50 transition-colors", 
                  isSelected && "border-primary bg-primary/10",
                  isToday && "bg-accent/50"
                )}
                onClick={() => handleDateClick(day)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center">
                    <span className={cn("text-sm font-medium", 
                      !isSameMonth(day, currentMonth) && "opacity-30",
                      isSelected && "text-primary font-bold"
                    )}>
                      {format(day, "d")}
                    </span>
                    {appointmentCount > 0 && (
                      <Badge className="text-xs" variant="primary">
                        {appointmentCount}
                      </Badge>
                    )}
                  </div>
                  
                  {teamCounts && (
                    <div className="mt-auto grid grid-cols-2 gap-1">
                      {teamCounts.sales > 0 && (
                        <div className="h-1.5 bg-blue-500 rounded-full" title="Verkoop"></div>
                      )}
                      {teamCounts.installation > 0 && (
                        <div className="h-1.5 bg-green-500 rounded-full" title="Installatie"></div>
                      )}
                      {teamCounts.repair > 0 && (
                        <div className="h-1.5 bg-red-500 rounded-full" title="Reparatie"></div>
                      )}
                      {teamCounts.maintenance > 0 && (
                        <div className="h-1.5 bg-amber-500 rounded-full" title="Onderhoud"></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="w-3 h-1.5 bg-blue-500 rounded-full mr-1"></div>
            <span>Verkoop</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-1.5 bg-green-500 rounded-full mr-1"></div>
            <span>Installatie</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-1.5 bg-red-500 rounded-full mr-1"></div>
            <span>Reparatie</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-1.5 bg-amber-500 rounded-full mr-1"></div>
            <span>Onderhoud</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
