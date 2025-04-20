
import React from "react";
import { QuoteLineItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LineItemRow } from "./LineItemRow";

interface LineItemsListProps {
  lineItems: QuoteLineItem[];
  onLineItemChange: (index: number, updatedItem: QuoteLineItem) => void;
  onAddLineItem: () => void;
  onRemoveLineItem: (index: number) => void;
  productSuggestions: Record<string, any[]>;
  onProductSearch: (title: string, index: string) => void;
  disabled?: boolean;
}

export const LineItemsList: React.FC<LineItemsListProps> = ({
  lineItems,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem,
  productSuggestions,
  onProductSearch,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-2 font-medium text-sm text-muted-foreground">
        <div className="col-span-5">Omschrijving</div>
        <div className="col-span-2">Aantal</div>
        <div className="col-span-2">Eenheid</div>
        <div className="col-span-2">Prijs</div>
        <div className="col-span-1"></div>
      </div>
      
      <div className="space-y-2">
        {lineItems.map((item, index) => (
          <LineItemRow
            key={item.id || index}
            item={item}
            onLineItemChange={(updatedItem) => onLineItemChange(index, updatedItem)}
            onRemove={() => onRemoveLineItem(index)}
            productSuggestions={productSuggestions[index] || []}
            onProductSearch={(title) => onProductSearch(title, index.toString())}
            disabled={disabled}
          />
        ))}
      </div>
      
      {!disabled && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddLineItem}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Item toevoegen
        </Button>
      )}
    </div>
  );
};
