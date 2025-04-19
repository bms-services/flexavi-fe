
import React, { useState } from "react";
import { TeamAvailabilityOverview } from "../TeamAvailabilityOverview";
import { Appointment, TeamDetails, WorkEnvironment } from "@/types";
import { DailyTeamAppointments } from "../DailyTeamAppointments";
import { AppointmentCalendar } from "../AppointmentCalendar";

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
  onDateSelect,
}) => {
  const [showDailyView, setShowDailyView] = useState(false);
  
  const handleDateSelect = (date: string) => {
    onDateSelect(date);
    setShowDailyView(true);
  };
  
  const handleBackToOverview = () => {
    setShowDailyView(false);
  };
  
  const handleAppointmentAssign = (appointmentId: string, teamId: string) => {
    // This would be handled at a higher level in a real application
    console.log(`Assigning appointment ${appointmentId} to team ${teamId}`);
  };

  if (showDailyView) {
    return (
      <DailyTeamAppointments
        date={selectedDate}
        appointments={appointments}
        teams={teams}
        onBackToOverview={handleBackToOverview}
        onAppointmentAssign={handleAppointmentAssign}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <AppointmentCalendar
            appointments={appointments}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        </div>
        <div className="md:col-span-2">
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
      </div>
    </div>
  );
};
