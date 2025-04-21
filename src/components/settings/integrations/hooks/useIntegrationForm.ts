
import { useForm } from "react-hook-form";
import { Integration } from "@/types";

export const useIntegrationForm = (integration: Integration | null) => {
  const form = useForm<Integration>({
    defaultValues: integration || {
      id: crypto.randomUUID(),
      name: "",
      platformType: "generic_webhook",
      status: "inactive",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  return form;
};
