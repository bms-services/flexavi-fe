
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { AppointmentStatus } from "@/types";

const appointmentTypes: { value: AppointmentStatus; label: string }[] = [
  { value: "new_assignment", label: "Klus" },
  { value: "warranty", label: "Garantie" },
  { value: "quote_request", label: "Offerte aanvraag" },
  { value: "extra_assignment", label: "Betaling ophalen" },
];

interface AppointmentTypeSelectionProps {
  form: UseFormReturn<any>;
}

export const AppointmentTypeSelection: React.FC<AppointmentTypeSelectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type Afspraak</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer type afspraak" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {appointmentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
