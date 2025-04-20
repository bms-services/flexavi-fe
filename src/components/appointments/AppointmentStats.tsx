
import React from "react";
import { Appointment, TeamType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { parseISO, format, isToday, addDays } from "date-fns";
import { nl } from "date-fns/locale";
import { Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleSettings {
  salesMorningSlots: number;
  salesAfternoonSlots: number;
  salesEveningSlots: number;
  installationMorningSlots: number;
  installationAfternoonSlots: number;
  installationEveningSlots: number;
  defaultJobDuration: string;
}

interface AppointmentStatsProps {
  appointments: Appointment[];
  selectedDate: string;
  scheduleSettings: ScheduleSettings;
}

export const AppointmentStats: React.FC<AppointmentStatsProps> = ({
  appointments,
  selectedDate,
  scheduleSettings,
}) => {
  // Generate next 7 days for overview (changed from 5)
  const daysToShow = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(parseISO(selectedDate), i);
    return format(date, 'yyyy-MM-dd');
  });

  // Define time slots with dynamic max appointments from settings
  const timeSlots = [
    { 
      label: "Ochtend", 
      time: "9:00-12:00", 
      salesMax: scheduleSettings.salesMorningSlots,
      installationMax: scheduleSettings.installationMorningSlots,
      startHour: 9,
      endHour: 12
    },
    { 
      label: "Middag", 
      time: "12:00-17:00", 
      salesMax: scheduleSettings.salesAfternoonSlots,
      installationMax: scheduleSettings.installationAfternoonSlots,
      startHour: 12,
      endHour: 17
    },
    { 
      label: "Avond", 
      time: "17:00-21:00", 
      salesMax: scheduleSettings.salesEveningSlots,
      installationMax: scheduleSettings.installationEveningSlots,
      startHour: 17,
      endHour: 21
    }
  ];

  const getAppointmentsForDateAndTime = (date: string, startHour: number, endHour: number, teamType: TeamType) => {
    return appointments.filter(app => {
      if (app.date !== date || app.teamType !== teamType) return false;
      const hour = parseInt(app.startTime.split(":")[0]);
      return hour >= startHour && hour < endHour;
    }).length;
  };

  const getTimeSlotAvailability = (date: string, startHour: number, endHour: number, teamType: TeamType, maxSlots: number) => {
    const count = getAppointmentsForDateAndTime(date, startHour, endHour, teamType);
    const available = maxSlots - count;
    return {
      count,
      available,
      isFull: count >= maxSlots
    };
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {daysToShow.map((date) => (
              <div 
                key={date}
                className={cn(
                  "p-4 rounded-lg border",
                  isToday(parseISO(date)) ? "bg-primary/5 border-primary" : "bg-white"
                )}
              >
                <div className="mb-3">
                  <h3 className="font-semibold">
                    {format(parseISO(date), "EEEE", { locale: nl })}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {format(parseISO(date), "d MMMM", { locale: nl })}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Sales Team Section */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Verkoop Team</span>
                    </div>
                    {timeSlots.map((slot, idx) => {
                      const availability = getTimeSlotAvailability(
                        date,
                        slot.startHour,
                        slot.endHour,
                        "sales",
                        slot.salesMax
                      );
                      return (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{slot.label}</span>
                          </div>
                          <span className={cn(
                            "font-medium",
                            availability.available === 0 ? "text-red-600" : "text-blue-600"
                          )}>
                            {availability.count}/{slot.salesMax}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Installation Team Section */}
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">Uitvoerende Ploeg</span>
                    </div>
                    {timeSlots.map((slot, idx) => {
                      const availability = getTimeSlotAvailability(
                        date,
                        slot.startHour,
                        slot.endHour,
                        "installation",
                        slot.installationMax
                      );
                      return (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{slot.label}</span>
                          </div>
                          <span className={cn(
                            "font-medium",
                            availability.available === 0 ? "text-red-600" : "text-green-600"
                          )}>
                            {availability.count}/{slot.installationMax}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
