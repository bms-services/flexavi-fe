
import React from "react";
import { QuoteLineItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductSearch } from "./line-items/ProductSearch";
import { QuantityInput } from "./line-items/QuantityInput";
import { UnitSelect } from "./line-items/UnitSelect";

interface LineItemRowProps {
  lineItem: QuoteLineItem;
  onChange: (updatedLineItem: QuoteLineItem) => void;
  onRemove: () => void;
  showRemoveButton: boolean;
  productSuggestions: any[];
  onProductSearch: (title: string) => void;
}

export const LineItemRow: React.FC<LineItemRowProps> = ({
  lineItem,
  onChange,
  onRemove,
  showRemoveButton,
  productSuggestions = [],
  onProductSearch,
}) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);
  };
  
  // Calculate total price
  const calculateTotal = (quantity: number, pricePerUnit: number) => {
    return quantity * pricePerUnit;
  };

  // Handle quantity change
  const handleQuantityChange = (value: string) => {
    const quantity = parseFloat(value) || 0;
    const total = calculateTotal(quantity, lineItem.pricePerUnit);
    
    onChange({
      ...lineItem,
      quantity,
      total,
    });
  };
  
  // Handle unit change
  const handleUnitChange = (value: string) => {
    onChange({
      ...lineItem,
      unit: value,
    });
  };
  
  // Handle VAT rate change
  const handleVatChange = (value: string) => {
    onChange({
      ...lineItem,
      vatRate: parseInt(value),
    });
  };
  
  // Handle price per unit change
  const handlePricePerUnitChange = (value: string) => {
    const pricePerUnit = parseFloat(value) || 0;
    const total = calculateTotal(lineItem.quantity, pricePerUnit);
    
    onChange({
      ...lineItem,
      pricePerUnit,
      total,
    });
  };

  // Handle description change
  const handleDescriptionChange = (value: string) => {
    onChange({
      ...lineItem,
      description: value,
    });
  };

  // Handle product selection
  const handleSelectProduct = (product: any) => {
    if (!product) return;
    
    onChange({
      ...lineItem,
      description: product.title || "",
      unit: product.unit || "stuk",
      pricePerUnit: product.pricePerUnit || 0,
      total: calculateTotal(lineItem.quantity, product.pricePerUnit || 0),
      vatRate: product.vat || 21,
    });
  };

  // Ensure productSuggestions is always an array
  const suggestions = Array.isArray(productSuggestions) ? productSuggestions : [];

  // Safety: ensure lineItem has all required properties
  const safeLineItem = {
    description: "",
    quantity: 1,
    unit: "stuk",
    pricePerUnit: 0,
    total: 0,
    vatRate: 21,
    ...lineItem
  };

  // Handle product search with safety checks
  const handleProductSearch = (title: string) => {
    if (typeof onProductSearch === 'function' && title) {
      onProductSearch(title);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-4">
        <ProductSearch
          description={safeLineItem.description || ""}
          onDescriptionChange={handleDescriptionChange}
          onProductSelect={handleSelectProduct}
          productSuggestions={suggestions}
          onProductSearch={handleProductSearch}
        />
      </div>
      
      <div className="col-span-1">
        <QuantityInput
          value={safeLineItem.quantity}
          onChange={handleQuantityChange}
        />
      </div>
      
      <div className="col-span-2">
        <UnitSelect
          value={safeLineItem.unit}
          onChange={handleUnitChange}
        />
      </div>
      
      <div className="col-span-1">
        <Select 
          value={(safeLineItem.vatRate?.toString() || "21")}
          onValueChange={handleVatChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="BTW" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0%</SelectItem>
            <SelectItem value="9">9%</SelectItem>
            <SelectItem value="21">21%</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="col-span-2">
        <Input 
          type="number" 
          min="0" 
          step="0.01"
          value={safeLineItem.pricePerUnit.toString()}
          onChange={(e) => handlePricePerUnitChange(e.target.value)}
          className="text-right"
        />
      </div>
      
      <div className="col-span-1 text-right font-medium">
        {formatCurrency(safeLineItem.total)}
      </div>
      
      <div className="col-span-1 flex justify-center">
        {showRemoveButton && (
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
