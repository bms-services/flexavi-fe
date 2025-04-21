
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { QuoteLineItem } from "@/types";
import { ProductSearch } from "@/components/quotes/line-items/ProductSearch";
import { QuantityInput } from "@/components/quotes/line-items/QuantityInput";
import { UnitSelect } from "@/components/quotes/line-items/UnitSelect";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/product";

interface LineItemRowProps {
  item: QuoteLineItem;
  index: number;
  onRemove: () => void;
  onChange: (updatedItem: QuoteLineItem) => void;
  productSuggestions?: Product[];
  onProductSearch: (title: string) => void;
}

const LineItemRow: React.FC<LineItemRowProps> = ({
  item,
  index,
  onRemove,
  onChange,
  productSuggestions,
  onProductSearch,
}) => {
  // Handle updating a specific field of the line item
  const handleChange = (field: keyof QuoteLineItem, value: any) => {
    const updatedItem = { ...item, [field]: value };
    
    // Calculate the total when price or quantity changes
    if (field === "pricePerUnit" || field === "quantity") {
      const price = field === "pricePerUnit" ? value : item.pricePerUnit;
      const quantity = field === "quantity" ? value : item.quantity;
      updatedItem.total = price * quantity;
    }
    
    onChange(updatedItem);
  };

  return (
    <div className="space-y-3 border rounded-md p-3 bg-white">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-5">
          <ProductSearch
            value={item.description}
            onChange={(value) => handleChange("description", value)}
            onSearch={onProductSearch}
            suggestions={productSuggestions}
            label="Product/Dienst"
          />
        </div>
        
        <div className="col-span-3 md:col-span-2">
          <QuantityInput
            value={item.quantity}
            onChange={(value) => handleChange("quantity", value)}
          />
        </div>
        
        <div className="col-span-4 md:col-span-2">
          <UnitSelect
            value={item.unit}
            onChange={(value) => handleChange("unit", value)}
          />
        </div>
        
        <div className="col-span-5 md:col-span-2">
          <div className="space-y-1">
            <Label htmlFor={`price-${index}`}>Prijs</Label>
            <Input
              id={`price-${index}`}
              type="number"
              min="0"
              step="0.01"
              value={item.pricePerUnit}
              onChange={(e) => handleChange("pricePerUnit", parseFloat(e.target.value) || 0)}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="col-span-5 md:col-span-2 relative">
          <div className="space-y-1">
            <Label htmlFor={`total-${index}`}>Totaal</Label>
            <Input
              id={`total-${index}`}
              type="number"
              value={item.total}
              readOnly
              className="w-full bg-muted"
            />
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-1 flex items-end justify-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-10 w-10"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <Label htmlFor={`description-${index}`}>Extra toelichting</Label>
        <Textarea
          id={`description-${index}`}
          placeholder="Voeg hier extra details toe over deze dienst/product..."
          value={item.detailedDescription || ""}
          onChange={(e) => handleChange("detailedDescription", e.target.value)}
          rows={2}
        />
      </div>
    </div>
  );
};

export default LineItemRow;
