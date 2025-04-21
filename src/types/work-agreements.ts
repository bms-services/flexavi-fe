
export type WorkEnvironment = {
  id: string;
  name: string;
  region: string;
  color: string;
};

export type PaymentMethod = "bank" | "cash" | "both";

export type PaymentInstallment = {
  percentage: number;
  description: string;
  dueType: "upfront" | "start" | "during" | "completion";
};

export type WorkAgreementStatus = 
  | "draft"      // Concept
  | "sent"       // Verstuurd
  | "in_review"  // In revisie
  | "signed"     // Ondertekend
  | "rejected"   // Geweigerd
  | "expired"    // Verlopen
  | "completed"
  | "cancelled";

export type WorkAgreement = {
  id: string;
  quoteId: string;
  leadId: string;
  totalAmount: number;
  description: string;
  status: WorkAgreementStatus;
  workDescription: string;
  warranty: string;
  startDate: string;
  companySignature: string;
  customerSignature?: string;
  createdAt: string;
  updatedAt: string;
  lineItems: QuoteLineItem[];
  location?: string;
  notes?: string;
  exclusions?: string[];
  provisions?: string[];
  cashPaymentAmount?: number;
  paymentInstallments?: PaymentInstallment[];
  paymentMethod?: PaymentMethod;
  attachments?: File[];
  defaultAttachments?: { name: string; url: string }[];
};
