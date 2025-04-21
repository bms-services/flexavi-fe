
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* First column */}
      <div className="grid grid-cols-1 gap-4">
        <SalesMetrics totalAmount={totalInvoiceAmount} formatCurrency={formatCurrency} />
        <QuoteMetrics totalQuoteAmount={totalQuoteAmount} formatCurrency={formatCurrency} />
        <ConversionMetrics leads={mockLeads} quotes={mockQuotes} />
      </div>

      {/* Second column */}
      <div className="grid grid-cols-1 gap-4">
        <WorkAgreementMetrics workAgreements={mockWorkAgreements} />
        <ProductMetrics products={mockProducts} />
        <ReviewsMetrics reviews={mockReviews} />
      </div>

      {/* Third column */}
      <div className="grid grid-cols-1 gap-4">
        <EmployeeMetrics employees={mockEmployees} />
        <ProductMetrics products={mockProducts.slice(0, 3)} />
        <WorkAgreementMetrics workAgreements={mockWorkAgreements.slice(0, 3)} />
      </div>
    </div>
  );
};
