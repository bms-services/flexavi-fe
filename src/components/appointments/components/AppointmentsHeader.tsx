
import React from "react";
import { AppointmentActions } from "./AppointmentActions";

interface AppointmentsHeaderProps {
  onNewAppointment: () => void;
  onSettingsOpen: () => void;
}

export const AppointmentsHeader: React.FC<AppointmentsHeaderProps> = ({
  onNewAppointment,
  onSettingsOpen,
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
      />
    </div>
  );
};
