
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewAppointmentForm } from "@/components/appointments/components/form/NewAppointmentForm";
import { useToast } from "@/hooks/use-toast";

interface PipelineItemAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export const PipelineItemAppointmentDialog: React.FC<PipelineItemAppointmentDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const { toast } = useToast();
  
  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    toast({
      title: "Afspraak gepland",
      description: "De afspraak is succesvol ingepland",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>Nieuwe Afspraak maken</DialogTitle>
        </DialogHeader>
        <div className="pt-3">
          <NewAppointmentForm onSubmit={handleFormSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
