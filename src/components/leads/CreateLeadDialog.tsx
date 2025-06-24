
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateLeadForm } from "./CreateLeadForm";
import { LeadReq } from "@/zustand/types/leadT";

interface CreateLeadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: LeadReq) => Promise<void>;
  leadId: string;
  isLoading?: boolean;
}

export const CreateLeadDialog: React.FC<CreateLeadDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  leadId,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {leadId ? "Lead Bewerken" : "Nieuwe Lead Toevoegen"}
          </DialogTitle>
        </DialogHeader>
        {!isLoading && (
          <CreateLeadForm
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
            leadId={leadId}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
