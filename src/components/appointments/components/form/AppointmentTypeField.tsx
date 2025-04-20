
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AppointmentType = "quote" | "assignment" | "warranty" | "payment";

interface AppointmentTypeFieldProps {
  value: AppointmentType;
  onChange: (value: AppointmentType) => void;
}

export const AppointmentTypeField: React.FC<AppointmentTypeFieldProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Type afspraak</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="quote">Offerte opstellen</SelectItem>
          <SelectItem value="assignment">Opdracht maken</SelectItem>
          <SelectItem value="warranty">Garantie maken</SelectItem>
          <SelectItem value="payment">Geld ophalen</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
