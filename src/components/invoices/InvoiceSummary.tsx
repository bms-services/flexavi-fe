
import React from "react";
import { DiscountSection } from "../quotes/line-items/DiscountSection";

interface InvoiceSummaryProps {
  subtotal: number;
  vatRate?: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  onDiscountTypeChange: (type: "percentage" | "fixed") => void;
  onDiscountValueChange: (value: number) => void;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ 
  subtotal,
  vatRate = 21,
  discountType,
  discountValue,
  onDiscountTypeChange,
  onDiscountValueChange
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  // Calculate discount
  const calculateDiscount = () => {
    if (discountType === "percentage") {
      return (subtotal * discountValue) / 100;
    }
    return discountValue;
  };

  const discountAmount = calculateDiscount();
  const subtotalAfterDiscount = subtotal - discountAmount;
  const vatAmount = (subtotalAfterDiscount * vatRate) / 100;
  const total = subtotalAfterDiscount + vatAmount;

  return (
    <div className="border-t mt-6 pt-4">
      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotaal (excl. BTW)</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          
          <DiscountSection
            subtotal={subtotal}
            discountType={discountType}
            discountValue={discountValue}
            onDiscountTypeChange={onDiscountTypeChange}
            onDiscountValueChange={onDiscountValueChange}
            className="mb-2"
          />
          
          <div className="flex justify-between text-sm">
            <span>BTW ({vatRate}%)</span>
            <span>{formatCurrency(vatAmount)}</span>
          </div>
          <div className="flex justify-between font-medium border-t pt-2">
            <span>Totaal</span>
            <span className="text-lg font-bold">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
