
import React from "react";
import { DiscountSection } from "./line-items/DiscountSection";

interface QuoteSummaryProps {
  subtotal: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  onDiscountTypeChange: (type: "percentage" | "fixed") => void;
  onDiscountValueChange: (value: number) => void;
}

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({
  subtotal,
  discountType,
  discountValue,
  onDiscountTypeChange,
  onDiscountValueChange,
}) => {
  return (
    <div className="flex justify-end mt-6 pt-4 border-t">
      <div className="w-64">
        <DiscountSection
          subtotal={subtotal}
          discountType={discountType}
          discountValue={discountValue}
          onDiscountTypeChange={onDiscountTypeChange}
          onDiscountValueChange={onDiscountValueChange}
        />
      </div>
    </div>
  );
};
