
import React from "react";
import { mockLeads, mockQuotes, mockInvoices, mockWorkAgreements, mockProjects } from "@/data/mockData";
import { QuoteStats } from "./stats/QuoteStats";
import { WorkAgreementStats } from "./stats/WorkAgreementStats";
import { InvoiceStats } from "./stats/InvoiceStats";
import { ProjectStats } from "./stats/ProjectStats";

interface DashboardStatsProps {
  timeRange: string;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ timeRange }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <QuoteStats quotes={mockQuotes} formatCurrency={formatCurrency} />
      <WorkAgreementStats workAgreements={mockWorkAgreements} formatCurrency={formatCurrency} />
      <InvoiceStats invoices={mockInvoices} formatCurrency={formatCurrency} />
      <ProjectStats projects={mockProjects} formatCurrency={formatCurrency} />
    </div>
  );
};
