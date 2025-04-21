
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuoteLineItem } from "@/types";
import LineItemRow from "@/components/quotes/LineItemRow";
import { Product } from "@/types/product";

interface LineItemsListProps {
  lineItems: QuoteLineItem[];
  onLineItemChange: (index: number, lineItem: QuoteLineItem) => void;
  onAddLineItem: () => void;
  onRemoveLineItem: (index: number) => void;
  productSuggestions: Record<string, Product[]>;
  onProductSearch: (term: string, id: string) => void;
  disabled?: boolean; // Add the disabled property
}

export const LineItemsList: React.FC<LineItemsListProps> = ({
  lineItems,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem,
  productSuggestions,
  onProductSearch,
  disabled = false, // Default to false
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
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
      </div>
      
      <Button
        type="button"
        variant="outline"
        onClick={onAddLineItem}
        className="w-full"
        disabled={disabled}
      >
        <Plus className="h-4 w-4 mr-2" />
        Regel toevoegen
      </Button>
    </div>
  );
};
