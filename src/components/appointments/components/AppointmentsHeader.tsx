
import React from "react";
import { AppointmentActions } from "./AppointmentActions";
import { TeamDetails } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppointmentsHeaderProps {
  onNewAppointment: () => void;
  onSettingsOpen: () => void;
  teams: TeamDetails[];
}

export const AppointmentsHeader: React.FC<AppointmentsHeaderProps> = ({
  onNewAppointment,
  onSettingsOpen,
  teams,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>Planning</h1>
        <p className="text-muted-foreground">
          Planning & beschikbaarheid overzicht
        </p>
      </div>
      <AppointmentActions 
        onNewAppointment={onNewAppointment}
        onSettingsOpen={onSettingsOpen}
        teams={teams}
      />
    </div>
  );
};
