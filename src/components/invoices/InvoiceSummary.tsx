
import React from "react";

interface InvoiceSummaryProps {
  subtotal: number;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ subtotal }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="border-t mt-6 pt-4">
      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotaal (excl. BTW)</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between font-medium border-t pt-2">
            <span>Totaal</span>
            <span className="text-lg">{formatCurrency(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
