
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface RejectQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReject: (reason: string) => void;
}

export const RejectQuoteDialog: React.FC<RejectQuoteDialogProps> = ({
  open,
  onOpenChange,
  onReject,
}) => {
  const [reason, setReason] = useState("");

  const handleReject = () => {
    onReject(reason);
    onOpenChange(false);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Offerte weigeren</DialogTitle>
          <DialogDescription>
            Geef alstublieft aan waarom u deze offerte afwijst. Dit helpt ons om onze service te verbeteren.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reden van afwijzing</Label>
            <Textarea
              id="reason"
              placeholder="Bijv. te hoge prijs, andere leverancier gekozen, etc."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleReject} 
            disabled={reason.trim().length < 3}
          >
            Bevestig afwijzing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
