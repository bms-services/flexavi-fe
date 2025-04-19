
import { LeadDetail } from "@/types";
import { mockLeads } from "./mockLeads";
import { mockAppointments } from "./mockAppointments";
import { mockQuotes } from "./mockQuotes";
import { mockInvoices } from "./mockInvoices";

export const getLeadDetail = (id: string): LeadDetail | undefined => {
  const lead = mockLeads.find(lead => lead.id === id);
  
  if (!lead) return undefined;
  
  return {
    ...lead,
    notes: [], // Initialize with empty notes array as required by LeadDetail type
    appointments: mockAppointments.filter(app => app.leadId === id),
    quotes: mockQuotes.filter(quote => quote.leadId === id),
    invoices: mockInvoices.filter(invoice => invoice.leadId === id),
  };
};
