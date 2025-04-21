
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

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
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard overzicht</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Laatste update: {format(lastUpdated, "d MMMM yyyy, HH:mm", { locale: nl })}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="h-9">
          Vandaag
        </Button>
        <Button variant="outline" className="h-9">
          Vergeleken met vorige dag
        </Button>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] h-9">
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
      </div>
    </div>
  );
};
