
import React from "react";
import { 
  mockInvoices, 
  mockQuotes, 
  mockLeads, 
  mockProducts,
  mockProjects,
  mockReviews,
  mockEmployees
} from "@/data/mockData";
import { 
  calculateQuoteMetrics,
  calculateLeadMetrics,
  calculateInvoiceMetrics,
  generateTimeData
} from "@/utils/dashboardCalculations";
import { SalesMetrics } from "./sections/SalesMetrics";
import { ProductMetrics } from "./sections/ProductMetrics";
import { ConversionMetrics } from "./sections/ConversionMetrics";

interface ShopifyStyleDashboardProps {
  timeRange: string;
}

export const ShopifyStyleDashboard: React.FC<ShopifyStyleDashboardProps> = ({ timeRange }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const { totalInvoiceAmount } = calculateInvoiceMetrics(mockInvoices);
  const { totalLeads } = calculateLeadMetrics(mockLeads);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SalesMetrics totalAmount={totalInvoiceAmount} formatCurrency={formatCurrency} />
      <ConversionMetrics leads={mockLeads} quotes={mockQuotes} />
      <ProductMetrics products={mockProducts} />
    </div>
  );
};
