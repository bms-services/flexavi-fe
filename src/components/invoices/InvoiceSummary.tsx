
import React from "react";

interface InvoiceSummaryProps {
  subtotal: number;
  vatRate?: number;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ 
  subtotal,
  vatRate = 21
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const vatAmount = (subtotal * vatRate) / 100;
  const total = subtotal + vatAmount;

  return (
    <div className="border-t mt-6 pt-4">
      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotaal (excl. BTW)</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
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
