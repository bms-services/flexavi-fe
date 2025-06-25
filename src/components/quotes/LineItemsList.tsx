
import React from "react";
import { LineItemsTable } from "./line-items/LineItemsTable";
import { AddLineItemButton } from "./line-items/AddLineItemButton";
import { useFieldArray, useFormContext } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";

interface LineItemsListProps {
  disabled?: boolean;
}

export const LineItemsList: React.FC<LineItemsListProps> = ({
  disabled = false,
}) => {
  const { control } = useFormContext<QuotationReq>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items"
  });

  const onAddLineItem = () => {
    append({
      quantity: 1,
      unit: "",
      title: "",
      description: "",
      unit_price: 0,
      vat_amount: 0,
      total: 0,
      product_id: "",
      product_title: ""
    });
  };

  return (
    <div className="space-y-4">
      <LineItemsTable
        fields={fields}
        append={append}
        remove={remove}
        update={update}
        disabled={disabled}
      />
      <AddLineItemButton onClick={onAddLineItem} disabled={disabled} />
    </div>
  );
};
