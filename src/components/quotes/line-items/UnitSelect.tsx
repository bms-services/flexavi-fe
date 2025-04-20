
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface UnitSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const UnitSelect: React.FC<UnitSelectProps> = ({ 
  value, 
  onChange,
  disabled = false 
}) => {
  const units = [
    { value: "stuk", label: "Stuk" },
    { value: "m", label: "Meter" },
    { value: "m2", label: "Vierkante meter" },
    { value: "m3", label: "Kubieke meter" },
    { value: "uur", label: "Uur" },
    { value: "dag", label: "Dag" },
    { value: "set", label: "Set" },
    { value: "rol", label: "Rol" }
  ];

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder="Eenheid" />
      </SelectTrigger>
      <SelectContent>
        {units.map((unit) => (
          <SelectItem key={unit.value} value={unit.value}>
            {unit.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
