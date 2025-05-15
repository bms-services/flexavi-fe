
import { Appointment } from './appointments';
import { Quote } from './quotes';
import { Invoice } from './invoices';
import { WorkAgreement } from './work-agreements';
import { PostalCode } from './postal-code';


export type Lead = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: LeadStatus;
  created_at?: string;
  address?: LeadAddress;
};

export type LeadAddress = {
  postal_code: PostalCode | string;
  house_number: string;
  house_number_addition: string;
  street: string;
  city: string;
  province: string;
};

export type LeadDetail = Lead & {
  notes: Note[];
  appointments: Appointment[];
  quotes: Quote[];
  invoices: Invoice[];
  workAgreements?: WorkAgreement[];
};

// case NEW = 'new';
//     case IN_PROGRESS = 'in_progress';
//     case CONVERTED = 'converted';
//     case LOST = 'lost';
//     case ARCHIVED = 'archived';
//     case FOLLOW_UP = 'follow_up';
//     case NOT_INTERESTED = 'not_interested';
//     case CONTACTED = 'contacted';
//     case QUALIFIED = 'qualified';
//     case UNQUALIFIED = 'unqualified';
//     case PENDING = 'pending';
//     case CLOSED = 'closed';
//     case ACCEPTED = 'accepted';
//     case REJECTED = 'rejected';

export type LeadStatus =
  | "new"
  | "in_progress"
  | "converted"
  | "lost"
  | "archived"
  | "follow_up"
  | "not_interested"
  | "contacted"
  | "qualified"
  | "unqualified"
  | "pending"
  | "closed"
  | "accepted"
  | "rejected";


export const leadStatusMap: Record<
  LeadStatus,
  { label: string; variant: "primary" | "secondary" | "warning" | "danger" | "success" }
> = {
  new: { label: "New", variant: "primary" },
  in_progress: { label: "In Progress", variant: "secondary" },
  converted: { label: "Converted", variant: "success" },
  lost: { label: "Lost", variant: "danger" },
  archived: { label: "Archived", variant: "secondary" },
  follow_up: { label: "Follow Up", variant: "warning" },
  not_interested: { label: "Not Interested", variant: "danger" },
  contacted: { label: "Contacted", variant: "primary" },
  qualified: { label: "Qualified", variant: "success" },
  unqualified: { label: "Unqualified", variant: "danger" },
  pending: { label: "Pending", variant: "warning" },
  closed: { label: "Closed", variant: "success" },
  accepted: { label: "Accepted", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },

};

export type Note = {
  id: string;
  leadId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
