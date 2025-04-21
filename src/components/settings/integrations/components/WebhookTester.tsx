
import React from "react";
import { Button } from "@/components/ui/button";
import { useWebhook } from "@/hooks/useWebhook";
import { Loader2 } from "lucide-react";

interface WebhookTesterProps {
  webhookUrl: string;
}

export const WebhookTester: React.FC<WebhookTesterProps> = ({ webhookUrl }) => {
  const { isLoading, testWebhook } = useWebhook();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={isLoading || !webhookUrl}
      onClick={() => testWebhook(webhookUrl)}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Testen...
        </>
      ) : (
        "Test Webhook"
      )}
    </Button>
  );
};
