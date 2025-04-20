
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CashPaymentInputProps {
  value: number;
  onChange: (amount: number) => void;
  disabled?: boolean;
}

export const CashPaymentInput: React.FC<CashPaymentInputProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    onChange(isNaN(amount) ? 0 : amount);
  };

  return (
    <div>
      <Label>Contant te betalen bij oplevering (€)</Label>
      <Input
        type="number"
        value={value || ''}
        onChange={handleChange}
        placeholder="Bedrag"
        disabled={disabled}
      />
    </div>
  );
};
