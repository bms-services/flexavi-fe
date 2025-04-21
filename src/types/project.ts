
import { Lead, Quote, Invoice, WorkAgreement } from "./index";

export type ProjectStatus = "active" | "completed" | "on-hold" | "cancelled";

export type ProjectExpense = {
  id: string;
  projectId: string;
  description: string;
  amount: number;
  date: string;
  type?: 'material' | 'transport'; // Added type field
  receiptUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectPersonnel = {
  id: string;
  projectId: string;
  name: string;
  role: string;
  dailyRate: number;
  days: number;
  totalCost: number;
};

export type ProjectNoteType = "note" | "task";

export type ProjectNote = {
  id: string;
  createdAt: string;
  createdBy: string;
  createdFor: string;
  note: string;
  type?: ProjectNoteType;
  status?: "open" | "completed"; // Voor taken
  dueDate?: string; // Voor taken
};

export type ProjectAppointment = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  createdBy: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  location: string;
  budget: number;
  expenses: ProjectExpense[];
  personnel: ProjectPersonnel[];
  leads: string[]; // Array of Lead IDs
  quotes: string[]; // Array of Quote IDs
  invoices: string[]; // Array of Invoice IDs
  workAgreements: string[]; // Array of WorkAgreement IDs
  revenue: number;
  profit: number;
  photos: { name: string; url: string }[];
  createdAt: string;
  updatedAt: string;
  appointments?: ProjectAppointment[]; // Toegevoegd
  notes?: ProjectNote[]; // Toegevoegd
};
