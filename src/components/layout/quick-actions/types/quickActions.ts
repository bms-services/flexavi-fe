
import { LucideIcon } from 'lucide-react';

export interface QuickAction {
  icon: LucideIcon;
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface ReceiptData {
  company: string;
  description: string;
  subtotal: string;
  vat: string;
  vatPaid: string;
  total: string;
  project: string;
}
