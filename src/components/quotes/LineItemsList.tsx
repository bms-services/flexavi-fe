
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { LineItemRow } from "@/components/quotes/LineItemRow";
import { QuoteLineItem } from "@/types";
import { Product } from "@/types/product";

interface LineItemsListProps {
  lineItems: QuoteLineItem[];
  onLineItemChange: (index: number, updatedItem: QuoteLineItem) => void;
  onAddLineItem: () => void;
  onRemoveLineItem: (index: number) => void;
  productSuggestions: Record<string, Product[]>;
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
  // Ensure we have a valid array of line items
  const safeLineItems = Array.isArray(lineItems) ? lineItems : [];
  
  // Ensure productSuggestions is a valid object
  const safeSuggestions = productSuggestions || {};

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

      {safeLineItems.map((item, index) => {
        // Get suggestions for this item safely
        const itemSuggestions = item?.id && safeSuggestions[item.id] 
          ? safeSuggestions[item.id] 
          : [];
          
        return (
          <LineItemRow
            key={item.id || `item-${index}`}
            lineItem={item}
            onChange={updatedItem => onLineItemChange(index, updatedItem)}
            onRemove={() => onRemoveLineItem(index)}
            productSuggestions={itemSuggestions}
            onProductSearch={(title) => {
              if (item?.id) {
                onProductSearch(title, item.id);
              }
            }}
            showRemoveButton={safeLineItems.length > 1}
          />
        );
      })}

      <div className="flex justify-end">
        <Button onClick={onAddLineItem}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Regel toevoegen
        </Button>
      </div>
    </div>
  );
};
