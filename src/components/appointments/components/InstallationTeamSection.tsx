import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { isToday, parseISO } from "date-fns";
import { DateHeader } from "./DateHeader";
import { AvailabilityCell } from "./AvailabilityCell";
import { InstallationTeamSectionProps } from "../types";
import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const InstallationTeamSection = ({ 
  title, 
  icon, 
  teams, 
  dates, 
  appointments,
  searchLocation,
  unavailableDates = {},
  onTeamNameEdit,
  onDateClick
}: InstallationTeamSectionProps) => {
  const timeSlots = [
    { label: "Ochtend", start: 8, end: 13 },
    { label: "Middag", start: 13, end: 19 },
  ];

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
          <div className="grid grid-cols-[150px,1fr] md:grid-cols-[150px,1fr] bg-muted/30">
            <div className="p-3 font-medium border-r">Team</div>
            <div className="grid grid-cols-7">
              {dates.map(date => (
                <DateHeader 
                  key={date} 
                  date={date} 
                  isToday={isToday(parseISO(date))}
                  onDateClick={onDateClick}
                />
              ))}
            </div>
          </div>

          {teams.map(team => (
            <div key={team.id} className="grid grid-cols-[150px,1fr] md:grid-cols-[150px,1fr] border-t hover:bg-muted/5">
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
              <div className="grid grid-cols-7">
                {dates.map(date => (
                  <div key={date} className="p-2 space-y-2 border-l relative">
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
                    ) : (
                      timeSlots.map((slot, idx) => (
                        <AvailabilityCell 
                          key={idx}
                          date={date}
                          team={team}
                          timeSlot={slot}
                          appointments={appointments}
                          maxSlots={2}
                          searchLocation={searchLocation}
                        />
                      ))
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
