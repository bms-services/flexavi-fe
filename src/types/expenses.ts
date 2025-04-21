
import { Project } from "./project";
import { Invoice } from "./invoices";

export type ExpenseType = 'material' | 'transport' | 'equipment' | 'subcontractor' | 'other';
export type ExpenseStatus = 'draft' | 'approved' | 'rejected' | 'pending' | 'processed';

export interface Expense {
  id: string;
  receiptId?: string;
  receiptUrl?: string;
  company: string;
  description: string;
  amount: number;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  date: string;
  type: ExpenseType;
  status: ExpenseStatus;
  projectId?: string;
  invoiceId?: string;
  project?: Project;
  invoice?: Invoice;
  tags?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  processedBy?: string;
  processedAt?: string;
}

export interface ExpenseFilters {
  status?: ExpenseStatus;
  type?: ExpenseType;
  dateRange?: [Date | null, Date | null];
  projectId?: string;
  invoiceId?: string;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
}
