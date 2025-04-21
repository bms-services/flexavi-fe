
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Expense } from "@/types/expenses";

interface DeleteDialogProps {
  expense: Expense | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  expense,
  onClose,
  onConfirm,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <Dialog open={!!expense} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uitgave verwijderen</DialogTitle>
          <DialogDescription>
            Weet u zeker dat u deze uitgave wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
          </DialogDescription>
        </DialogHeader>
        {expense && (
          <div className="py-4">
            <p><strong>Bedrijf:</strong> {expense.company}</p>
            <p><strong>Omschrijving:</strong> {expense.description}</p>
            <p><strong>Bedrag:</strong> {formatCurrency(expense.totalAmount)}</p>
            <p><strong>Datum:</strong> {format(new Date(expense.date), 'dd MMMM yyyy', { locale: nl })}</p>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuleren
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Verwijderen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
