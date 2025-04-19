
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import { Search, Check } from "lucide-react";

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
  const safeDescription = typeof description === 'string' ? description : '';

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
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek product..."
            value={safeDescription}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="pl-8 border-none shadow-none focus-visible:ring-0"
          />
        </div>

        {suggestions.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Geen producten gevonden.
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto p-2">
            {suggestions.map((product) => (
              <Button
                key={product.id}
                variant="ghost"
                className="w-full justify-start text-left px-2 py-1.5 h-auto"
                onClick={() => {
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
              </Button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
