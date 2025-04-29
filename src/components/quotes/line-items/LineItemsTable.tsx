
import React from "react";
import { QuoteLineItem } from "@/types";
import { Product } from "@/types/product";
import { LineItemsTableHeader } from "./LineItemsTableHeader";
import { LineItemsTableBody } from "./LineItemsTableBody";

interface LineItemsTableProps {
  lineItems: QuoteLineItem[];
  onLineItemChange: (index: number, lineItem: QuoteLineItem) => void;
  onRemoveLineItem: (index: number) => void;
  productSuggestions: Record<string, Product[]>;
  onProductSearch: (term: string, id: string) => void;
  disabled?: boolean;
}

export const LineItemsTable: React.FC<LineItemsTableProps> = ({
  lineItems,
  onLineItemChange,
  onRemoveLineItem,
  productSuggestions,
  onProductSearch,
  disabled = false,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-400 bg-white shadow-sm">
      <table className="w-full min-w-[1000px] text-sm">
        <LineItemsTableHeader />
        <LineItemsTableBody
          lineItems={lineItems}
          onLineItemChange={onLineItemChange}
          onRemoveLineItem={onRemoveLineItem}
          productSuggestions={productSuggestions}
          onProductSearch={onProductSearch}
          disabled={disabled}
        />
      </table>
    </div>
  );
};
