
import React from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RotateCC } from "lucide-react";

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
  // Note: We removed the Dialog component wrapper here since it's now in the parent component
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <RotateCC className="h-5 w-5 text-amber-500" />
        Afspraak verzetten
      </DialogTitle>
      <DialogDescription>
        Geef een reden voor het verzetten van deze afspraak.
      </DialogDescription>
    </DialogHeader>
    
    <div className="py-2">
      <textarea
        value={reason}
        onChange={e => onChange(e.target.value)}
        placeholder="Bijv. klant niet aanwezig, ziek, etc."
        className="w-full border rounded-md p-3 text-sm min-h-[100px] focus:border-roof-400 focus:ring focus:ring-roof-100 outline-none"
      />
    </div>
    
    <DialogFooter className="gap-2 sm:gap-0">
      <Button variant="outline" onClick={onCancel}>Annuleren</Button>
      <Button 
        onClick={onSave} 
        disabled={!reason.trim()} 
        className="bg-roof-500 hover:bg-roof-600"
      >
        Verzetten bevestigen
      </Button>
    </DialogFooter>
  </DialogContent>
);
