
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

  // Calculate VAT amounts per rate
  const vatAmounts = new Map<number, number>();
  lineItems.forEach(item => {
    const vatRate = item.vatRate ?? 21;
    const itemTotal = item.total;
    const currentAmount = vatAmounts.get(vatRate) || 0;
    vatAmounts.set(vatRate, currentAmount + (itemTotal * vatRate) / 100);
  });

  // Calculate total including VAT
  const totalVat = Array.from(vatAmounts.values()).reduce((sum, amount) => sum + amount, 0);
  const total = subtotalAfterDiscount + totalVat;

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

          {discountAmount > 0 && (
            <div className="flex justify-between text-sm text-red-600">
              <span>Korting</span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>
          )}

          {/* Show each VAT rate separately */}
          {Array.from(vatAmounts.entries())
            .sort(([rateA], [rateB]) => rateA - rateB)
            .map(([rate, amount]) => (
              <div key={rate} className="flex justify-between text-sm">
                <span>BTW {rate}%</span>
                <span>{formatCurrency(amount)}</span>
              </div>
            ))
          }

          <div className="flex justify-between font-medium border-t pt-2">
            <span>Totaal (incl. BTW)</span>
            <span className="text-lg font-bold">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
