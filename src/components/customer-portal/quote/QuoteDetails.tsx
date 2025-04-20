
import React from "react";
import { CustomerInfoCard } from "./customer/CustomerInfoCard";
import { QuoteDatesInfo } from "./details/QuoteDatesInfo";

interface QuoteDetailsProps {
  customer: {
    name: string;
    address: string;
  };
  quote: {
    createdAt: string;
    plannedStartDate?: string;
  };
  formatCurrency: (amount: number) => string;
}

export const QuoteDetails = ({ customer, quote, formatCurrency }: QuoteDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CustomerInfoCard customer={customer} />
      <QuoteDatesInfo quote={quote} />
    </div>
  );
};
