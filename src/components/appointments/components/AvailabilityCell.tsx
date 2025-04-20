
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
  searchLocation,
  isMobile
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
              "w-full justify-between gap-0.5 md:gap-1 cursor-pointer transition-colors text-[10px] md:text-sm px-1 py-0.5 md:px-3 md:py-1.5",
              isFullyBooked 
                ? "border-green-700" // Dark green border when fully booked
                : "border-blue-500",  // Blue border when not fully booked
              hasSearchedLocation && "border-green-500 bg-green-50", // Light green background only for location matches
              "hover:border-opacity-80"
            )}
          >
            <span className="flex items-center gap-0.5 md:gap-1.5">
              <Clock className="h-2.5 w-2.5 md:h-3.5 md:w-3.5" />
              {isMobile ? (
                <span>{timeSlot.start}u</span>
              ) : (
                <span>{timeSlot.start}:00</span>
              )}
            </span>
            <span className="font-medium">{count}/{maxSlots}</span>
          </Badge>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 p-3" align="start">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">
                {format(parseISO(date), "EEEE d MMMM", { locale: nl })}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{timeSlot.start}:00 - {timeSlot.end}:00</span>
            </div>
          </div>

          {dateAppointments.length > 0 ? (
            <div className="space-y-2">
              {dateAppointments.map((app, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm border-l-2 border-primary pl-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{app.title}</p>
                      <Badge variant="secondary" className="text-xs">
                        {appointmentTypeLabels[app.status]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{app.startTime} - {app.endTime}</span>
                    </div>
                    {app.location && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{app.location}</span>
                      </div>
                    )}
                    {app.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {app.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Geen afspraken gepland
            </p>
          )}
          
          <p className={cn(
            "text-sm font-medium border-t pt-2",
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
