
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { WorkAgreementPaymentMethodMap } from "@/zustand/types/workAgreementT";

type PaymentMethod = "bank" | "cash" | "both";

interface PaymentMethodSelectProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  disabled?: boolean;
}

export const PaymentMethodSelect: React.FC<PaymentMethodSelectProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div>
      <Label>Betaalmethode</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Selecteer betaalmethode" />
        </SelectTrigger>
        <SelectContent>
          {WorkAgreementPaymentMethodMap && Object.entries(WorkAgreementPaymentMethodMap).map(([key, method]) => (
            <SelectItem key={key} value={method.value}>
              {method.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
