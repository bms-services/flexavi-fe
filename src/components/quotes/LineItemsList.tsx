
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
      <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm">
        <table className="w-full min-w-[1000px] text-sm border border-gray-300">
          <thead>
            <tr className="bg-muted">
              <th className="text-center py-1 px-2 font-medium border-b border-[#E1E3E6] w-[60px]">Aantal</th>
              <th className="text-center py-1 px-2 font-medium border-b border-[#E1E3E6] w-[90px]">Eenheid</th>
              <th className="text-left py-1 px-2 font-medium border-b border-[#E1E3E6] w-[220px]">Product/Dienst</th>
              <th className="text-right py-1 px-2 font-medium border-b border-[#E1E3E6] w-[110px]">Eenheidsprijs</th>
              <th className="text-center py-1 px-2 font-medium border-b border-[#E1E3E6] w-[70px]">BTW %</th>
              <th className="text-right py-1 px-2 font-medium border-b border-[#E1E3E6] w-[120px]">Regel totaal</th>
              <th className="text-center py-1 px-2 font-medium border-b border-[#E1E3E6] w-[40px]"></th>
            </tr>
          </thead>
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
        </table>
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
