import { useFormContext, useWatch } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";
import { DiscountSection } from "./line-items/DiscountSection";
import { formatEuro, formatNormalizeCurrency } from "@/utils/format";
import { useEffect } from "react";

export const QuoteSummary = () => {
  const { control, setValue } = useFormContext<QuotationReq>();

  const items = useWatch({ control, name: "items" }) || [];
  const discountType = useWatch({ control, name: "discount_type" });
  const discountValue = useWatch({ control, name: "discount_amount" });

  const subtotal = items.reduce((sum, item) => {
    const qty = formatNormalizeCurrency(item.quantity);
    const price = formatNormalizeCurrency(item.unit_price);
    return sum + qty * price;
  }, 0);

  const vatGrouped = new Map<number, number>();
  items.forEach(item => {
    const qty = formatNormalizeCurrency(item.quantity);
    const price = formatNormalizeCurrency(item.unit_price);
    const vatRate = formatNormalizeCurrency(item.vat_amount);

    const lineTotal = qty * price;
    const vatAmount = (lineTotal * vatRate) / 100;

    vatGrouped.set(vatRate, (vatGrouped.get(vatRate) || 0) + vatAmount);
  });

  const totalVAT = Array.from(vatGrouped.values())
    .reduce((s, v) => s + v, 0);
  const totalWithTax = subtotal + totalVAT;

  const normalizedDiscount = formatNormalizeCurrency(discountValue);

  const discountAmount =
    discountType === "percentage"
      ? (totalWithTax * normalizedDiscount) / 100
      : normalizedDiscount;

  const grandTotal = totalWithTax - discountAmount;

  useEffect(() => {
    setValue("subtotal", subtotal);
    setValue("total_amount", grandTotal);
  }, [subtotal, grandTotal, setValue]);

  return (
    <div className="flex justify-end mt-6 pt-4 border-t">
      <div className="w-64">
        <div className="flex justify-between mb-3">
          <span>Subtotal (excl. BTW)</span>
          <span>{formatEuro(subtotal)}</span>
        </div>

        <div className="border-t border-gray-200 my-3" />

        {[...vatGrouped.entries()]
          .sort(([a], [b]) => a - b)
          .map(([rate, amount]) => (
            <div key={rate} className="flex justify-between mb-2">
              <span>BTW {rate.toString().replace('.', ',')} %</span>
              <span>{formatEuro(amount)}</span>
            </div>
          ))}

        <div className="flex justify-between font-medium mb-3">
          <span>Totaal incl. BTW</span>
          <span>{formatEuro(totalWithTax)}</span>
        </div>

        <div className="border-t border-gray-200 my-3" />

        <DiscountSection subtotal={totalWithTax} />

        <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
          <span>Grand Total</span>
          <span className="text-primary">{formatEuro(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
};