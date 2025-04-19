
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PaymentMethodSelect } from "./components/PaymentMethodSelect";
import { CashPaymentInput } from "./components/CashPaymentInput";
import { PaymentInstallmentItem } from "./components/PaymentInstallmentItem";

type PaymentMethod = "bank" | "cash" | "both";

type PaymentInstallment = {
  percentage: number;
  description: string;
  dueType: "upfront" | "start" | "during" | "completion";
};

interface PaymentTermsFormProps {
  paymentMethod?: PaymentMethod;
  cashPaymentAmount?: number;
  paymentInstallments?: PaymentInstallment[];
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onCashPaymentAmountChange: (amount: number) => void;
  onPaymentInstallmentsChange: (installments: PaymentInstallment[]) => void;
}

export const PaymentTermsForm: React.FC<PaymentTermsFormProps> = ({
  paymentMethod = "bank",
  cashPaymentAmount = 0,
  paymentInstallments = [],
  onPaymentMethodChange,
  onCashPaymentAmountChange,
  onPaymentInstallmentsChange,
}) => {
  const [showCashAmount, setShowCashAmount] = useState(
    paymentMethod === "cash" || paymentMethod === "both"
  );

  const handleMethodChange = (value: PaymentMethod) => {
    onPaymentMethodChange(value);
    setShowCashAmount(value === "cash" || value === "both");
  };

  const handleAddInstallment = () => {
    const newInstallments: PaymentInstallment[] = [
      ...paymentInstallments,
      {
        percentage: 25,
        description: "Betaling",
        dueType: "upfront"
      }
    ];
    onPaymentInstallmentsChange(newInstallments);
  };

  const handleRemoveInstallment = (index: number) => {
    const newInstallments = [...paymentInstallments];
    newInstallments.splice(index, 1);
    onPaymentInstallmentsChange(newInstallments);
  };

  const handleInstallmentChange = (
    index: number,
    field: keyof PaymentInstallment,
    value: string | number
  ) => {
    const newInstallments = [...paymentInstallments];
    if (field === 'percentage') {
      const percentage = parseFloat(value as string);
      newInstallments[index][field] = isNaN(percentage) ? 0 : percentage;
    } else if (field === 'description') {
      newInstallments[index][field] = value as string;
    } else if (field === 'dueType') {
      const dueTypeValue = value as "upfront" | "start" | "during" | "completion";
      newInstallments[index][field] = dueTypeValue;
    }
    onPaymentInstallmentsChange(newInstallments);
  };

  const totalPercentage = paymentInstallments.reduce(
    (sum, { percentage }) => sum + percentage,
    0
  );

  return (
    <div className="space-y-4">
      <PaymentMethodSelect 
        value={paymentMethod} 
        onChange={handleMethodChange} 
      />

      {showCashAmount && (
        <CashPaymentInput
          value={cashPaymentAmount}
          onChange={onCashPaymentAmountChange}
        />
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Betaaltermijnen</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddInstallment}
          >
            <Plus className="h-4 w-4 mr-1" /> Termijn toevoegen
          </Button>
        </div>

        {paymentInstallments.length > 0 ? (
          <div>
            {paymentInstallments.map((installment, index) => (
              <PaymentInstallmentItem
                key={index}
                installment={installment}
                onRemove={() => handleRemoveInstallment(index)}
                onChange={(field, value) => handleInstallmentChange(index, field, value)}
              />
            ))}

            <div className="flex justify-between text-sm mt-2">
              <span>Totaal percentage:</span>
              <span className={`font-medium ${totalPercentage !== 100 ? 'text-red-500' : 'text-green-500'}`}>
                {totalPercentage}%
              </span>
            </div>
            {totalPercentage !== 100 && (
              <p className="text-sm text-red-500 mt-1">
                Het totaal moet 100% zijn
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Geen betaaltermijnen toegevoegd. Klik op de knop om een betaaltermijn toe te voegen.
          </p>
        )}
      </div>
    </div>
  );
};
