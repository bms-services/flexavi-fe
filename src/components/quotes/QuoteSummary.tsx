
import React from "react";
import { DiscountSection } from "./line-items/DiscountSection";
import { QuoteLineItem } from "@/types";
import { formatCurrency } from "@/utils/format";

interface QuoteSummaryProps {
  subtotal: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  onDiscountTypeChange: (type: "percentage" | "fixed") => void;
  onDiscountValueChange: (value: number) => void;
  lineItems?: QuoteLineItem[];
}

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({
  subtotal,
  discountType,
  discountValue,
  onDiscountTypeChange,
  onDiscountValueChange,
  lineItems = [],
}) => {
  // Calculate discount
  const calculateDiscount = () => {
    if (discountType === "percentage") {
      return (subtotal * discountValue) / 100;
    }
    return discountValue;
  };

  const discountAmount = calculateDiscount();
  const subtotalAfterDiscount = subtotal - discountAmount;

  // Calculate VAT amounts per rate and group by rate
  const vatAmounts = new Map<number, number>();
  lineItems.forEach(item => {
    const vatRate = item.vatRate ?? 21; // Default to 21% if not specified
    const itemTotalAfterDiscount = item.total * (1 - discountAmount / subtotal);
    const currentAmount = vatAmounts.get(vatRate) || 0;
    vatAmounts.set(vatRate, currentAmount + (itemTotalAfterDiscount * vatRate) / 100);
  });

  // Calculate total including VAT
  const totalVat = Array.from(vatAmounts.values()).reduce((sum, amount) => sum + amount, 0);
  const total = subtotalAfterDiscount + totalVat;

  return (
    <div className="flex justify-end mt-6 pt-4 border-t">
      <div className="w-64">
        {/* Subtotal */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700">Subtotaal:</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>

        {/* Discount Section when editing */}
        {(onDiscountTypeChange !== undefined && onDiscountValueChange !== undefined) && (
          <DiscountSection
            subtotal={subtotal}
            discountType={discountType}
            discountValue={discountValue}
            onDiscountTypeChange={onDiscountTypeChange}
            onDiscountValueChange={onDiscountValueChange}
            className="mb-2"
          />
        )}

        {/* Show discount amount if there is one */}
        {discountAmount > 0 && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-700">Korting:</span>
            <span className="text-red-600">-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        {/* VAT rates */}
        <div className="border-t border-gray-200 my-3" />
        
        {Array.from(vatAmounts.entries())
          .sort(([rateA], [rateB]) => rateA - rateB)
          .map(([rate, amount]) => (
            <div key={rate} className="flex justify-between items-center mb-2">
              <span className="text-gray-700">{rate}% BTW:</span>
              <span className="font-medium">{formatCurrency(amount)}</span>
            </div>
          ))}

        {/* Total including VAT */}
        <div className="border-t border-gray-300 mt-3 pt-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Totaal incl. BTW:</span>
            <span className="font-bold text-primary">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
