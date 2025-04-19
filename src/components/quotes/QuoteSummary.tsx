
import React from "react";

interface QuoteSummaryProps {
  subtotal: number;
}

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({ subtotal }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="flex justify-end mt-6 pt-4 border-t">
      <div className="w-64 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotaal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>BTW (21%):</span>
          <span>{formatCurrency(subtotal * 0.21)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Totaal:</span>
          <span>{formatCurrency(subtotal * 1.21)}</span>
        </div>
      </div>
    </div>
  );
};
