
import React from "react";
// import { QuoteLineItem } from "@/types";
// import { Product } from "@/types/product";
import LineItemRow from "@/components/quotes/LineItemRow";
import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, UseFieldArrayUpdate } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";

interface LineItemsTableBodyProps {
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

export const LineItemsTableBody: React.FC<LineItemsTableBodyProps> = ({
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
    <tbody>
      {/* {lineItems.map((item, index) => (
        <LineItemRow
          key={item.id}
          item={item}
          index={index}
          onChange={(updatedItem) => onLineItemChange(index, updatedItem)}
          onRemove={() => onRemoveLineItem(index)}
          productSuggestions={productSuggestions[item.id]}
          onProductSearch={(term) => onProductSearch(term, item.id)}
          disabled={disabled}
        />
      ))} */}

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
