
import React from "react";
import { Button } from "@/components/ui/button";

interface ReceiptFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  disabled?: boolean;
}

export const ReceiptFormActions: React.FC<ReceiptFormActionsProps> = ({
  onCancel,
  onSave,
  disabled = false,
}) => (
  <div className="flex justify-end gap-2 pt-2">
    <Button variant="outline" onClick={onCancel}>
      Annuleren
    </Button>
    <Button onClick={onSave} disabled={disabled}>
      Opslaan
    </Button>
  </div>
);
