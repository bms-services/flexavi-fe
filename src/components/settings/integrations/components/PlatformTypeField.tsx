
import React from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Integration } from "@/types";

interface PlatformTypeFieldProps {
  form: UseFormReturn<Integration>;
}

export const PlatformTypeField: React.FC<PlatformTypeFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="platformType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Platform Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer een platform type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="trustoo">Trustoo</SelectItem>
              <SelectItem value="generic_webhook">Generic Webhook</SelectItem>
              <SelectItem value="custom_api">Custom API</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
