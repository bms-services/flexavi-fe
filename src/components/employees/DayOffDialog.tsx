
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { nl } from "date-fns/locale";

interface DayOffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: Date) => void;
  employeeId: string;
}

export const DayOffDialog = ({ isOpen, onClose, onSubmit, employeeId }: DayOffDialogProps) => {
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onSubmit(date);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vrije dag inplannen</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Calendar
            mode="single"
            locale={nl}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
