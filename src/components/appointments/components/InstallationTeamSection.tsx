
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { isToday, parseISO } from "date-fns";
import { DateHeader } from "./DateHeader";
import { Clock, MapPin, AlertOctagon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InstallationTeamSectionProps } from "../types";

export const InstallationTeamSection = ({
  title,
  icon,
  teams,
  dates,
  appointments,
  searchLocation,
  unavailableDates = {},
  onTeamNameEdit
}: InstallationTeamSectionProps) => {
  const isTeamUnavailableOnDate = (teamId: string, date: string) => {
    return unavailableDates[teamId]?.includes(date);
  };

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
                <Button 
                  variant="ghost" 
                  className="h-auto px-2 py-0.5 font-medium hover:bg-transparent hover:underline"
                  onClick={() => onTeamNameEdit && onTeamNameEdit(team)}
                >
                  {team.name}
                </Button>
              </div>
              <div className="grid grid-cols-5">
                {dates.map(date => {
                  const dayAppointments = appointments.filter(
                    app => app.date === date && app.teamId === team.id
                  );

                  // Check if any appointments match the search location
                  const hasMatchingLocation = searchLocation ? 
                    dayAppointments.some(app => 
                      app.location?.toLowerCase().includes(searchLocation.toLowerCase())
                    ) : false;

                  return (
                    <div key={date} className="p-2 border-l">
                      {isTeamUnavailableOnDate(team.id, date) ? (
                        <div className="flex flex-col items-center justify-center h-full py-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex flex-col items-center text-orange-500">
                                <AlertOctagon className="h-5 w-5 mb-1" />
                                <span className="text-xs">Niet beschikbaar</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Team is niet beschikbaar op deze datum</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      ) : dayAppointments.length > 0 ? (
                        dayAppointments.map((app, idx) => {
                          const locationMatches = searchLocation ? 
                            app.location?.toLowerCase().includes(searchLocation.toLowerCase()) : 
                            false;

                          return (
                            <HoverCard key={idx}>
                              <HoverCardTrigger asChild>
                                <div className="mb-2 last:mb-0">
                                  <Badge 
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-between gap-1 cursor-pointer transition-colors text-sm px-3 py-1.5",
                                      locationMatches && "bg-green-100 hover:bg-green-200 border-green-500",
                                      !locationMatches && "hover:bg-primary hover:text-primary-foreground"
                                    )}
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
                          );
                        })
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
