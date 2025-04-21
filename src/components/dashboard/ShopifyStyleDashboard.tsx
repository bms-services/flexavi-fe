
import React from "react";
import { 
  mockInvoices, 
  mockQuotes, 
  mockLeads, 
  mockProducts,
  mockProjects,
  mockReviews,
  mockEmployees,
  mockWorkAgreements
} from "@/data/mockData";
import { 
  calculateQuoteMetrics,
  calculateLeadMetrics,
  calculateInvoiceMetrics,
} from "@/utils/dashboardCalculations";
import { SalesMetrics } from "./sections/SalesMetrics";
import { QuoteMetrics } from "./sections/QuoteMetrics";
import { ConversionMetrics } from "./sections/ConversionMetrics";
import { ProductMetrics } from "./sections/ProductMetrics";
import { ReviewsMetrics } from "./sections/ReviewsMetrics";
import { EmployeeMetrics } from "./sections/EmployeeMetrics";
import { WorkAgreementMetrics } from "./sections/WorkAgreementMetrics";
import { useIsMobile } from "@/hooks/use-mobile";

interface ShopifyStyleDashboardProps {
  timeRange: string;
}

export const ShopifyStyleDashboard: React.FC<ShopifyStyleDashboardProps> = ({ timeRange }) => {
  const isMobile = useIsMobile();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const { totalInvoiceAmount } = calculateInvoiceMetrics(mockInvoices);
  const { totalQuoteAmount } = calculateQuoteMetrics(mockQuotes);

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Top row - Summary metrics */}
      <div className="grid grid-cols-1 gap-4">
        <SalesMetrics totalAmount={totalInvoiceAmount} formatCurrency={formatCurrency} />
        <QuoteMetrics totalQuoteAmount={totalQuoteAmount} formatCurrency={formatCurrency} />
        <ConversionMetrics leads={mockLeads} quotes={mockQuotes} />
      </div>

      {/* Second row - Detailed metrics */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        <WorkAgreementMetrics workAgreements={mockWorkAgreements} />
        <ProductMetrics products={mockProducts} />
        <EmployeeMetrics employees={mockEmployees} />
      </div>
    </div>
  );
};
