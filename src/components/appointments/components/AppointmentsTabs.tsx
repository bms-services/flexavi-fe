
import React from "react";
import { TeamAvailabilityOverview } from "../TeamAvailabilityOverview";
import { Appointment, TeamDetails, WorkEnvironment } from "@/types";

interface AppointmentsTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  selectedDate: string;
  appointments: Appointment[];
  teams: TeamDetails[];
  environments: WorkEnvironment[];
  scheduleSettings: any;
  unavailableDates: Record<string, string[]>;
  onDateSelect: (date: string) => void;
  onTeamUpdate: (team: TeamDetails) => void;
  onUnavailableDateAdd: (teamId: string, date: string) => void;
  onUnavailableDateRemove: (teamId: string, date: string) => void;
}

export const AppointmentsTabs: React.FC<AppointmentsTabsProps> = ({
  selectedDate,
  appointments,
  teams,
  environments,
  scheduleSettings,
  unavailableDates,
  onTeamUpdate,
  onUnavailableDateAdd,
  onUnavailableDateRemove,
}) => {
  return (
    <div className="space-y-6">
      <TeamAvailabilityOverview
        startDate={selectedDate}
        appointments={appointments}
        teams={teams}
        environments={environments}
        scheduleSettings={scheduleSettings}
        unavailableDates={unavailableDates}
        onTeamUpdate={onTeamUpdate}
        onUnavailableDateAdd={onUnavailableDateAdd}
        onUnavailableDateRemove={onUnavailableDateRemove}
      />
    </div>
  );
};
