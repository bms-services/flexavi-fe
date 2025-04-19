
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

interface Product {
  title: string;
  description: string;
  unit: string;
  pricePerUnit: number;
  vat: number;
}

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
  productSuggestions = [],
  onProductSearch,
}) => {
  const [title, setTitle] = useState(description || "");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Waarborg dat productSuggestions altijd een array is om "undefined is not iterable" fout te voorkomen
  const suggestions = Array.isArray(productSuggestions) ? productSuggestions : [];
  const hasSuggestions = suggestions.length > 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleDescriptionChange = (value: string) => {
    setTitle(value);
    onDescriptionChange(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      if (value && value.trim().length > 0) {
        onProductSearch(value);
        if (value.length > 2) {
          setSuggestionsOpen(true);
        }
      } else {
        // Als de input leeg is, sluiten we de suggesties
        setSuggestionsOpen(false);
      }
    }, 300);
  };

  // Maak de timeout schoon bij unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Voorkom renderproblemen door veilige waarden vast te stellen
  const safeDescription = description || "";
  
  return (
    <Popover 
      open={suggestionsOpen && hasSuggestions} 
      onOpenChange={(open) => {
        if (!open || hasSuggestions) {
          setSuggestionsOpen(open);
        }
      }}
    >
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
      {hasSuggestions && (
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Zoek product..." 
              value={title} 
              onValueChange={handleDescriptionChange} 
            />
            <CommandEmpty>Geen producten gevonden.</CommandEmpty>
            {suggestions.length > 0 && (
              <CommandGroup>
                {suggestions.map((product, index) => (
                  <CommandItem 
                    key={index}
                    onSelect={() => {
                      onProductSelect(product);
                      setSuggestionsOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{product.title}</span>
                      <span className="text-xs text-muted-foreground">{product.description}</span>
                      <span className="text-xs">{formatCurrency(product.pricePerUnit)} per {product.unit}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
};
