
import { Appointment, TeamDetails, WorkEnvironment } from "@/types";

export interface TeamAvailabilityOverviewProps {
  startDate: string;
  appointments: Appointment[];
  teams: TeamDetails[];
  environments: WorkEnvironment[];
  scheduleSettings: any;
  unavailableDates: Record<string, string[]>;
  onTeamUpdate: (team: TeamDetails) => void;
  onUnavailableDateAdd: (teamId: string, date: string) => void;
  onUnavailableDateRemove: (teamId: string, date: string) => void;
}

export interface TeamSectionProps {
  title: string;
  icon: React.ReactNode;
  teams: TeamDetails[];
  dates: string[];
  appointments: Appointment[];
  scheduleSettings: any;
  searchLocation?: string;
  unavailableDates?: Record<string, string[]>;
  onTeamNameEdit?: (team: TeamDetails) => void;
}

export interface DateHeaderProps {
  date: string;
  isToday: boolean;
}

export interface AvailabilityCellProps {
  date: string;
  team: TeamDetails;
  timeSlot: {
    label: string;
    start: number;
    end: number;
  };
  appointments: Appointment[];
  maxSlots: number;
  searchLocation?: string;
}

export interface InstallationTeamSectionProps {
  title: string;
  icon: React.ReactNode;
  teams: TeamDetails[];
  dates: string[];
  appointments: Appointment[];
  searchLocation?: string;
  unavailableDates?: Record<string, string[]>;
  onTeamNameEdit?: (team: TeamDetails) => void;
}

export interface UnassignedAppointmentsProps {
  date: string;
  appointments: Appointment[];
  onDragStart: (e: React.DragEvent, appointment: Appointment) => void;
}

export interface DailyTeamAppointmentsProps {
  date: string;
  appointments: Appointment[];
  teams: TeamDetails[];
  onBackToOverview: () => void;
  onAppointmentAssign: (appointmentId: string, teamId: string) => void;
}

export interface ScheduleSettings {
  salesMorningSlots: number;
  salesAfternoonSlots: number;
  salesEveningSlots: number;
  installationMorningSlots: number;
  installationAfternoonSlots: number;
  installationEveningSlots: number;
  defaultJobDuration: string;
}
