
import { Lead, Quote, Invoice, Product } from "@/types";

export const calculateQuoteMetrics = (quotes: Quote[]) => {
  const totalQuotes = quotes.length;
  const acceptedQuotes = quotes.filter(q => q.status === "accepted").length;
  const quoteConversionRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0;
  
  return { totalQuotes, acceptedQuotes, quoteConversionRate };
};

export const calculateLeadMetrics = (leads: Lead[]) => {
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(l => l.status === "satisfied").length;
  const leadConversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
  
  return { totalLeads, convertedLeads, leadConversionRate };
};

export const calculateInvoiceMetrics = (invoices: Invoice[]) => {
  const totalInvoiceAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === "paid");
  const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  
  return { totalInvoiceAmount, paidInvoices, paidAmount };
};

export const generateTimeData = (count: number, max: number) => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    today: i < 12 ? Math.random() * max : Math.random() * max * 0.7,
    yesterday: Math.random() * max * 0.9
  }));
};

export const getTopProducts = (products: Product[]) => {
  return products
    .sort((a, b) => b.pricePerUnit - a.pricePerUnit)
    .slice(0, 4)
    .map(product => ({
      name: product.title,
      count: Math.floor(Math.random() * 100) + 1,
      change: Math.floor(Math.random() * 30) + 1
    }));
};

