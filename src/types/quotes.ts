
export type QuoteLineItem = {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  total: number;
  vatRate?: number;
  detailedDescription?: string;
};

export type DiscountType = "percentage" | "fixed";

export interface Discount {
  type: DiscountType;
  value: number;
}

export type Quote = {
  id: string;
  leadId: string;
  amount: number;
  description: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
  location?: string;
  plannedStartDate?: string;
  notes?: string;
  lineItems: QuoteLineItem[];
  discount?: Discount;
};

export type QuoteStatus = 
  | "draft" 
  | "sent" 
  | "accepted" 
  | "rejected" 
  | "revised";
