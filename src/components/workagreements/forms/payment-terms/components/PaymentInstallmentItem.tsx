
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { WorkAgreementDueTypeMap } from "@/zustand/types/workAgreementT";

interface PaymentInstallmentItemProps {
  installment: {
    percentage: number;
    description: string;
    dueType: "upfront" | "start" | "during" | "completion";
  };
  onRemove: () => void;
  onChange: (field: string, value: string | number) => void;
  disabled?: boolean;
  amount: number;
}

export const PaymentInstallmentItem: React.FC<PaymentInstallmentItemProps> = ({
  installment,
  onRemove,
  onChange,
  disabled = false,
  amount
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  return (
    <div className="grid grid-cols-12 gap-2 items-start py-2 border-b last:border-0">
      <div className="col-span-5">
        <Input
          value={installment.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Omschrijving"
          disabled={disabled}
        />
      </div>
      <div className="col-span-3">
        <Select
          value={installment.dueType}
          onValueChange={(value) => onChange("dueType", value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(WorkAgreementDueTypeMap).map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2">
        <Input
          type="number"
          value={installment.percentage}
          onChange={(e) => onChange("percentage", e.target.value)}
          placeholder="%"
          disabled={disabled}
        />
      </div>
      <div className="col-span-2 flex items-center gap-2">
        <span className="text-sm font-medium">{formatCurrency(amount)}</span>
        {!disabled && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
