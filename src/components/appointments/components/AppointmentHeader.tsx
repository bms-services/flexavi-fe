
import React from "react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CalculatorIcon, Route, Brain } from "lucide-react";

interface AppointmentHeaderProps {
  date: string;
  onBackToOverview: () => void;
  onOptimizeRoutes: () => void;
  onAutoAssign: () => void;
  isOptimizingRoute: boolean;
}

export const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  date,
  onBackToOverview,
  onOptimizeRoutes,
  onAutoAssign,
  isOptimizingRoute
}) => {
  const formattedDate = format(parseISO(date), "EEEE d MMMM yyyy", { locale: nl });
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <Button 
          variant="ghost" 
          className="mb-2 -ml-2 h-8 gap-1"
          onClick={onBackToOverview}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Terug naar overzicht</span>
        </Button>
        <h1 className="text-2xl font-bold">Dagplanning: {formattedDate}</h1>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="h-9"
          onClick={onAutoAssign}
        >
          <Brain className="mr-1.5 h-4 w-4" />
          AI Auto-toewijzen
        </Button>
        <Button 
          variant="default" 
          className="h-9"
          onClick={onOptimizeRoutes}
          disabled={isOptimizingRoute}
        >
          <Route className="mr-1.5 h-4 w-4" />
          {isOptimizingRoute ? "Routes optimaliseren..." : "Routes optimaliseren"}
        </Button>
      </div>
    </div>
  );
};
