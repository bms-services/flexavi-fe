
import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Route, Bot } from "lucide-react";
import { RouteOptimizationModal } from "./RouteOptimizationModal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const formattedDate = format(parseISO(date), "EEEE d MMMM yyyy", {
    locale: nl
  });

  const handleOptimizeRoutes = (type: "all" | "assigned" | "unassigned") => {
    // Here we would handle the different optimization types
    // For now, we'll just call the existing optimization function
    onOptimizeRoutes();
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <Button variant="ghost" className="h-8 px-2 -ml-2 mb-2" onClick={onBackToOverview}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Terug naar planning
        </Button>
        <h1 className="text-2xl font-bold">Afspraken {formattedDate}</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="default" 
          className="h-9" 
          onClick={() => setModalOpen(true)}
          disabled={isOptimizingRoute}
        >
          <Route className="h-4 w-4 mr-2" />
          {isOptimizingRoute ? "Optimaliseren..." : "Routes optimaliseren"}
        </Button>
      </div>

      <RouteOptimizationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onOptimize={handleOptimizeRoutes}
        isOptimizing={isOptimizingRoute}
      />
    </div>
  );
};
