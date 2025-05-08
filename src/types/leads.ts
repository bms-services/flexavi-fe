
import { Appointment } from './appointments';
import { Quote } from './quotes';
import { Invoice } from './invoices';
import { WorkAgreement } from './work-agreements';

export type Lead = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  postal_code?: string;
  house_number?: string;
  house_number_addition?: string;
  street?: string;
  city?: string;
  province?: string;
  status?: LeadStatus;
};

export type LeadDetail = Lead & {
  notes: Note[];
  appointments: Appointment[];
  quotes: Quote[];
  invoices: Invoice[];
  workAgreements?: WorkAgreement[];
};

export type LeadStatus = 
  | "new_lead"           // Nieuwe lead
  | "appointment_scheduled" // Afspraak ingepland
  | "warranty_visit"     // Garantie afspraak
  | "payment_pending"    // Openstaande betaling
  | "in_collection"      // Loopt bij incasso
  | "legal_case"        // Rechtzaak lopend
  | "satisfied";        // Tevreden klant

export type Note = {
  id: string;
  leadId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
