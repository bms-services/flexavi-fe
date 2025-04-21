
import React from "react";
import { mockLeads, mockQuotes, mockInvoices, mockWorkAgreements, mockProjects } from "@/data/mockData";
import { QuoteStats } from "./stats/QuoteStats";
import { WorkAgreementStats } from "./stats/WorkAgreementStats";
import { InvoiceStats } from "./stats/InvoiceStats";
import { ProjectStats } from "./stats/ProjectStats";

interface DashboardStatsProps {
  timeRange: string;
}

// This component is now hidden as we're using the ShopifyStyleDashboard instead
export const DashboardStats: React.FC<DashboardStatsProps> = ({ timeRange }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Return null to hide this component, as we're using ShopifyStyleDashboard instead
  return null;
};
