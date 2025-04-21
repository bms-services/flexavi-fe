
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
import { ProjectMetrics } from "./sections/ProjectMetrics";
import { ReviewsMetrics } from "./sections/ReviewsMetrics";
import { EmployeeMetrics } from "./sections/EmployeeMetrics";

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

  const { totalInvoiceAmount, paidAmount } = calculateInvoiceMetrics(mockInvoices);
  const { totalLeads, convertedLeads, leadConversionRate } = calculateLeadMetrics(mockLeads);
  const { quoteConversionRate } = calculateQuoteMetrics(mockQuotes);

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Top row - Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SalesMetrics totalAmount={totalInvoiceAmount} formatCurrency={formatCurrency} />
        <ConversionMetrics leads={mockLeads} quotes={mockQuotes} />
        <ProductMetrics products={mockProducts} />
      </div>

      {/* Second row - Detailed metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <ProjectMetrics projects={mockProjects} formatCurrency={formatCurrency} />
        <ReviewsMetrics reviews={mockReviews} />
        <EmployeeMetrics employees={mockEmployees} />
      </div>
    </div>
  );
};
