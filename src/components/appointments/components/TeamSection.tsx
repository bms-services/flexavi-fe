
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { isToday, parseISO } from "date-fns";
import { DateHeader } from "./DateHeader";
import { AvailabilityCell } from "./AvailabilityCell";
import { TeamSectionProps } from "../types";

export const TeamSection = ({ 
  title, 
  icon, 
  teams, 
  dates, 
  appointments,
  scheduleSettings 
}: TeamSectionProps) => {
  const timeSlots = [
    { label: "Ochtend", start: 8, end: 13 },
    { label: "Middag", start: 13, end: 19 },
  ];

  const getMaxSlots = (teamType: string, timeSlot: string) => {
    if (teamType === "sales") {
      return timeSlot === "Ochtend" ? scheduleSettings.salesMorningSlots : scheduleSettings.salesAfternoonSlots;
    }
    return timeSlot === "Ochtend" ? scheduleSettings.installationMorningSlots : scheduleSettings.installationAfternoonSlots;
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
                <span className="font-medium">{team.name}</span>
              </div>
              <div className="grid grid-cols-5">
                {dates.map(date => (
                  <div key={date} className="p-2 space-y-2 border-l">
                    {timeSlots.map((slot, idx) => (
                      <AvailabilityCell 
                        key={idx}
                        date={date}
                        team={team}
                        timeSlot={slot}
                        appointments={appointments}
                        maxSlots={getMaxSlots(team.type, slot.label)}
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
  );
};
