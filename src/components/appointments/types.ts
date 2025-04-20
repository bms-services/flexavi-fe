
import { Appointment, TeamDetails, WorkEnvironment } from "@/types";

export interface TeamAvailabilityOverviewProps {
  startDate: string;
  appointments: Appointment[];
  teams: TeamDetails[];
  environments: WorkEnvironment[];
  scheduleSettings: {
    salesMorningSlots: number;
    salesAfternoonSlots: number;
    salesEveningSlots: number;
    installationMorningSlots: number;
    installationAfternoonSlots: number;
    installationEveningSlots: number;
    defaultJobDuration: string;
  };
  unavailableDates: Record<string, string[]>;
  onTeamUpdate?: (team: TeamDetails) => void;
  onUnavailableDateAdd?: (teamId: string, date: string) => void;
  onUnavailableDateRemove?: (teamId: string, date: string) => void;
  onDateClick?: (date: string) => void;
}

export interface DateHeaderProps {
  date: string;
  isToday: boolean;
  onDateClick?: (date: string) => void;
  isMobile?: boolean;
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
  isMobile?: boolean;
}

export interface TeamSectionProps {
  title: string;
  icon: React.ReactNode;
  teams: TeamDetails[];
  dates: string[];
  appointments: Appointment[];
  scheduleSettings: {
    salesMorningSlots: number;
    salesAfternoonSlots: number;
    salesEveningSlots: number;
    installationMorningSlots: number;
    installationAfternoonSlots: number;
    installationEveningSlots: number;
  };
  searchLocation?: string;
  unavailableDates?: Record<string, string[]>;
  onTeamNameEdit?: (team: TeamDetails) => void;
  onDateClick?: (date: string) => void;
  isMobile?: boolean;
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
  onDateClick?: (date: string) => void;
  isMobile?: boolean;
}
