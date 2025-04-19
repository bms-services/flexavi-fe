
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  const [showCashAmount, setShowCashAmount] = useState(paymentMethod === "cash" || paymentMethod === "both");

  const handleMethodChange = (value: string) => {
    const method = value as PaymentMethod;
    onPaymentMethodChange(method);
    setShowCashAmount(method === "cash" || method === "both");
  };

  const handleCashAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    onCashPaymentAmountChange(isNaN(amount) ? 0 : amount);
  };

  const handleAddInstallment = () => {
    const newInstallments = [
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

  const handleInstallmentChange = (index: number, field: keyof PaymentInstallment, value: string | number) => {
    const newInstallments = [...paymentInstallments];
    if (field === 'percentage') {
      const percentage = parseFloat(value as string);
      newInstallments[index][field] = isNaN(percentage) ? 0 : percentage;
    } else if (field === 'description') {
      newInstallments[index][field] = value as string;
    } else if (field === 'dueType') {
      newInstallments[index][field] = value as "upfront" | "start" | "during" | "completion";
    }
    onPaymentInstallmentsChange(newInstallments);
  };

  // Calculate total percentage
  const totalPercentage = paymentInstallments.reduce((sum, { percentage }) => sum + percentage, 0);

  return (
    <div className="space-y-4">
      <div>
        <Label>Betaalmethode</Label>
        <Select value={paymentMethod} onValueChange={handleMethodChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecteer betaalmethode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bank">Bankoverschrijving</SelectItem>
            <SelectItem value="cash">Contant</SelectItem>
            <SelectItem value="both">Bank en contant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showCashAmount && (
        <div>
          <Label>Contant te betalen bij oplevering (€)</Label>
          <Input
            type="number"
            value={cashPaymentAmount || ''}
            onChange={handleCashAmountChange}
            placeholder="Bedrag"
          />
        </div>
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
              <Card key={index} className="mb-2">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                      <Label>Omschrijving</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={installment.description}
                          onChange={(e) => handleInstallmentChange(index, 'description', e.target.value)}
                          placeholder="Omschrijving"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Percentage (%)</Label>
                      <Input
                        type="number"
                        value={installment.percentage}
                        onChange={(e) => handleInstallmentChange(index, 'percentage', e.target.value)}
                        placeholder="Percentage"
                      />
                    </div>

                    <div>
                      <Label>Type</Label>
                      <Select 
                        value={installment.dueType} 
                        onValueChange={(value) => handleInstallmentChange(index, 'dueType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upfront">Vooraf</SelectItem>
                          <SelectItem value="start">Bij aanvang</SelectItem>
                          <SelectItem value="during">Tussentijds</SelectItem>
                          <SelectItem value="completion">Bij oplevering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveInstallment(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
