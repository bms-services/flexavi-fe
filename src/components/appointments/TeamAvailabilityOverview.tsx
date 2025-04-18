
import React from "react";
import { format, parseISO, addDays } from "date-fns";
import { nl } from "date-fns/locale";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Building2, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WorkEnvironment, TeamDetails, Appointment } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

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

  const getAppointmentsCount = (date: string, teamId: string, startHour: number, endHour: number) => {
    return appointments.filter(app => {
      const hour = parseInt(app.startTime.split(":")[0]);
      return app.date === date && app.teamId === teamId && hour >= startHour && hour < endHour;
    }).length;
  };

  const getMaxSlots = (teamType: string, timeSlot: string) => {
    if (teamType === "sales") {
      return scheduleSettings[`sales${timeSlot}Slots`];
    }
    return scheduleSettings[`installation${timeSlot}Slots`];
  };

  const groupedTeams = teams.reduce((acc, team) => {
    const env = environments.find(e => e.id === team.environmentId);
    if (!acc[team.type]) {
      acc[team.type] = {};
    }
    if (!acc[team.type][env?.id || 'unknown']) {
      acc[team.type][env?.id || 'unknown'] = {
        environment: env,
        teams: []
      };
    }
    acc[team.type][env?.id || 'unknown'].teams.push(team);
    return acc;
  }, {} as Record<string, Record<string, { environment: WorkEnvironment | undefined, teams: TeamDetails[] }>>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(groupedTeams).map(([teamType, envGroups]) => (
          <Card key={teamType} className="overflow-hidden">
            <CardHeader className="bg-muted p-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users2 className="h-5 w-5" />
                {teamType === 'sales' ? 'Verkoop Teams' : 'Uitvoerende Ploegen'}
              </h3>
            </CardHeader>
            <CardContent className="p-0">
              {Object.values(envGroups).map(({ environment, teams }) => (
                <div 
                  key={environment?.id}
                  className="border-l-4 divide-y"
                  style={{ borderLeftColor: environment?.color || '#gray' }}
                >
                  <div className="p-4 bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" style={{ color: environment?.color }} />
                      <span className="font-medium">{environment?.name || 'Onbekend gebied'}</span>
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {teams.map(team => (
                      <div key={team.id} className="p-4">
                        <div className="grid grid-cols-[200px,1fr] gap-4">
                          <div className="flex items-center gap-2">
                            <Users2 className="h-4 w-4" style={{ color: team.color }} />
                            <span className="font-medium">{team.name}</span>
                          </div>
                          
                          <div className="grid grid-cols-5 gap-2">
                            {dates.map(date => (
                              <div key={date} className="space-y-2">
                                <div className="text-xs text-center text-muted-foreground mb-1">
                                  {format(parseISO(date), "E dd/MM", { locale: nl })}
                                </div>
                                {timeSlots.map((slot, idx) => {
                                  const count = getAppointmentsCount(date, team.id, slot.start, slot.end);
                                  const maxSlots = getMaxSlots(team.type, slot.label);
                                  const available = maxSlots - count;
                                  
                                  return (
                                    <Tooltip key={idx}>
                                      <TooltipTrigger asChild>
                                        <Badge 
                                          variant={available === 0 ? "destructive" : available <= 1 ? "secondary" : "outline"}
                                          className={cn(
                                            "w-full justify-between gap-2 cursor-pointer transition-colors",
                                            available > 0 && "hover:bg-primary hover:text-primary-foreground"
                                          )}
                                        >
                                          <span>{slot.start}:00</span>
                                          <span>{count}/{maxSlots}</span>
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="font-medium">{slot.label}</p>
                                        <p>{slot.start}:00 - {slot.end}:00</p>
                                        <p>{available} slots beschikbaar</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
