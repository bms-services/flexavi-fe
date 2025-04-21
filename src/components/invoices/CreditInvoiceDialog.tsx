
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
import { Invoice } from "@/types";

interface CreditInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedInvoice: Invoice | null;
  onCredit: (type: "full" | "partial") => void;
}

export const CreditInvoiceDialog: React.FC<CreditInvoiceDialogProps> = ({
  open,
  onOpenChange,
  selectedInvoice,
  onCredit,
}) => {
  if (!selectedInvoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Factuur crediteren</DialogTitle>
          <DialogDescription>
            Kies het type creditering voor factuur {selectedInvoice.id.replace("inv-", "FACT-")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Een volledige creditering maakt de factuur volledig ongedaan. Een gedeeltelijke creditering staat toe om specifieke items te crediteren.
          </p>
        </div>
        <DialogFooter className="flex-col sm:flex-row sm:justify-between sm:space-x-2">
          <Button
            variant="outline"
            onClick={() => onCredit("partial")}
            className="mt-2 sm:mt-0"
          >
            Gedeeltelijke creditering
          </Button>
          <Button onClick={() => onCredit("full")}>
            Volledige creditering
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
