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

  // Subtotal (before tax)
  const subtotal = items.reduce((sum, item) => {
    const quantity = item.quantity || 0;
    const unitPrice = item.unit_price || 0;
    return sum + (quantity * unitPrice);
  }, 0);

  // Calculate VAT amounts per rate (before any discount)
  const vatGrouped = new Map<number, number>();
  items.forEach(item => {
    const quantity = item.quantity || 0;
    const unitPrice = item.unit_price || 0;
    const vatRate = item.vat_amount || 0;
    const lineTotal = quantity * unitPrice;
    const vatAmount = (lineTotal * vatRate) / 100;

    vatGrouped.set(vatRate, (vatGrouped.get(vatRate) || 0) + vatAmount);
  });

  const totalVAT = Array.from(vatGrouped.values()).reduce((sum, vat) => sum + vat, 0);
  const totalWithTax = subtotal + totalVAT;

  // Calculate discount (applied after tax)
  const discountAmount = discountType === "percentage"
    ? (totalWithTax * discountValue) / 100
    : discountValue;

  const grandTotal = totalWithTax - discountAmount;

  return (
    <div className="flex justify-end mt-6 pt-4 border-t">
      <div className="w-64">

        <div className="flex justify-between mb-3">
          <span>Subtotal (excl. BTW):</span>
          <span>{formatEuro(subtotal)}</span>
        </div>

        <div className="border-t border-gray-200 my-3" />

        {Array.from(vatGrouped.entries())
          .sort(([a], [b]) => a - b)
          .map(([rate, amount]) => (
            <div key={rate} className="flex justify-between mb-2">
              <span>BTW {rate}%:</span>
              <span>{formatEuro(amount)}</span>
            </div>
          ))}

        <div className="flex justify-between font-medium mb-3">
          <span>Totaal incl. BTW:</span>
          <span>{formatEuro(totalWithTax)}</span>
        </div>

        <div className="border-t border-gray-200 my-3" />

        <DiscountSection
          subtotal={totalWithTax}
          discountType={discountType}
          discountValue={discountValue}
          onDiscountTypeChange={onDiscountTypeChange}
          onDiscountValueChange={onDiscountValueChange}
          className="mb-2"
        />

        <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
          <span>Grand Total:</span>
          <span className="text-primary">{formatEuro(grandTotal)}</span>
        </div>

      </div>
    </div>
  );
};