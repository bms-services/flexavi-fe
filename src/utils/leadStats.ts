
import { Quote, Invoice, QuoteStatus, InvoiceStatus } from "@/types";
import { mockQuotes } from "@/data/mockQuotes";
import { mockInvoices } from "@/data/mockInvoices";

export const getLeadStats = (leadId: string) => {
  const leadQuotes = mockQuotes.filter(quote => quote.leadId === leadId);
  const leadInvoices = mockInvoices.filter(invoice => invoice.leadId === leadId);

  const latestQuote = leadQuotes.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  const latestInvoice = leadInvoices.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  const paidInvoices = leadInvoices.filter(invoice => invoice.status === 'paid');
  const pendingInvoices = leadInvoices.filter(invoice => 
    ['sent', 'overdue'].includes(invoice.status)
  );

  return {
    quotesValue: leadQuotes.reduce((sum, quote) => sum + quote.amount, 0),
    invoicesValue: paidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0),
    pendingValue: pendingInvoices.reduce((sum, invoice) => sum + invoice.amount, 0),
    latestQuoteStatus: latestQuote?.status as QuoteStatus | undefined,
    latestInvoiceStatus: latestInvoice?.status as InvoiceStatus | undefined,
  };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};
