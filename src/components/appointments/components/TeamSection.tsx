
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { isToday, parseISO } from "date-fns";
import { DateHeader } from "./DateHeader";
import { AvailabilityCell } from "./AvailabilityCell";
import { TeamSectionProps } from "../types";
import { Button } from "@/components/ui/button";
import { AlertOctagon, List } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TeamSection = ({ 
  title, 
  icon, 
  teams, 
  dates, 
  appointments,
  scheduleSettings,
  searchLocation,
  unavailableDates = {},
  onTeamNameEdit,
  onDateClick
}: TeamSectionProps) => {
  const timeSlots = [
    { label: "Ochtend", start: 8, end: 13 },
    { label: "Middag", start: 13, end: 19 },
    { label: "Avond", start: 19, end: 22 },
  ];

  const getMaxSlots = (teamType: string, timeSlot: string) => {
    if (teamType === "sales") {
      if (timeSlot === "Ochtend") return scheduleSettings.salesMorningSlots;
      if (timeSlot === "Middag") return scheduleSettings.salesAfternoonSlots;
      return scheduleSettings.salesEveningSlots;
    }
    if (timeSlot === "Ochtend") return scheduleSettings.installationMorningSlots;
    if (timeSlot === "Middag") return scheduleSettings.installationAfternoonSlots;
    return scheduleSettings.installationEveningSlots;
  };

  const isTeamUnavailableOnDate = (teamId: string, date: string) => {
    return unavailableDates[teamId]?.includes(date);
  };

  // Calculate statistics for each date
  const getDateStatistics = (date: string) => {
    let totalScheduled = 0;
    let totalCapacity = 0;

    teams.forEach(team => {
      if (!isTeamUnavailableOnDate(team.id, date)) {
        timeSlots.forEach(slot => {
          const maxSlots = getMaxSlots(team.type, slot.label);
          totalCapacity += maxSlots;

          const scheduledCount = appointments.filter(app => {
            const hour = parseInt(app.startTime.split(":")[0]);
            return app.date === date && 
                   app.teamId === team.id && 
                   hour >= slot.start && 
                   hour < slot.end;
          }).length;

          totalScheduled += scheduledCount;
        });
      }
    });

    return {
      scheduled: totalScheduled,
      capacity: totalCapacity,
      available: totalCapacity - totalScheduled
    };
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
                  onDateClick={onDateClick}
                />
              ))}
            </div>
          </div>

          {/* Statistics Row */}
          <div className="grid grid-cols-[200px,1fr] border-t bg-muted/5">
            <div className="p-3 flex items-center gap-2 border-r">
              <List className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Totaal Overzicht
              </span>
            </div>
            <div className="grid grid-cols-5">
              {dates.map(date => {
                const stats = getDateStatistics(date);
                return (
                  <div key={date} className="p-2 space-y-1 border-l">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center text-sm">
                          <span className="font-medium text-primary">
                            {stats.scheduled}/{stats.capacity}
                          </span>
                          <div className="text-xs text-muted-foreground">
                            {stats.available} beschikbaar
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          <p>Ingepland: {stats.scheduled}</p>
                          <p>Capaciteit: {stats.capacity}</p>
                          <p>Beschikbaar: {stats.available}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Teams Grid */}
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
                          maxSlots={getMaxSlots(team.type, slot.label)}
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
