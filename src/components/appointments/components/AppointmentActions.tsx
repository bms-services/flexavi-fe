
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Calendar, Users } from "lucide-react";
import { TeamDetails } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface AppointmentActionsProps {
  onNewAppointment: () => void;
  onSettingsOpen: () => void;
  teams: TeamDetails[];
}

export const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  onNewAppointment,
  onSettingsOpen,
  teams
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onSettingsOpen}>
              <Calendar className="h-4 w-4 mr-2" />
              Agenda instellingen
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              <Users className="h-4 w-4 mr-2" />
              Team beheer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button onClick={onNewAppointment} className="whitespace-nowrap">
          <PlusCircle className="h-4 w-4 mr-2" />
          Nieuwe afspraak
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" onClick={onSettingsOpen}>
        <Settings className="h-4 w-4 mr-2" />
        Instellingen
      </Button>
      
      <Button onClick={onNewAppointment}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Nieuwe afspraak
      </Button>
    </div>
  );
};
