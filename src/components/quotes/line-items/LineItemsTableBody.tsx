
import React from "react";
import LineItemRow from "@/components/quotes/LineItemRow";
import { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";

interface LineItemsTableBodyProps {
  fields: FieldArrayWithId<QuotationReq, "items", "id">[];
  remove: UseFieldArrayRemove;
  disabled?: boolean;
}

export const LineItemsTableBody: React.FC<LineItemsTableBodyProps> = ({
  fields,
  remove,
  disabled = false,
}) => {
  return (
    <tbody>
      {fields.map((field, index) => (
        <LineItemRow
          key={field.id}
          index={index}
          onRemove={() => remove(index)}
          disabled={disabled}
        />
      ))}
    </tbody>
  );
};
