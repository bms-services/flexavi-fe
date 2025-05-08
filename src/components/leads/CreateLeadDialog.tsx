
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateLeadForm } from "./CreateLeadForm";
import { CreateLeadFormData } from "@/utils/validations";
import { Lead } from "@/types";

interface CreateLeadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Lead) => Promise<void>;
  leadId?: string;
}

export const CreateLeadDialog: React.FC<CreateLeadDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  leadId,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {leadId ? "Lead Bewerken" : "Nieuwe Lead Toevoegen"}
          </DialogTitle>
        </DialogHeader>
        <CreateLeadForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          leadId={leadId}
        />
      </DialogContent>
    </Dialog>
  );
};
