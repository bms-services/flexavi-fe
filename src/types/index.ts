
export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
};

export type LeadDetail = Lead & {
  notes: Note[];
  appointments: Appointment[];
  quotes: Quote[];
  invoices: Invoice[];
};

export type LeadStatus = 
  | "new" 
  | "contacted" 
  | "qualified" 
  | "proposal" 
  | "negotiation" 
  | "won" 
  | "lost";

export type Note = {
  id: string;
  leadId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

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
  location?: string; // Added location property as optional
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

export type Quote = {
  id: string;
  leadId: string;
  amount: number;
  description: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
};

export type QuoteStatus = 
  | "draft" 
  | "sent" 
  | "accepted" 
  | "rejected" 
  | "revised";

export type Invoice = {
  id: string;
  leadId: string;
  quoteId: string | null;
  amount: number;
  description: string;
  status: InvoiceStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceStatus = 
  | "draft" 
  | "sent" 
  | "paid" 
  | "overdue" 
  | "canceled";

export type WorkEnvironment = {
  id: string;
  name: string;
  region: string;
  color: string;
};

export type TeamDetails = {
  id: string;
  name: string;
  type: TeamType;
  environmentId: string;
  color: string;
};
