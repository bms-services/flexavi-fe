
import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface PaymentDetailsProps {
  workAgreement: {
    paymentMethod?: string;
    cashPaymentAmount?: number;
    paymentInstallments?: {
      description: string;
      percentage: number;
    }[];
  };
  formatCurrency: (amount: number) => string;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ workAgreement, formatCurrency }) => {
  const renderPaymentMethod = () => {
    const method = workAgreement.paymentMethod;
    if (!method) return null;

    let methodText = "";
    if (method === "bank") methodText = "Bankoverschrijving";
    if (method === "cash") methodText = "Contante betaling";
    if (method === "both") methodText = "Bank en contante betaling";

    return (
      <div>
        <Label>Betaalwijze</Label>
        <p className="font-medium">{methodText}</p>
        {(method === "cash" || method === "both") && workAgreement.cashPaymentAmount && (
          <p className="text-sm text-muted-foreground mt-1">
            Contant te betalen bij oplevering: {formatCurrency(workAgreement.cashPaymentAmount)}
          </p>
        )}
      </div>
    );
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4">
        Betaalgegevens
      </h3>
      <div className="space-y-4">
        {renderPaymentMethod()}
        
        {workAgreement.paymentInstallments && workAgreement.paymentInstallments.length > 0 && (
          <div>
            <Label>Betaaltermijnen</Label>
            <div className="space-y-2 mt-2">
              {workAgreement.paymentInstallments.map((installment, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{installment.description}</span>
                  <span className="font-medium">{installment.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
