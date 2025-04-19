
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UnitSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const UnitSelect: React.FC<UnitSelectProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Eenheid" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="stuk">Stuk</SelectItem>
        <SelectItem value="m²">m²</SelectItem>
        <SelectItem value="m³">m³</SelectItem>
        <SelectItem value="meter">meter</SelectItem>
        <SelectItem value="uur">Uur</SelectItem>
        <SelectItem value="dag">Dag</SelectItem>
        <SelectItem value="set">Set</SelectItem>
      </SelectContent>
    </Select>
  );
};
