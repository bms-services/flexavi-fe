
import { Appointment, TeamDetails, WorkEnvironment } from "@/types";

export interface TeamAvailabilityOverviewProps {
  startDate: string;
  appointments: Appointment[];
  teams: TeamDetails[];
  environments: WorkEnvironment[];
  scheduleSettings: any;
}

export interface TeamSectionProps {
  title: string;
  icon: React.ReactNode;
  teams: TeamDetails[];
  dates: string[];
  appointments: Appointment[];
  scheduleSettings: any;
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
}
