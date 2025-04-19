
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { LineItemRow } from "@/components/quotes/LineItemRow";
import { QuoteLineItem } from "@/types";

interface LineItemsListProps {
  lineItems: QuoteLineItem[];
  onLineItemChange: (index: number, updatedItem: QuoteLineItem) => void;
  onAddLineItem: () => void;
  onRemoveLineItem: (index: number) => void;
  productSuggestions: Record<string, any[]>;
  onProductSearch: (title: string, index: string) => void;
}

export const LineItemsList: React.FC<LineItemsListProps> = ({
  lineItems,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem,
  productSuggestions = {},
  onProductSearch,
}) => {
  // Always ensure lineItems and productSuggestions are valid
  const items = Array.isArray(lineItems) ? lineItems : [];
  const suggestions = productSuggestions || {};

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-2 font-medium text-sm border-b pb-2">
        <div className="col-span-4">Product / Dienst</div>
        <div className="col-span-1 text-center">Aantal</div>
        <div className="col-span-2">Eenheid</div>
        <div className="col-span-1 text-center">BTW</div>
        <div className="col-span-2">Prijs per eenheid</div>
        <div className="col-span-1 text-right">Totaal</div>
        <div className="col-span-1"></div>
      </div>

      {items.map((item, index) => (
        <LineItemRow
          key={item.id || `item-${index}`}
          lineItem={item}
          onChange={updatedItem => onLineItemChange(index, updatedItem)}
          onRemove={() => onRemoveLineItem(index)}
          productSuggestions={
            item.id && suggestions[item.id] && Array.isArray(suggestions[item.id]) 
              ? suggestions[item.id] 
              : []
          }
          onProductSearch={(title) => {
            if (item.id) {
              onProductSearch(title, item.id);
            }
          }}
          showRemoveButton={items.length > 1}
        />
      ))}

      <div className="flex justify-end">
        <Button onClick={onAddLineItem}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Regel toevoegen
        </Button>
      </div>
    </div>
  );
};
