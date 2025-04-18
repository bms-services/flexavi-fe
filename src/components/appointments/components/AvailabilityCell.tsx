
import React from "react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, Calendar, MapPin } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AvailabilityCellProps } from "../types";

export const AvailabilityCell = ({ date, team, timeSlot, appointments, maxSlots }: AvailabilityCellProps) => {
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
    app.date === date && app.teamId === team.id
  );

  const locations = dateAppointments
    .map(app => app.location || 'Geen locatie')
    .filter(Boolean);

  const cities = [...new Set(locations)].join(', ');

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative">
          <Badge 
            variant={isFullyBooked ? "destructive" : isLimitedAvailability ? "warning" : "outline"}
            className={cn(
              "w-full justify-between gap-1 cursor-pointer transition-colors text-sm px-3 py-1.5",
              !isFullyBooked && "hover:bg-primary hover:text-primary-foreground"
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
          {cities && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <p className="text-sm">{cities}</p>
            </div>
          )}
          <p className={cn(
            "mt-2 text-sm font-medium",
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
