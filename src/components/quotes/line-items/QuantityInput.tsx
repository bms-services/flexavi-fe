
import React from "react";
import { Input } from "@/components/ui/input";

interface QuantityInputProps {
  value: number;
  onChange: (value: string) => void;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({ value, onChange }) => {
  return (
    <Input 
      type="number" 
      min="0" 
      step="0.01"
      value={value.toString()}
      onChange={(e) => onChange(e.target.value)}
      className="text-center"
    />
  );
};
