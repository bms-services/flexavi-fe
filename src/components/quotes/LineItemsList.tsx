
import React from "react";
import { QuoteLineItem } from "@/types";
import { Product } from "@/types/product";
import { LineItemsTable } from "./line-items/LineItemsTable";
import { AddLineItemButton } from "./line-items/AddLineItemButton";

interface LineItemsListProps {
  lineItems: QuoteLineItem[];
  onLineItemChange: (index: number, lineItem: QuoteLineItem) => void;
  onAddLineItem: () => void;
  onRemoveLineItem: (index: number) => void;
  productSuggestions: Record<string, Product[]>;
  onProductSearch: (term: string, id: string) => void;
  disabled?: boolean;
}

export const LineItemsList: React.FC<LineItemsListProps> = ({
  lineItems,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem,
  productSuggestions,
  onProductSearch,
  disabled = false,
}) => {
  return (
    <div className="space-y-4">
      <LineItemsTable
        lineItems={lineItems}
        onLineItemChange={onLineItemChange}
        onRemoveLineItem={onRemoveLineItem}
        productSuggestions={productSuggestions}
        onProductSearch={onProductSearch}
        disabled={disabled}
      />
      <AddLineItemButton onClick={onAddLineItem} disabled={disabled} />
    </div>
  );
};
