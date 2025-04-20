
import React from "react";
import { CustomerSearch } from "@/components/appointments/components/CustomerSearch";
import { Lead } from "@/types";

interface CustomerSelectionProps {
  selectedCustomer: Lead | null;
  onSelectCustomer: (customer: Lead | null) => void;
}

export const CustomerSelection: React.FC<CustomerSelectionProps> = ({
  selectedCustomer,
  onSelectCustomer,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Selecteer een klant</label>
      <CustomerSearch
        selectedCustomer={selectedCustomer}
        onSelectCustomer={onSelectCustomer}
      />
    </div>
  );
};
