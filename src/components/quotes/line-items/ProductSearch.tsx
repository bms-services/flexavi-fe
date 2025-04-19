
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Product } from "@/types/product";

interface ProductSearchProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  onProductSelect: (product: Product) => void;
  productSuggestions: Product[];
  onProductSearch: (title: string) => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  description,
  onDescriptionChange,
  onProductSelect,
  productSuggestions,
  onProductSearch,
}) => {
  const [open, setOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Ensure we always have valid arrays and strings
  const suggestions = Array.isArray(productSuggestions) ? productSuggestions : [];
  const safeDescription = description || "";

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleDescriptionChange = (value: string) => {
    onDescriptionChange(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      if (value && value.trim().length > 1) {
        onProductSearch(value);
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, 300);
  };

  // Show popup when we have suggestions
  useEffect(() => {
    if (suggestions.length > 0 && safeDescription.trim().length > 1) {
      setOpen(true);
    }
  }, [suggestions, safeDescription]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <Popover open={open && suggestions.length > 0} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input 
            value={safeDescription}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Product of dienst"
            className="w-full"
          />
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Zoek product..." 
            value={safeDescription} 
            onValueChange={handleDescriptionChange} 
            className="h-9"
          />
          <CommandEmpty>Geen producten gevonden.</CommandEmpty>
          <CommandGroup>
            {suggestions.map((product) => (
              <CommandItem 
                key={product.id}
                onSelect={() => {
                  onProductSelect(product);
                  setOpen(false);
                }}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{product.title}</span>
                  <span className="text-xs text-muted-foreground">{product.description}</span>
                  <span className="text-xs">
                    {formatCurrency(product.pricePerUnit)} per {product.unit}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
