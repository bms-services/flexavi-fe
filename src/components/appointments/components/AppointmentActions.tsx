
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppointmentActionsProps {
  onNewAppointment: () => void;
  onSettingsOpen: () => void;
}

export const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  onNewAppointment,
  onSettingsOpen,
}) => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <div className="flex gap-2">
      <Button className="bg-primary hover:bg-primary/90" onClick={onNewAppointment}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Nieuwe Afspraak
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handleSettingsClick}
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
};
