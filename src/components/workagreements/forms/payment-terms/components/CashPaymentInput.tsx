
import React from "react";
import { Label } from "@/components/ui/label";
import CurrencyInputCore from "react-currency-input-field";

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
      <CurrencyInputCore
        value={value}
        onValueChange={(value) => onChange(parseFloat(value || "0"))}
        prefix="€ "
        decimalsLimit={2}
        decimalSeparator=","
        groupSeparator="."
        disabled={disabled}
        className={`text-center`}
      />
    </div>
  );
};
