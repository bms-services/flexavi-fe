
import React, { useState } from "react";
import { TeamAvailabilityOverview } from "../TeamAvailabilityOverview";
import { DailyAppointments } from "../DailyAppointments";
import { DailyTeamAppointments } from "../DailyTeamAppointments";
import { Appointment, TeamDetails, WorkEnvironment } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

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
  onAppointmentAssign?: (appointmentId: string, teamId: string) => void;
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
  onAppointmentAssign,
}) => {
  const [showDailyView, setShowDailyView] = useState(false);
  const [showTeamDailyView, setShowTeamDailyView] = useState(false);

  const handleDateClick = (date: string) => {
    onDateSelect(date);
    setShowTeamDailyView(true);
  };

  const handleBackToOverview = () => {
    setShowDailyView(false);
    setShowTeamDailyView(false);
  };

  const handleAppointmentAssign = (appointmentId: string, teamId: string) => {
    if (onAppointmentAssign) {
      onAppointmentAssign(appointmentId, teamId);
    }
  };

  if (showTeamDailyView) {
    return (
      <div className="space-y-6">
        <DailyTeamAppointments
          date={selectedDate}
          appointments={appointments.filter(app => app.date === selectedDate)}
          teams={teams}
          onBackToOverview={handleBackToOverview}
          onAppointmentAssign={handleAppointmentAssign}
        />
      </div>
    );
  }

  if (showDailyView) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="gap-2"
            onClick={handleBackToOverview}
          >
            <ChevronLeft className="h-4 w-4" />
            Terug naar planning
          </Button>
        </div>
        <DailyAppointments
          date={selectedDate}
          appointments={appointments.filter(app => app.date === selectedDate)}
        />
      </div>
    );
  }

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
        onDateClick={handleDateClick}
      />
    </div>
  );
};
