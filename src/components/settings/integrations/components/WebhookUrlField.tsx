
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Integration } from "@/types";
import { useWebhook } from "@/hooks/useWebhook";
import { WebhookTester } from "./WebhookTester";

interface WebhookUrlFieldProps {
  form: UseFormReturn<Integration>;
}

export const WebhookUrlField: React.FC<WebhookUrlFieldProps> = ({ form }) => {
  const { validateWebhookUrl } = useWebhook();
  const webhookUrl = form.watch("webhookUrl");

  return (
    <FormField
      control={form.control}
      name="webhookUrl"
      rules={{
        validate: {
          isHttps: (value) =>
            !value || validateWebhookUrl(value) || "Webhook URL moet beginnen met https://",
        },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Webhook URL</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <Input {...field} placeholder="https://" type="url" />
            </FormControl>
            <WebhookTester webhookUrl={webhookUrl || ""} />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
