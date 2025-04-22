
export type SupportTicketStatus = 
  | 'open'
  | 'in-progress'
  | 'waiting-for-customer'
  | 'waiting-for-staff'
  | 'resolved'
  | 'closed';

export type SupportTicketPriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export type SupportTicketCategory = 
  | 'technical'
  | 'billing'
  | 'feature-request'
  | 'account'
  | 'general';

export interface SupportTicketMessage {
  id: string;
  ticketId: string;
  content: string;
  attachments?: string[];
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'customer' | 'staff' | 'admin';
  };
  isInternal?: boolean;
}

export interface SupportTicket {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  category: SupportTicketCategory;
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  lastReplyAt?: string;
  lastReplyBy?: string;
  messages: SupportTicketMessage[];
  tags?: string[];
  metadata?: Record<string, any>;
}
