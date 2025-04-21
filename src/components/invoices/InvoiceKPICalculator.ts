
import { Invoice } from "@/types";

export const calculateInvoiceKPIs = (filteredInvoices: Invoice[]) => {
  const kpiTotal = filteredInvoices.reduce((sum, q) => sum + q.amount, 0);
  const kpiPaid = filteredInvoices.filter(q => q.status === "paid").reduce((sum, q) => sum + q.amount, 0);
  const kpiOutstanding = filteredInvoices
    .filter(q => ["sent", "overdue", "collection", "legal"].includes(q.status))
    .reduce((sum, q) => sum + q.amount, 0);

  return {
    total: kpiTotal,
    paid: kpiPaid,
    outstanding: kpiOutstanding,
  };
};
