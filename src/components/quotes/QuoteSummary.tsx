import React from "react";
import { DiscountSection } from "./line-items/DiscountSection";
import { formatEuro } from "@/utils/format";
import { useFormContext, useWatch } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";

interface QuoteSummaryProps {
  discountType: "percentage" | "fixed";
  discountValue: number;
  onDiscountTypeChange: (type: "percentage" | "fixed") => void;
  onDiscountValueChange: (value: number) => void;
}

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({
  discountType,
  discountValue,
  onDiscountTypeChange,
  onDiscountValueChange,
}) => {
  const { control } = useFormContext<QuotationReq>();
  const items = useWatch({ control, name: "items" }) || [];

  // Calculate subtotal live from form
  const subtotal = items.reduce((sum, item) => {
    const quantity = item.quantity || 0;
    const unitPrice = item.unit_price || 0;
    return sum + quantity * unitPrice;
  }, 0);

  // Calculate discount
  const discountAmount = discountType === "percentage"
    ? (subtotal * discountValue) / 100
    : discountValue;

  const subtotalAfterDiscount = subtotal - discountAmount;

  // Calculate VAT amounts by VAT rate
  const vatAmounts = new Map<number, number>();
  items.forEach(item => {
    const quantity = item.quantity || 0;
    const unitPrice = item.unit_price || 0;
    const vatRate = item.vat_amount || 0;
    const lineTotal = quantity * unitPrice;

    const discountedLineTotal = subtotal > 0
      ? lineTotal * ((subtotalAfterDiscount) / subtotal)
      : lineTotal;

    const vatForLine = discountedLineTotal * (vatRate / 100);
    vatAmounts.set(vatRate, (vatAmounts.get(vatRate) || 0) + vatForLine);
  });

  const totalVat = Array.from(vatAmounts.values()).reduce((sum, vat) => sum + vat, 0);
  const total = subtotalAfterDiscount + totalVat;

  return (
    <div className="flex justify-end mt-6 pt-4 border-t">
      <div className="w-64">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700">Subtotaal:</span>
          <span className="font-medium">{formatEuro(subtotal)}</span>
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
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-700">Korting:</span>
            <span className="text-red-600">-{formatEuro(discountAmount)}</span>
          </div>
        )}

        <div className="border-t border-gray-200 my-3" />

        {Array.from(vatAmounts.entries())
          .sort(([rateA], [rateB]) => rateA - rateB)
          .map(([rate, amount]) => (
            <div key={rate} className="flex justify-between items-center mb-2">
              <span className="text-gray-700">{rate}% BTW:</span>
              <span className="font-medium">{formatEuro(amount)}</span>
            </div>
          ))}

        <div className="border-t border-gray-300 mt-3 pt-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Totaal incl. BTW:</span>
            <span className="font-bold text-primary">{formatEuro(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};