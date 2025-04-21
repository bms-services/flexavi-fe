
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
import Signature from "@/components/customer/Signature";

interface AcceptQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAcceptWithSignature: (signatureData: string) => void;
}

export const AcceptQuoteDialog: React.FC<AcceptQuoteDialogProps> = ({
  open,
  onOpenChange,
  onAcceptWithSignature,
}) => {
  const [signature, setSignature] = useState<string | null>(null);

  const handleAccept = () => {
    if (signature) {
      onAcceptWithSignature(signature);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Offerte accepteren</DialogTitle>
          <DialogDescription>
            Om uw acceptatie te bevestigen vragen wij u een handtekening te plaatsen.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Door te ondertekenen gaat u akkoord met de voorwaarden en geeft u opdracht tot het uitvoeren van de werkzaamheden zoals beschreven in de offerte.
          </p>
          
          <Signature onSignatureChange={setSignature} />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleAccept} disabled={!signature}>
            Accepteren & ondertekenen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
