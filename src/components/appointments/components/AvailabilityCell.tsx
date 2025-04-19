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
import { AvailabilityCellProps } from "../types";

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
            variant="outline"
            className={cn(
              "w-full justify-between gap-1 cursor-pointer transition-colors text-sm px-3 py-1.5 bg-white",
              isFullyBooked 
                ? "border-green-700" // Dark green border when fully booked
                : "border-blue-500",  // Blue border when not fully booked
              hasSearchedLocation && "border-green-500",
              "hover:border-opacity-80"
            )}
          >
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {timeSlot.start}:00
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
