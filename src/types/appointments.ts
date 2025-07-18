
export type AppointmentStatus = 
  | "scheduled" 
  | "completed" 
  | "canceled" 
  | "rescheduled"
  | "quote_request"    // Offerte aanvraag
  | "warranty"         // Garantie
  | "new_assignment"   // Nieuwe opdracht
  | "extra_assignment"; // Extra opdracht

export type TeamType =
  | "sales"
  | "installation"
  | "repair"
  | "maintenance";

export type Appointment = {
  id: string;
  leadId: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  teamId: string;
  teamType: TeamType;
  location?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
};

export type Team = {
  id: string;
  name: string;
  type: TeamType;
  members: string[];
  color: string;
};

// Add the TeamDetails type that was missing
export type TeamDetails = {
  id: string;
  name: string;
  type: TeamType;
  environmentId?: string;
  color: string;
  members?: string[];
};

export type WorkEnvironment = {
  id: string;
  name: string;
  region: string;
  color: string;
};
