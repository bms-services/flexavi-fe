
import React from "react";
import { format, parseISO, addDays } from "date-fns";
import { nl } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Building, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WorkEnvironment, TeamDetails, Appointment } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TeamAvailabilityOverviewProps {
  startDate: string;
  appointments: Appointment[];
  teams: TeamDetails[];
  environments: WorkEnvironment[];
  scheduleSettings: any; // Using the existing schedule settings
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
    { label: "Ochtend", start: 9, end: 12 },
    { label: "Middag", start: 12, end: 17 },
    { label: "Avond", start: 17, end: 21 },
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
      {Object.entries(groupedTeams).map(([teamType, envGroups]) => (
        <Card key={teamType} className="overflow-hidden">
          <div className="bg-muted p-4">
            <h3 className="text-lg font-semibold">
              {teamType === 'sales' ? 'Verkoop Teams' : 'Uitvoerende Ploegen'}
            </h3>
          </div>
          <CardContent className="p-4">
            {Object.values(envGroups).map(({ environment, teams }) => (
              <div 
                key={environment?.id} 
                className="mb-6 last:mb-0"
                style={{ 
                  backgroundColor: `${environment?.color}10`,
                  borderLeft: `4px solid ${environment?.color}` 
                }}
              >
                <div className="p-3 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="font-medium">{environment?.name || 'Onbekend gebied'}</span>
                </div>
                
                <div className="space-y-4">
                  {teams.map(team => (
                    <div key={team.id} className="grid grid-cols-[200px,1fr] gap-4">
                      <div className="flex items-center gap-2 pl-3">
                        <Users className="h-4 w-4" style={{ color: team.color }} />
                        <span className="font-medium">{team.name}</span>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-2">
                        {dates.map(date => (
                          <div key={date} className="space-y-2">
                            {timeSlots.map((slot, idx) => {
                              const count = getAppointmentsCount(date, team.id, slot.start, slot.end);
                              const maxSlots = getMaxSlots(team.type, slot.label);
                              const available = maxSlots - count;
                              
                              return (
                                <Tooltip key={idx}>
                                  <TooltipTrigger>
                                    <Badge 
                                      variant={available === 0 ? "destructive" : "outline"}
                                      className={cn(
                                        "w-full justify-between gap-2",
                                        available > 0 && "hover:bg-primary hover:text-primary-foreground"
                                      )}
                                    >
                                      <span>{slot.label[0]}</span>
                                      <span>{count}/{maxSlots}</span>
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{slot.label}: {count}/{maxSlots} slots gebruikt</p>
                                    <p>{slot.start}:00 - {slot.end}:00</p>
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
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
