
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RescheduleDialogProps {
  open: boolean;
  reason: string;
  onChange: (v: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export const RescheduleDialog: React.FC<RescheduleDialogProps> = ({
  open,
  reason,
  onChange,
  onCancel,
  onSave
}) => (
  <Dialog open={open} onOpenChange={o => o ? undefined : onCancel()}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Afspraak verzetten</DialogTitle>
        <DialogDescription>
          Geef een reden voor het verzetten van deze afspraak.
        </DialogDescription>
      </DialogHeader>
      <textarea
        value={reason}
        onChange={e => onChange(e.target.value)}
        placeholder="Bijv. klant niet aanwezig, ziek, etc."
        className="w-full border rounded p-2 mt-2 min-h-[60px]"
      />
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Annuleren</Button>
        <Button onClick={onSave} disabled={!reason.trim()}>Verzetten</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
