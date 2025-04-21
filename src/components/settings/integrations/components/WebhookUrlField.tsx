
import React from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Integration } from "@/types";

interface WebhookUrlFieldProps {
  form: UseFormReturn<Integration>;
}

export const WebhookUrlField: React.FC<WebhookUrlFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="webhookUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Webhook URL</FormLabel>
          <FormControl>
            <Input {...field} placeholder="https://" type="url" />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
