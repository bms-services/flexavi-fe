
import React from "react";
import { QuoteLineItem } from "@/types";
import { Product } from "@/types/product";
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
  productSuggestions: Product[];
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
  // Ensure we have a valid array of product suggestions
  const safeSuggestions = Array.isArray(productSuggestions) ? productSuggestions : [];
  
  // Format currency
  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    const safeValue = isNaN(numValue) ? 0 : numValue;
    
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(safeValue);
  };
  
  // Calculate total price
  const calculateTotal = (quantity: number, pricePerUnit: number) => {
    return quantity * pricePerUnit;
  };

  // Handle quantity change
  const handleQuantityChange = (value: string) => {
    const quantity = parseFloat(value) || 0;
    const pricePerUnit = parseFloat(String(lineItem.pricePerUnit)) || 0;
    const total = calculateTotal(quantity, pricePerUnit);
    
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
      vatRate: parseInt(value) || 21,
    });
  };
  
  // Handle price per unit change
  const handlePricePerUnitChange = (value: string) => {
    const pricePerUnit = parseFloat(value) || 0;
    const quantity = parseFloat(String(lineItem.quantity)) || 0;
    const total = calculateTotal(quantity, pricePerUnit);
    
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
      description: value || '',
    });
  };

  // Handle product selection
  const handleSelectProduct = (product: Product) => {
    if (!product) return;
    
    const quantity = parseFloat(String(lineItem.quantity)) || 1;
    const total = calculateTotal(quantity, product.pricePerUnit);
    
    onChange({
      ...lineItem,
      description: product.title || '',
      unit: product.unit || 'stuk',
      pricePerUnit: product.pricePerUnit || 0,
      total,
      vatRate: product.vat || 21,
    });
  };

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

  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-4">
        <ProductSearch
          description={safeLineItem.description || ''}
          onDescriptionChange={handleDescriptionChange}
          onProductSelect={handleSelectProduct}
          productSuggestions={safeSuggestions}
          onProductSearch={onProductSearch}
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
          value={safeLineItem.unit || 'stuk'}
          onChange={handleUnitChange}
        />
      </div>
      
      <div className="col-span-1">
        <Select 
          value={String(safeLineItem.vatRate || 21)}
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
          value={String(safeLineItem.pricePerUnit || 0)}
          onChange={(e) => handlePricePerUnitChange(e.target.value)}
          className="text-right"
        />
      </div>
      
      <div className="col-span-1 text-right font-medium">
        {formatCurrency(safeLineItem.total || 0)}
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
