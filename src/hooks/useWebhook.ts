
import { useState } from "react";
import { toast } from "sonner";

export const useWebhook = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validateWebhookUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const testWebhook = async (webhookUrl: string): Promise<boolean> => {
    if (!validateWebhookUrl(webhookUrl)) {
      toast.error("Webhook URL moet beginnen met https://");
      return false;
    }

    setIsLoading(true);
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "test",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Webhook test mislukt");
      }

      toast.success("Webhook test succesvol");
      return true;
    } catch (error) {
      toast.error("Webhook test mislukt. Controleer de URL en probeer opnieuw.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    validateWebhookUrl,
    testWebhook,
  };
};
