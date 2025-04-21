
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
  lineItems: QuoteLineItem[];
  location?: string;
  notes?: string;
  paymentDate?: string;
  customerSignature?: string;
  discount?: Discount;
};

export type InvoiceStatus = 
  | "draft" 
  | "sent" 
  | "paid" 
  | "overdue" 
  | "canceled"
  | "collection"
  | "legal";
