
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
import { InvoiceCreditType, InvoiceRes } from "@/zustand/types/invoiceT";

interface CreditInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: InvoiceRes;
  onSubmit: (type: InvoiceCreditType) => void;
}

export const CreditInvoiceDialog: React.FC<CreditInvoiceDialogProps> = ({
  open,
  onOpenChange,
  invoice,
  onSubmit,
}) => {
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Factuur crediteren - {invoice.invoice_number}</DialogTitle>
          <DialogDescription>
            Kies of u de factuur volledig of gedeeltelijk wilt crediteren.
            <br />
            <strong>
              Let op: Een volledige creditering maakt de factuur volledig
              ongedaan.
            </strong>
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
            onClick={() => onSubmit("partial")}
            className="mt-2 sm:mt-0"
          >
            Gedeeltelijke creditering
          </Button>
          <Button onClick={() => onSubmit("full")}>
            Volledige creditering
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
