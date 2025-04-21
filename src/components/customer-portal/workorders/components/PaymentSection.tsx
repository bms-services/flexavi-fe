
import React from "react";
import { Card } from "@/components/ui/card";
import { InvoiceSummary } from "@/components/invoices/InvoiceSummary";
import { Euro } from "lucide-react";

interface PaymentSectionProps {
  totalAmount: number;
  vatRate?: number;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ 
  totalAmount,
  vatRate = 21 
}) => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
        <Euro className="h-4 w-4" />
        Betaling
      </h3>
      <InvoiceSummary 
        subtotal={totalAmount} 
        vatRate={vatRate} 
        discountType="percentage"
        discountValue={0}
        onDiscountTypeChange={() => {}}
        onDiscountValueChange={() => {}}
      />
    </Card>
  );
};
