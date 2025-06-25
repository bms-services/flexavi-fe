import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Euro, Percent } from "lucide-react";
import CurrencyInput from "react-currency-input-field";

interface DiscountSectionProps {
  subtotal: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  onDiscountTypeChange: (type: "percentage" | "fixed") => void;
  onDiscountValueChange: (value: number) => void;
  className?: string;
}

export const DiscountSection: React.FC<DiscountSectionProps> = ({
  subtotal,
  discountType,
  discountValue,
  onDiscountTypeChange,
  onDiscountValueChange,
  className = "",
}) => {
  const calculateDiscount = () => {
    if (discountType === "percentage") {
      return (subtotal * discountValue) / 100;
    }
    return discountValue;
  };

  const discount = calculateDiscount();
  const finalTotal = subtotal - discount;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-end gap-2">
        <div className="flex gap-2 items-center">
          <Select value={discountType} onValueChange={onDiscountTypeChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="fixed">Vast bedrag</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-[120px]">
            <CurrencyInput
              value={discountValue}
              onValueChange={(value) => onDiscountValueChange(parseFloat(value || "0"))}
              decimalsLimit={2}
              decimalSeparator=","
              groupSeparator="."
              allowNegativeValue={false}
              suffix={discountType === "percentage" ? " %" : ""}
              prefix={discountType === "fixed" ? "€ " : ""}
              className="w-full text-right border rounded px-2 py-1"
            />
            {/* <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
              {discountType === "percentage" ? (
                <Percent className="h-4 w-4" />
              ) : (
                <Euro className="h-4 w-4" />
              )}
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 text-base border-t pt-2 mt-2">
        <span className="font-medium">Totaal na korting:</span>
        <span className="font-bold">
          {new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(finalTotal)}
        </span>
      </div>
    </div>
  );
};