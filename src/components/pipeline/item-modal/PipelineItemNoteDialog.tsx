
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PipelineItemNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  noteValue: string;
  setNoteValue: (v: string) => void;
  onSave: () => void;
}

export const PipelineItemNoteDialog: React.FC<PipelineItemNoteDialogProps> = ({
  open,
  onOpenChange,
  noteValue,
  setNoteValue,
  onSave,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md w-full">
      <DialogHeader>
        <DialogTitle>Nieuwe Notitie toevoegen</DialogTitle>
      </DialogHeader>
      <Textarea
        value={noteValue}
        onChange={(e) => setNoteValue(e.target.value)}
        placeholder="Schrijf je notitie..."
        className="min-h-[120px] mt-3"
      />
      <div className="flex justify-end gap-3 mt-4">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Annuleren
        </Button>
        <Button onClick={onSave} disabled={!noteValue.trim()}>
          Notitie toevoegen
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

