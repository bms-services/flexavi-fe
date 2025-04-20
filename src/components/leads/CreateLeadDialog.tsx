
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateLeadForm } from "./CreateLeadForm";
import { CreateLeadFormData } from "@/utils/validations";

interface CreateLeadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateLeadFormData) => void;
  leadId?: string; // Add the leadId prop as optional
}

export const CreateLeadDialog: React.FC<CreateLeadDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  leadId,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
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
