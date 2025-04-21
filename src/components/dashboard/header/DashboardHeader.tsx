
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Dashboard overzicht</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Laatste update: {format(lastUpdated, "d MMM yyyy, HH:mm", { locale: nl })}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {!isMobile && (
          <>
            <Button variant="outline" className="h-9 text-sm">
              Vandaag
            </Button>
            <Button variant="outline" className="h-9 text-sm whitespace-nowrap">
              Vgl. vorige dag
            </Button>
          </>
        )}
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className={`${isMobile ? 'w-full' : 'w-[150px]'} h-9 text-sm`}>
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
