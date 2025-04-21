
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { ScrollContainer } from "@/components/ui/scroll-container";

interface DashboardHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  lastUpdated: Date;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  timeRange,
  setTimeRange,
  lastUpdated,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard overzicht</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Laatste update: {format(lastUpdated, "d MMMM yyyy, HH:mm", { locale: nl })}
        </p>
      </div>
      
      <ScrollContainer className="flex items-center gap-2">
        <Button variant="outline" size="sm">Vandaag</Button>
        <Button variant="outline" size="sm">Vergeleken met vorige dag</Button>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecteer periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Vandaag</SelectItem>
            <SelectItem value="week">Deze week</SelectItem>
            <SelectItem value="month">Deze maand</SelectItem>
            <SelectItem value="quarter">Dit kwartaal</SelectItem>
            <SelectItem value="year">Dit jaar</SelectItem>
          </SelectContent>
        </Select>
      </ScrollContainer>
    </div>
  );
};
