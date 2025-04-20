
import React from "react";
import { Input } from "@/components/ui/input";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({ 
  value, 
  onChange,
  disabled = false 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseFloat(e.target.value);
    onChange(isNaN(quantity) ? 0 : quantity);
  };

  return (
    <Input
      type="number"
      step="0.01"
      value={value || ''}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};
