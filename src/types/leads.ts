
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
