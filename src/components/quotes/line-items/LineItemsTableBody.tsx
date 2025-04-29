
import React from "react";
import { QuoteLineItem } from "@/types";
import { Product } from "@/types/product";
import LineItemRow from "@/components/quotes/LineItemRow";

interface LineItemsTableBodyProps {
  lineItems: QuoteLineItem[];
  onLineItemChange: (index: number, lineItem: QuoteLineItem) => void;
  onRemoveLineItem: (index: number) => void;
  productSuggestions: Record<string, Product[]>;
  onProductSearch: (term: string, id: string) => void;
  disabled?: boolean;
}

export const LineItemsTableBody: React.FC<LineItemsTableBodyProps> = ({
  lineItems,
  onLineItemChange,
  onRemoveLineItem,
  productSuggestions,
  onProductSearch,
  disabled = false,
}) => {
  return (
    <tbody>
      {lineItems.map((item, index) => (
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
      ))}
    </tbody>
  );
};
