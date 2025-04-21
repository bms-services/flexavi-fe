
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, PlusCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface DashboardHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  lastUpdated: Date;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  timeRange,
  setTimeRange,
  lastUpdated
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overzicht van je leads, omzet en aankomende afspraken
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center text-sm text-muted-foreground gap-1 sm:mr-2">
          <Clock className="h-3.5 w-3.5" />
          <span>Bijgewerkt: {format(lastUpdated, "d MMM HH:mm", { locale: nl })}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            <span>Filters</span>
          </Button>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px] h-9 text-sm">
              <SelectValue placeholder="Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Deze week</SelectItem>
              <SelectItem value="month">Deze maand</SelectItem>
              <SelectItem value="quarter">Dit kwartaal</SelectItem>
              <SelectItem value="year">Dit jaar</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="gap-1.5">
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Nieuwe Lead</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
