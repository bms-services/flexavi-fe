
import React, { useEffect, useRef, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

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
  productSuggestions,
  onProductSearch,
}) => {
  const [title, setTitle] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
  
  // Handle description (product title) change
  const handleDescriptionChange = (value: string) => {
    setTitle(value);
    
    // Update line item
    onChange({
      ...lineItem,
      description: value,
    });
    
    // Trigger search after a short delay
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      onProductSearch(value);
      if (value.length > 2) {
        setSuggestionsOpen(true);
      }
    }, 300);
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
  
  // Apply product from suggestion
  const handleSelectProduct = (product: any) => {
    setTitle(product.title);
    setSuggestionsOpen(false);
    
    onChange({
      ...lineItem,
      description: product.title,
      unit: product.unit,
      pricePerUnit: product.pricePerUnit,
      total: calculateTotal(lineItem.quantity, product.pricePerUnit),
      vatRate: product.vat,
    });
  };

  // Safely check if suggestions exist and have length
  const hasSuggestions = Array.isArray(productSuggestions) && productSuggestions.length > 0;
  
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-4">
        <Popover open={suggestionsOpen && hasSuggestions} onOpenChange={setSuggestionsOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input 
                value={lineItem.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Product of dienst"
                className="w-full"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Zoek product..." value={title} onValueChange={handleDescriptionChange} />
              <CommandEmpty>Geen producten gevonden.</CommandEmpty>
              <CommandGroup>
                {(productSuggestions || []).map((product, index) => (
                  <CommandItem 
                    key={index}
                    onSelect={() => handleSelectProduct(product)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{product.title}</span>
                      <span className="text-xs text-muted-foreground">{product.description}</span>
                      <span className="text-xs">{formatCurrency(product.pricePerUnit)} per {product.unit}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="col-span-1">
        <Input 
          type="number" 
          min="0" 
          step="0.01"
          value={lineItem.quantity.toString()}
          onChange={(e) => handleQuantityChange(e.target.value)}
          className="text-center"
        />
      </div>
      
      <div className="col-span-2">
        <Select 
          value={lineItem.unit} 
          onValueChange={handleUnitChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Eenheid" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stuk">Stuk</SelectItem>
            <SelectItem value="m²">m²</SelectItem>
            <SelectItem value="m³">m³</SelectItem>
            <SelectItem value="meter">meter</SelectItem>
            <SelectItem value="uur">Uur</SelectItem>
            <SelectItem value="dag">Dag</SelectItem>
            <SelectItem value="set">Set</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="col-span-1">
        <Select 
          value={lineItem.vatRate?.toString() || "21"} 
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
          value={lineItem.pricePerUnit.toString()}
          onChange={(e) => handlePricePerUnitChange(e.target.value)}
          className="text-right"
        />
      </div>
      
      <div className="col-span-1 text-right font-medium">
        {formatCurrency(lineItem.total)}
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
