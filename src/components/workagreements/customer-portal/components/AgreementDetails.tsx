
import React from "react";
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface AgreementDetailsProps {
  workAgreement: {
    totalAmount: number;
    startDate: string;
    warranty: string;
  };
  formatCurrency: (amount: number) => string;
}

export const AgreementDetails: React.FC<AgreementDetailsProps> = ({ 
  workAgreement,
  formatCurrency
}) => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
        <FileText className="h-4 w-4" />
        Overeenkomst Details
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Totaalbedrag excl. BTW</Label>
            <p className="font-medium">{formatCurrency(workAgreement.totalAmount)}</p>
          </div>
          <div>
            <Label>BTW (21%)</Label>
            <p className="font-medium">{formatCurrency(workAgreement.totalAmount * 0.21)}</p>
          </div>
          <div>
            <Label>Totaalbedrag incl. BTW</Label>
            <p className="font-medium">{formatCurrency(workAgreement.totalAmount * 1.21)}</p>
          </div>
          <div>
            <Label>Garantie (jaren)</Label>
            <p className="font-medium">{workAgreement.warranty} jaar</p>
          </div>
        </div>

        <div>
          <Label>Startdatum Werkzaamheden</Label>
          <p>{format(new Date(workAgreement.startDate), "d MMMM yyyy", { locale: nl })}</p>
        </div>
      </div>
    </Card>
  );
};
