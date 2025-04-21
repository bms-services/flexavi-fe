
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Integration } from "@/types";
import { useIntegrationForm } from "./hooks/useIntegrationForm";
import { IntegrationForm } from "./components/IntegrationForm";

interface IntegrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Integration) => void;
  integration?: Integration | null;
}

export const IntegrationDialog: React.FC<IntegrationDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  integration,
}) => {
  const form = useIntegrationForm(integration || null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {integration ? "Koppeling bewerken" : "Nieuwe koppeling"}
          </DialogTitle>
        </DialogHeader>

        <IntegrationForm
          form={form}
          onSubmit={onSubmit}
          onClose={onClose}
          integration={integration || null}
        />
      </DialogContent>
    </Dialog>
  );
};
