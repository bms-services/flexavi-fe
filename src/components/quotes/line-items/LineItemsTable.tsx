
import React from "react";
// import { QuoteLineItem } from "@/types";
// import { Product } from "@/types/product";
import { LineItemsTableHeader } from "./LineItemsTableHeader";
import { LineItemsTableBody } from "./LineItemsTableBody";
import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, UseFieldArrayUpdate } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";

interface LineItemsTableProps {
  // lineItems: QuoteLineItem[];
  // onLineItemChange: (index: number, lineItem: QuoteLineItem) => void;
  // onRemoveLineItem: (index: number) => void;
  // productSuggestions: Record<string, Product[]>;
  // onProductSearch: (term: string, id: string) => void;
  fields: FieldArrayWithId<QuotationReq, "items", "id">[];
  append: UseFieldArrayAppend<QuotationReq, "items">;
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<QuotationReq, "items">;
  disabled?: boolean;
}

export const LineItemsTable: React.FC<LineItemsTableProps> = ({
  // lineItems,
  // onLineItemChange,
  // onRemoveLineItem,
  // productSuggestions,
  // onProductSearch,
  fields,
  append,
  remove,
  update,
  disabled = false,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-400 bg-white shadow-sm">
      <table className="w-full min-w-[1000px] text-sm">
        <LineItemsTableHeader />
        <LineItemsTableBody
          // lineItems={lineItems}
          // onLineItemChange={onLineItemChange}
          // onRemoveLineItem={onRemoveLineItem}
          // productSuggestions={productSuggestions}
          // onProductSearch={onProductSearch}
          fields={fields}
          append={append}
          remove={remove}
          update={update}
          disabled={disabled}
        />
      </table>
    </div>
  );
};
