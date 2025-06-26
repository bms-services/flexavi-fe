
import React from "react";
import { LineItemsTableHeader } from "./LineItemsTableHeader";
import { LineItemsTableBody } from "./LineItemsTableBody";
import { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";

interface LineItemsTableProps {
  fields: FieldArrayWithId<QuotationReq, "items", "id">[];
  remove: UseFieldArrayRemove;
  disabled?: boolean;
}

export const LineItemsTable: React.FC<LineItemsTableProps> = ({
  fields,
  remove,
  disabled = false,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-400 bg-white shadow-sm">
      <table className="w-full min-w-[1000px] text-sm">
        <LineItemsTableHeader />
        <LineItemsTableBody
          fields={fields}
          remove={remove}
          disabled={disabled}
        />
      </table>
    </div>
  );
};
