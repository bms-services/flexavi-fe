
import React from "react";
import { Appointment, TeamType } from "@/types";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { parseISO, format, isToday, isSameDay } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

interface AppointmentStatsProps {
  appointments: Appointment[];
  selectedDate: string;
}

export const AppointmentStats: React.FC<AppointmentStatsProps> = ({
  appointments,
  selectedDate,
}) => {
  // Filter appointments for the selected date
  const appointmentsForDate = appointments.filter(
    (a) => a.date === selectedDate
  );

  // Get counts by team type
  const teamCounts = {
    sales: appointmentsForDate.filter(a => a.teamType === "sales").length,
    installation: appointmentsForDate.filter(a => a.teamType === "installation").length,
    repair: appointmentsForDate.filter(a => a.teamType === "repair").length,
    maintenance: appointmentsForDate.filter(a => a.teamType === "maintenance").length
  };

  // Get counts by status
  const statusCounts = {
    scheduled: appointmentsForDate.filter(a => a.status === "scheduled").length,
    completed: appointmentsForDate.filter(a => a.status === "completed").length,
    canceled: appointmentsForDate.filter(a => a.status === "canceled").length,
    rescheduled: appointmentsForDate.filter(a => a.status === "rescheduled").length,
    quote_request: appointmentsForDate.filter(a => a.status === "quote_request").length,
    warranty: appointmentsForDate.filter(a => a.status === "warranty").length,
    new_assignment: appointmentsForDate.filter(a => a.status === "new_assignment").length,
    extra_assignment: appointmentsForDate.filter(a => a.status === "extra_assignment").length
  };
  
  // Calculate total appointments
  const totalAppointments = appointmentsForDate.length;
  
  // Define time slots and check availability
  const timeSlots = [
    { label: "Ochtend (9:00-12:00)", available: true, count: 0 },
    { label: "Middag (12:00-17:00)", available: true, count: 0 },
    { label: "Avond (17:00-21:00)", available: true, count: 0 }
  ];
  
  // Count appointments in each time slot
  appointmentsForDate.forEach(appointment => {
    const hour = parseInt(appointment.startTime.split(":")[0]);
    if (hour >= 9 && hour < 12) {
      timeSlots[0].count++;
      if (timeSlots[0].count >= 3) timeSlots[0].available = false;
    } else if (hour >= 12 && hour < 17) {
      timeSlots[1].count++;
      if (timeSlots[1].count >= 3) timeSlots[1].available = false;
    } else if (hour >= 17 && hour < 21) {
      timeSlots[2].count++;
      if (timeSlots[2].count >= 3) timeSlots[2].available = false;
    }
  });

  const formatDateLabel = () => {
    const date = parseISO(selectedDate);
    if (isToday(date)) {
      return "Vandaag";
    }
    return format(date, "EEEE d MMMM yyyy", { locale: nl });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <h3 className="font-medium mb-2">Overzicht {formatDateLabel()}</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted rounded-md p-3">
                <div className="text-muted-foreground text-sm">Totaal afspraken</div>
                <div className="text-2xl font-bold">{totalAppointments}</div>
              </div>
              <div className="bg-muted rounded-md p-3">
                <div className="text-muted-foreground text-sm">Beschikbaarheid</div>
                <div className="flex gap-1 mt-1">
                  {timeSlots.map((slot, index) => (
                    <Badge 
                      key={index} 
                      variant={slot.available ? "success" : "destructive"}
                      className="text-xs"
                    >
                      {slot.count} / 3
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium mb-2">Teams</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-100 rounded-md p-3">
                <div className="text-blue-600 text-sm">Verkoop</div>
                <div className="text-2xl font-bold">{teamCounts.sales}</div>
              </div>
              <div className="bg-green-100 rounded-md p-3">
                <div className="text-green-600 text-sm">Installatie</div>
                <div className="text-2xl font-bold">{teamCounts.installation}</div>
              </div>
              <div className="bg-red-100 rounded-md p-3">
                <div className="text-red-600 text-sm">Reparatie</div>
                <div className="text-2xl font-bold">{teamCounts.repair}</div>
              </div>
              <div className="bg-amber-100 rounded-md p-3">
                <div className="text-amber-600 text-sm">Onderhoud</div>
                <div className="text-2xl font-bold">{teamCounts.maintenance}</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium mb-2">Status</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted rounded-md p-3 flex flex-col justify-between">
                <div className="text-muted-foreground text-sm">Offerte aanvraag</div>
                <div className="text-xl font-bold">{statusCounts.quote_request}</div>
              </div>
              <div className="bg-muted rounded-md p-3 flex flex-col justify-between">
                <div className="text-muted-foreground text-sm">Garantie</div>
                <div className="text-xl font-bold">{statusCounts.warranty}</div>
              </div>
              <div className="bg-muted rounded-md p-3 flex flex-col justify-between">
                <div className="text-muted-foreground text-sm">Nieuwe opdracht</div>
                <div className="text-xl font-bold">{statusCounts.new_assignment}</div>
              </div>
              <div className="bg-muted rounded-md p-3 flex flex-col justify-between">
                <div className="text-muted-foreground text-sm">Extra opdracht</div>
                <div className="text-xl font-bold">{statusCounts.extra_assignment}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
