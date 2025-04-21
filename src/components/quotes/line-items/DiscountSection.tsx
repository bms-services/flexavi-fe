
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Euro, Percent } from "lucide-react";

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
      <div className="flex items-center justify-end gap-2 text-sm">
        <span className="text-muted-foreground">Subtotaal:</span>
        <span className="font-medium">
          {new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(subtotal)}
        </span>
      </div>
      
      <div className="flex items-center justify-end gap-2">
        <span className="text-sm text-muted-foreground">Korting:</span>
        <div className="flex gap-2 items-center">
          <Select value={discountType} onValueChange={onDiscountTypeChange}>
            <SelectTrigger className="w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="fixed">Vast bedrag</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Input
              type="number"
              value={discountValue || ""}
              onChange={(e) => onDiscountValueChange(parseFloat(e.target.value) || 0)}
              className="w-[100px] pr-8"
              min={0}
              max={discountType === "percentage" ? 100 : undefined}
              step={discountType === "percentage" ? 1 : 0.01}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {discountType === "percentage" ? (
                <Percent className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Euro className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </div>

      {discountValue > 0 && (
        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-muted-foreground">Korting bedrag:</span>
          <span className="font-medium text-red-600">
            -{new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(discount)}
          </span>
        </div>
      )}

      <div className="flex items-center justify-end gap-2 text-base border-t pt-2 mt-2">
        <span className="font-medium">Totaal:</span>
        <span className="font-bold">
          {new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(finalTotal)}
        </span>
      </div>
    </div>
  );
};
