
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
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { InvoiceRes } from "@/zustand/types/invoiceT";

interface SendInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: InvoiceRes;
  onSubmit: () => void;
}

export const SendInvoiceDialog: React.FC<SendInvoiceDialogProps> = ({
  open,
  onOpenChange,
  invoice,
  onSubmit,
}) => {
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Factuur verzenden</DialogTitle>
          <DialogDescription>
            Vul de e-mailgegevens in om de factuur te verzenden
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            id="to"
            name="to"
            label="E-mailadres"
            placeholder="email@voorbeeld.nl"
          />
          <Input
            id="subject"
            name="subject"
            label="Onderwerp"
            placeholder={`Factuur ${invoice.invoice_number} verzenden`}
          />
          <Textarea
            id="message"
            name="message"
            label="Bericht"

            placeholder="Geachte heer/mevrouw, Hierbij sturen wij u de factuur..."
            rows={5}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={onSubmit}>Verzenden</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
