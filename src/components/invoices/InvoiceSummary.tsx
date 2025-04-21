
import React from "react";
import { DiscountSection } from "../quotes/line-items/DiscountSection";
import { QuoteLineItem } from "@/types";
import { formatCurrency } from "@/utils/format";

interface InvoiceSummaryProps {
  subtotal: number;
  vatRate?: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  onDiscountTypeChange: (type: "percentage" | "fixed") => void;
  onDiscountValueChange: (value: number) => void;
  lineItems?: QuoteLineItem[];
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
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
    <div className="border-t mt-6 pt-5">
      <div className="flex justify-end">
        <div className="w-full max-w-sm space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700 font-medium">Subtotaal:</span>
            <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
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
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700 font-medium">Korting:</span>
              <span className="font-semibold text-red-600">-{formatCurrency(discountAmount)}</span>
            </div>
          )}

          {/* Separator before VAT */}
          <div className="border-t border-gray-200 my-3" />

          {/* Show each VAT rate separately */}
          {Array.from(vatAmounts.entries())
            .sort(([rateA], [rateB]) => rateA - rateB)
            .map(([rate, amount]) => (
              <div key={rate} className="flex justify-between items-center text-sm">
                <span className="text-gray-700 font-medium">{rate}% BTW:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(amount)}</span>
              </div>
            ))}

          {/* Total including VAT */}
          <div className="flex justify-between items-center border-t border-gray-300 pt-3 mt-3">
            <span className="text-gray-900 font-medium text-base">Totaal (incl. BTW):</span>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
