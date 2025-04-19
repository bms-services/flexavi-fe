
import React from "react";
import { Button } from "@/components/ui/button";
import { Route, Check, ArrowLeft } from "lucide-react";

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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBackToOverview}
          className="mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Terug naar overzicht
        </Button>
        <h2 className="text-2xl font-bold">
          Afspraken voor {formatDate(date)}
        </h2>
        <p className="text-muted-foreground">
          Beheer en wijs afspraken toe aan teams
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onAutoAssign}>
          <Check className="h-4 w-4 mr-1.5" />
          AI Toewijzing
        </Button>
        <Button 
          variant="outline" 
          className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-800"
          onClick={onOptimizeRoutes}
          disabled={isOptimizingRoute}
        >
          {isOptimizingRoute ? (
            <>Optimaliseren...</>
          ) : (
            <>
              <Route className="h-4 w-4 mr-1.5" />
              Routes Optimaliseren
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
