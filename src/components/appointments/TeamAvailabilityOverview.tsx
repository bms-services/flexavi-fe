
import React, { useState } from "react";
import { format, parseISO, addDays, isToday } from "date-fns";
import { nl } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Building2, Users, Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WorkEnvironment, TeamDetails, Appointment } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

  // State to track expanded teams
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  const dates = Array.from({ length: daysToShow }, (_, i) => 
    format(addDays(parseISO(startDate), i), 'yyyy-MM-dd')
  );

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

  // Group teams by environment
  const salesTeamsByEnvironment = salesTeams.reduce((acc, team) => {
    const env = environments.find(e => e.id === team.environmentId);
    if (!acc[team.environmentId]) {
      acc[team.environmentId] = {
        environment: env,
        teams: []
      };
    }
    acc[team.environmentId].teams.push(team);
    return acc;
  }, {} as Record<string, { environment: WorkEnvironment | undefined, teams: TeamDetails[] }>);

  const installationTeamsByEnvironment = installationTeams.reduce((acc, team) => {
    const env = environments.find(e => e.id === team.environmentId);
    if (!acc[team.environmentId]) {
      acc[team.environmentId] = {
        environment: env,
        teams: []
      };
    }
    acc[team.environmentId].teams.push(team);
    return acc;
  }, {} as Record<string, { environment: WorkEnvironment | undefined, teams: TeamDetails[] }>);

  const TeamHeader = ({ type }: { type: string }) => (
    <div className="bg-muted p-4 rounded-t-lg border-b flex items-center space-x-2">
      <Users className="h-5 w-5 text-primary" />
      <h2 className="text-lg font-semibold">
        {type === 'sales' ? 'Verkoop Teams' : 'Uitvoerende Ploegen'}
      </h2>
    </div>
  );

  const EnvironmentHeader = ({ environment }: { environment: WorkEnvironment | undefined }) => (
    <div 
      className="px-4 py-3 flex items-center gap-2 border-l-4" 
      style={{ borderLeftColor: environment?.color || '#e2e8f0' }}
    >
      <MapPin className="h-4 w-4" style={{ color: environment?.color }} />
      <span className="font-medium">{environment?.name || 'Onbekend gebied'}</span>
    </div>
  );

  const DateHeader = ({ date }: { date: string }) => {
    const isCurrentDay = isToday(parseISO(date));
    return (
      <div className={cn(
        "p-2 text-center border-b",
        isCurrentDay && "bg-primary/10 font-medium"
      )}>
        <div className="text-sm font-medium">
          {format(parseISO(date), "EEE", { locale: nl })}
        </div>
        <div className="text-xs text-muted-foreground">
          {format(parseISO(date), "d MMM", { locale: nl })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Sales Teams Section */}
      <Card className="overflow-hidden shadow-sm">
        <TeamHeader type="sales" />
        
        <CardContent className="p-0">
          <div className="divide-y">
            {Object.values(salesTeamsByEnvironment).map(({ environment, teams }) => (
              <div key={environment?.id} className="bg-card">
                <EnvironmentHeader environment={environment} />
                
                <div className="overflow-x-auto">
                  <div className="min-w-[700px]">
                    <div className="grid grid-cols-[200px,1fr] border-b">
                      <div className="p-2 font-medium border-r bg-muted/30">Team</div>
                      <div className="grid grid-cols-5">
                        {dates.map(date => (
                          <DateHeader key={date} date={date} />
                        ))}
                      </div>
                    </div>
                    
                    {teams.map(team => (
                      <div key={team.id} className="grid grid-cols-[200px,1fr] border-b hover:bg-muted/5">
                        <div className="p-3 flex items-center gap-2 border-r">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: team.color }}
                          ></div>
                          <span className="font-medium truncate">{team.name}</span>
                        </div>
                        
                        <div className="grid grid-cols-5">
                          {dates.map(date => (
                            <div key={date} className="p-2 flex flex-col gap-2">
                              {timeSlots.map((slot, idx) => {
                                const count = getAppointmentsCount(date, team.id, slot.start, slot.end);
                                const maxSlots = getMaxSlots(team.type, slot.label);
                                const available = maxSlots - count;
                                const isFullyBooked = available === 0;
                                const isLimitedAvailability = available <= 1;
                                
                                return (
                                  <Tooltip key={idx}>
                                    <TooltipTrigger asChild>
                                      <div className="relative">
                                        <Badge 
                                          variant={isFullyBooked ? "destructive" : isLimitedAvailability ? "warning" : "outline"}
                                          className={cn(
                                            "w-full justify-between gap-1 cursor-pointer transition-colors text-xs px-2 py-1",
                                            !isFullyBooked && "hover:bg-primary hover:text-primary-foreground"
                                          )}
                                        >
                                          <span className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {slot.start}:00
                                          </span>
                                          <span className="font-medium">
                                            {count}/{maxSlots}
                                          </span>
                                        </Badge>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" align="center">
                                      <div className="text-center">
                                        <p className="font-medium">{slot.label}</p>
                                        <p>{slot.start}:00 - {slot.end}:00</p>
                                        <p className={cn(
                                          "mt-1 text-sm",
                                          isFullyBooked ? "text-destructive" : "text-primary"
                                        )}>
                                          {isFullyBooked ? "Volledig volgeboekt" : `${available} plekken beschikbaar`}
                                        </p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Installation Teams Section */}
      <Card className="overflow-hidden shadow-sm">
        <TeamHeader type="installation" />
        
        <CardContent className="p-0">
          <div className="divide-y">
            {Object.values(installationTeamsByEnvironment).map(({ environment, teams }) => (
              <div key={environment?.id} className="bg-card">
                <EnvironmentHeader environment={environment} />
                
                <div className="overflow-x-auto">
                  <div className="min-w-[700px]">
                    <div className="grid grid-cols-[200px,1fr] border-b">
                      <div className="p-2 font-medium border-r bg-muted/30">Team</div>
                      <div className="grid grid-cols-5">
                        {dates.map(date => (
                          <DateHeader key={date} date={date} />
                        ))}
                      </div>
                    </div>
                    
                    {teams.map(team => (
                      <div key={team.id} className="grid grid-cols-[200px,1fr] border-b hover:bg-muted/5">
                        <div className="p-3 flex items-center gap-2 border-r">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: team.color }}
                          ></div>
                          <span className="font-medium truncate">{team.name}</span>
                        </div>
                        
                        <div className="grid grid-cols-5">
                          {dates.map(date => (
                            <div key={date} className="p-2 flex flex-col gap-2">
                              {timeSlots.map((slot, idx) => {
                                const count = getAppointmentsCount(date, team.id, slot.start, slot.end);
                                const maxSlots = getMaxSlots(team.type, slot.label);
                                const available = maxSlots - count;
                                const isFullyBooked = available === 0;
                                const isLimitedAvailability = available <= 1;
                                
                                return (
                                  <Tooltip key={idx}>
                                    <TooltipTrigger asChild>
                                      <div className="relative">
                                        <Badge 
                                          variant={isFullyBooked ? "destructive" : isLimitedAvailability ? "warning" : "outline"}
                                          className={cn(
                                            "w-full justify-between gap-1 cursor-pointer transition-colors text-xs px-2 py-1",
                                            !isFullyBooked && "hover:bg-primary hover:text-primary-foreground"
                                          )}
                                        >
                                          <span className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {slot.start}:00
                                          </span>
                                          <span className="font-medium">
                                            {count}/{maxSlots}
                                          </span>
                                        </Badge>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" align="center">
                                      <div className="text-center">
                                        <p className="font-medium">{slot.label}</p>
                                        <p>{slot.start}:00 - {slot.end}:00</p>
                                        <p className={cn(
                                          "mt-1 text-sm",
                                          isFullyBooked ? "text-destructive" : "text-primary"
                                        )}>
                                          {isFullyBooked ? "Volledig volgeboekt" : `${available} plekken beschikbaar`}
                                        </p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
