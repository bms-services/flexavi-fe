
import React from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Integration } from "@/types";

interface NameFieldProps {
  form: UseFormReturn<Integration>;
}

export const NameField: React.FC<NameFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Naam</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Voer een naam in" />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
