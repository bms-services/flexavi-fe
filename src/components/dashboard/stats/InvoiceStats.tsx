
import React from "react";
import { StatCard } from "./StatCard";
import { FileCheck } from "lucide-react";
import { Invoice } from "@/types";

interface InvoiceStatsProps {
  invoices: Invoice[];
  formatCurrency: (amount: number) => string;
}

export const InvoiceStats: React.FC<InvoiceStatsProps> = ({ invoices, formatCurrency }) => {
  const unpaidInvoices = invoices.filter(i => i.status === "sent" || i.status === "overdue").length;
  const totalRevenue = invoices
    .filter(i => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <StatCard
      title="Facturen"
      value={formatCurrency(totalRevenue)}
      description={`${unpaidInvoices} openstaand`}
      icon={<FileCheck className="h-4 w-4" />}
    />
  );
};
