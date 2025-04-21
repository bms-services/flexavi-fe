
import React, { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Invoice } from "@/types";

interface CreditInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedInvoice: Invoice | null;
  onCredit: (creditType: "full" | "partial") => void;
}

export const CreditInvoiceDialog: React.FC<CreditInvoiceDialogProps> = ({
  open,
  onOpenChange,
  selectedInvoice,
  onCredit,
}) => {
  const [creditType, setCreditType] = useState<"full" | "partial">("full");

  const handleCredit = () => {
    onCredit(creditType);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Factuur crediteren</AlertDialogTitle>
          <AlertDialogDescription>
            Wilt u de factuur volledig of gedeeltelijk crediteren?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <RadioGroup value={creditType} onValueChange={(value: "full" | "partial") => setCreditType(value)}>
            <div className="flex items-start space-y-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="font-medium">Volledige creditering</Label>
                </div>
                <div className="pl-6 text-sm text-muted-foreground">
                  De gehele factuur wordt gecrediteerd en de originele factuur wordt als betaald gemarkeerd.
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-y-2 mt-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partial" id="partial" />
                  <Label htmlFor="partial" className="font-medium">Gedeeltelijke creditering</Label>
                </div>
                <div className="pl-6 text-sm text-muted-foreground">
                  Maak een nieuwe creditfactuur aan waarbij u zelf bepaalt welke regels gecrediteerd worden.
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Annuleren</AlertDialogCancel>
          <AlertDialogAction onClick={handleCredit}>Factuur crediteren</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
