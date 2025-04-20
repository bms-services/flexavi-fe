
import React from "react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, Calendar, MapPin, FileText } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Appointment, TeamDetails } from "@/types";

interface AvailabilityCellProps {
  date: string;
  team: TeamDetails;
  timeSlot: {
    label: string;
    start: number;
    end: number;
  };
  appointments: Appointment[];
  maxSlots: number;
  searchLocation?: string;
}

const appointmentTypeLabels = {
  quote_request: "Offerte aanvraag",
  warranty: "Garantie",
  new_assignment: "Nieuwe opdracht",
  extra_assignment: "Extra opdracht",
  scheduled: "Ingepland",
  completed: "Afgerond",
  canceled: "Geannuleerd",
  rescheduled: "Verzet",
};

export const AvailabilityCell = ({ 
  date, 
  team, 
  timeSlot, 
  appointments, 
  maxSlots,
  searchLocation 
}: AvailabilityCellProps) => {
  const count = appointments.filter(app => {
    const hour = parseInt(app.startTime.split(":")[0]);
    return app.date === date && 
           app.teamId === team.id && 
           hour >= timeSlot.start && 
           hour < timeSlot.end;
  }).length;

  const available = maxSlots - count;
  const isFullyBooked = available === 0;
  const isLimitedAvailability = available <= 1;
  const isSufficientCapacity = count >= maxSlots * 0.75; // Consider 75% full as sufficient capacity

  const dateAppointments = appointments.filter(app => 
    app.date === date && 
    app.teamId === team.id &&
    parseInt(app.startTime.split(":")[0]) >= timeSlot.start &&
    parseInt(app.startTime.split(":")[0]) < timeSlot.end
  );

  const locations = dateAppointments
    .map(app => app.location || 'Geen locatie')
    .filter(Boolean);

  const cities = [...new Set(locations)].join(', ');
  
  const hasSearchedLocation = searchLocation ? 
    cities.toLowerCase().includes(searchLocation.toLowerCase()) : 
    false;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative">
          <Badge 
            variant={isFullyBooked ? "destructive" : isLimitedAvailability ? "warning" : "outline"}
            className={cn(
              "w-full justify-between gap-1 cursor-pointer transition-colors text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5",
              hasSearchedLocation && "bg-green-100 hover:bg-green-200 border-green-500",
              isSufficientCapacity && !isFullyBooked && "border-blue-500",
              !isSufficientCapacity && !isFullyBooked && "border-red-500",
              !isFullyBooked && !hasSearchedLocation && "hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
              <span className="hidden md:inline">{timeSlot.start}:00</span>
              <span className="md:hidden">{timeSlot.start}</span>
            </span>
            <span className="font-medium">{count}/{maxSlots}</span>
          </Badge>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">
                {format(parseISO(date), "EEEE d MMMM", { locale: nl })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p>{timeSlot.start}:00 - {timeSlot.end}:00</p>
            </div>
          </div>

          {dateAppointments.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Geplande afspraken:</p>
              {dateAppointments.map((app, idx) => (
                <div key={idx} className="space-y-2 border-l-2 border-primary pl-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{app.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{app.startTime} - {app.endTime}</p>
                  </div>
                  {app.location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <p className="text-sm">{app.location}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {appointmentTypeLabels[app.status]}
                    </Badge>
                  </div>
                  {app.description && (
                    <p className="text-sm text-muted-foreground">
                      {app.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Geen afspraken gepland
            </p>
          )}
          
          <p className={cn(
            "text-sm font-medium",
            isFullyBooked ? "text-destructive" : "text-primary"
          )}>
            {isFullyBooked 
              ? "Volledig volgeboekt" 
              : `${available} ${available === 1 ? 'plek' : 'plekken'} beschikbaar`}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
