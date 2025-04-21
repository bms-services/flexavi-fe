
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Invoice } from "@/types";

interface CreditInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedInvoice: Invoice | null;
  onCredit: () => void;
}

export const CreditInvoiceDialog: React.FC<CreditInvoiceDialogProps> = ({
  open,
  onOpenChange,
  selectedInvoice,
  onCredit,
}) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Factuur crediteren</AlertDialogTitle>
        <AlertDialogDescription>
          Weet je zeker dat je deze factuur wilt crediteren? Er wordt een nieuwe creditfactuur aangemaakt.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuleren</AlertDialogCancel>
        <AlertDialogAction onClick={onCredit}>Ja, crediteer factuur</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
