
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddLineItemButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const AddLineItemButton: React.FC<AddLineItemButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="w-full"
      disabled={disabled}
    >
      <Plus className="h-4 w-4 mr-2" />
      Regel toevoegen
    </Button>
  );
};
