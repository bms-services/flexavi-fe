
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { isToday, parseISO } from "date-fns";
import { DateHeader } from "./DateHeader";
import { Clock, MapPin } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface InstallationTeamSectionProps {
  title: string;
  icon: React.ReactNode;
  teams: any[];
  dates: string[];
  appointments: any[];
}

export const InstallationTeamSection = ({
  title,
  icon,
  teams,
  dates,
  appointments,
}: InstallationTeamSectionProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted/50 p-4 rounded-t-lg border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="rounded-lg border overflow-hidden">
          <div className="grid grid-cols-[200px,1fr] bg-muted/30">
            <div className="p-3 font-medium border-r">Team</div>
            <div className="grid grid-cols-5">
              {dates.map(date => (
                <DateHeader 
                  key={date} 
                  date={date} 
                  isToday={isToday(parseISO(date))}
                />
              ))}
            </div>
          </div>

          {teams.map(team => (
            <div key={team.id} className="grid grid-cols-[200px,1fr] border-t hover:bg-muted/5">
              <div className="p-3 flex items-center gap-2 border-r">
                <div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: team.color }}
                />
                <span className="font-medium">{team.name}</span>
              </div>
              <div className="grid grid-cols-5">
                {dates.map(date => {
                  const dayAppointments = appointments.filter(
                    app => app.date === date && app.teamId === team.id
                  );

                  return (
                    <div key={date} className="p-2 border-l">
                      {dayAppointments.length > 0 ? (
                        dayAppointments.map((app, idx) => (
                          <HoverCard key={idx}>
                            <HoverCardTrigger asChild>
                              <div className="mb-2 last:mb-0">
                                <Badge 
                                  variant="outline"
                                  className="w-full justify-between gap-1 cursor-pointer transition-colors text-sm px-3 py-1.5 hover:bg-primary hover:text-primary-foreground"
                                >
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    {app.startTime} - {app.endTime}
                                  </span>
                                </Badge>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80 p-4" align="start">
                              <div className="space-y-2">
                                <p className="font-medium">{app.title}</p>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <p>{app.startTime} - {app.endTime}</p>
                                </div>
                                {app.location && (
                                  <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                    <p className="text-sm">{app.location}</p>
                                  </div>
                                )}
                                <p className="text-sm text-muted-foreground">
                                  {app.description}
                                </p>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground text-center py-2">
                          Geen afspraken
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
