
import React, { useState } from "react";
import { format, parseISO, addDays, isToday } from "date-fns";
import { nl } from "date-fns/locale";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Building2, Users, Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WorkEnvironment, TeamDetails, Appointment } from "@/types";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface TeamAvailabilityOverviewProps {
  startDate: string;
  appointments: Appointment[];
  teams: TeamDetails[];
  environments: WorkEnvironment[];
  scheduleSettings: any;
}

export const TeamAvailabilityOverview = ({
  startDate,
  appointments,
  teams,
  environments,
  scheduleSettings,
}: TeamAvailabilityOverviewProps) => {
  const daysToShow = 5;
  const timeSlots = [
    { label: "Ochtend", start: 8, end: 13 },
    { label: "Middag", start: 13, end: 19 },
  ];

  const dates = Array.from({ length: daysToShow }, (_, i) => 
    format(addDays(parseISO(startDate), i), 'yyyy-MM-dd')
  );

  const getAppointmentsForDateAndTeam = (date: string, teamId: string) => {
    return appointments.filter(app => 
      app.date === date && 
      app.teamId === teamId
    );
  };

  const getAppointmentsCount = (date: string, teamId: string, startHour: number, endHour: number) => {
    return appointments.filter(app => {
      const hour = parseInt(app.startTime.split(":")[0]);
      return app.date === date && app.teamId === teamId && hour >= startHour && hour < endHour;
    }).length;
  };

  const getMaxSlots = (teamType: string, timeSlot: string) => {
    if (teamType === "sales") {
      return timeSlot === "Ochtend" ? scheduleSettings.salesMorningSlots : scheduleSettings.salesAfternoonSlots;
    }
    return timeSlot === "Ochtend" ? scheduleSettings.installationMorningSlots : scheduleSettings.installationAfternoonSlots;
  };

  // Group teams by type and environment
  const salesTeams = teams.filter(team => team.type === "sales");
  const installationTeams = teams.filter(team => team.type === "installation");

  const TeamHeader = ({ type, icon }: { type: string; icon: React.ReactNode }) => (
    <div className="bg-muted/50 p-4 rounded-t-lg border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-semibold">
          {type === 'sales' ? 'Verkoopteams' : 'Uitvoerende Teams'}
        </h2>
      </div>
    </div>
  );

  const DateCell = ({ date, team, timeSlot }: { date: string; team: TeamDetails; timeSlot: { start: number; end: number; label: string } }) => {
    const count = getAppointmentsCount(date, team.id, timeSlot.start, timeSlot.end);
    const maxSlots = getMaxSlots(team.type, timeSlot.label);
    const available = maxSlots - count;
    const isFullyBooked = available === 0;
    const isLimitedAvailability = available <= 1;
    
    // Get appointments for this date and team
    const dateAppointments = getAppointmentsForDateAndTeam(date, team.id);
    const cities = [...new Set(dateAppointments.map(app => app.location))].join(', ');
    
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
        <HoverCardContent 
          className="w-80 p-4" 
          align="start"
        >
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
                <p className="text-sm">{cities || 'Geen locaties gepland'}</p>
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

  return (
    <div className="space-y-6">
      {/* Sales Teams */}
      <Card className="overflow-hidden">
        <TeamHeader type="sales" icon={<Users className="h-5 w-5 text-primary" />} />
        <CardContent className="p-4">
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-[200px,1fr] bg-muted/30">
              <div className="p-3 font-medium border-r">Team</div>
              <div className="grid grid-cols-5">
                {dates.map(date => (
                  <div key={date} className={cn(
                    "p-2 text-center border-l",
                    isToday(parseISO(date)) && "bg-primary/5"
                  )}>
                    <div className="font-medium">
                      {format(parseISO(date), "EEE", { locale: nl })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(parseISO(date), "d MMM", { locale: nl })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {salesTeams.map(team => (
              <div key={team.id} className="grid grid-cols-[200px,1fr] border-t hover:bg-muted/5">
                <div className="p-3 flex items-center gap-2 border-r">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: team.color }}
                  />
                  <span className="font-medium">{team.name}</span>
                </div>
                <div className="grid grid-cols-5">
                  {dates.map(date => (
                    <div key={date} className="p-2 space-y-2 border-l">
                      {timeSlots.map((slot, idx) => (
                        <DateCell 
                          key={idx} 
                          date={date} 
                          team={team} 
                          timeSlot={slot}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Installation Teams */}
      <Card className="overflow-hidden">
        <TeamHeader type="installation" icon={<Building2 className="h-5 w-5 text-primary" />} />
        <CardContent className="p-4">
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-[200px,1fr] bg-muted/30">
              <div className="p-3 font-medium border-r">Team</div>
              <div className="grid grid-cols-5">
                {dates.map(date => (
                  <div key={date} className={cn(
                    "p-2 text-center border-l",
                    isToday(parseISO(date)) && "bg-primary/5"
                  )}>
                    <div className="font-medium">
                      {format(parseISO(date), "EEE", { locale: nl })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(parseISO(date), "d MMM", { locale: nl })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {installationTeams.map(team => (
              <div key={team.id} className="grid grid-cols-[200px,1fr] border-t hover:bg-muted/5">
                <div className="p-3 flex items-center gap-2 border-r">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: team.color }}
                  />
                  <span className="font-medium">{team.name}</span>
                </div>
                <div className="grid grid-cols-5">
                  {dates.map(date => (
                    <div key={date} className="p-2 space-y-2 border-l">
                      {timeSlots.map((slot, idx) => (
                        <DateCell 
                          key={idx} 
                          date={date} 
                          team={team} 
                          timeSlot={slot}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

