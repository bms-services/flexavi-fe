
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentActionsProps {
  onNewAppointment: () => void;
  onSettingsOpen: () => void;
}

export const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  onNewAppointment,
  onSettingsOpen,
}) => {
  return (
    <div className="flex gap-2">
      <Button className="bg-primary hover:bg-primary/90" onClick={onNewAppointment}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Nieuwe Afspraak
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onSettingsOpen}
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
};
