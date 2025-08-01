
import React from "react";
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

interface QuoteRevisionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  revisionComment: string;
  onRevisionCommentChange: (comment: string) => void;
  onSubmit: () => void;
}

export const QuoteRevisionDialog: React.FC<QuoteRevisionDialogProps> = ({
  open,
  onOpenChange,
  revisionComment,
  onRevisionCommentChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">Revisie Aanvragen</DialogTitle>
          <DialogDescription className="text-gray-600">
            Geef aan welke aanpassingen u graag zou willen zien in de offerte.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            value={revisionComment}
            onChange={(e) => onRevisionCommentChange(e.target.value)}
            placeholder="Beschrijf hier uw gewenste aanpassingen..."
            className="min-h-[150px] border border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button 
            onClick={onSubmit} 
            disabled={!revisionComment}
            className="bg-primary hover:bg-primary/90"
          >
            Verstuur Revisie Verzoek
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
