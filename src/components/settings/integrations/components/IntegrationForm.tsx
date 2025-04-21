
import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Integration } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { NameField } from "./NameField";
import { PlatformTypeField } from "./PlatformTypeField";
import { WebhookUrlField } from "./WebhookUrlField";
import { StatusField } from "./StatusField";

interface IntegrationFormProps {
  form: UseFormReturn<Integration>;
  onSubmit: (data: Integration) => void;
  onClose: () => void;
  integration: Integration | null;
}

export const IntegrationForm: React.FC<IntegrationFormProps> = ({
  form,
  onSubmit,
  onClose,
  integration,
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <NameField form={form} />
        <PlatformTypeField form={form} />
        <WebhookUrlField form={form} />
        <StatusField form={form} />
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuleren
          </Button>
          <Button type="submit">
            {integration ? "Opslaan" : "Toevoegen"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
