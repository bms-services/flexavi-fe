
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { nl } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DayOffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: Date, reason: string) => void;
  employeeId: string;
}

export const DayOffDialog = ({ isOpen, onClose, onSubmit, employeeId }: DayOffDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState("");

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      onSubmit(selectedDate, reason);
      setSelectedDate(undefined);
      setReason("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    setReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vrije dag inplannen</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Calendar
            mode="single"
            locale={nl}
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reden voor vrije dag</Label>
            <Textarea 
              id="reason" 
              placeholder="Vul hier de reden in..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Annuleren</Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedDate}
          >
            Opslaan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
