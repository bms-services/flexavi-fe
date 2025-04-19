
import React from "react";
import { AppointmentActions } from "./AppointmentActions";
import { TeamDetails } from "@/types";

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
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Afspraken</h1>
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
