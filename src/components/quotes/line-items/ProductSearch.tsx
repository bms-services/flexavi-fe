
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: any[];
  onSearch: (query: string) => void;
  disabled?: boolean;
  label?: string;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({ 
  value, 
  onChange, 
  suggestions = [], // Provide default empty array
  onSearch,
  disabled = false,
  label = "Omschrijving"
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      onChange(newValue);
      if (newValue.length > 2) {
        onSearch(newValue);
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, 300);
  };

  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    onChange(selectedValue);
    setOpen(false);
  };

  // Ensure suggestions is an array to prevent map errors
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  return (
    <Popover open={open && !disabled} onOpenChange={(o) => !disabled && setOpen(o)}>
      <PopoverTrigger asChild>
        <div className="space-y-1">
          {label && <Label>{label}</Label>}
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Omschrijving"
            disabled={disabled}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Zoek product..." />
          <CommandList>
            <CommandEmpty>Geen producten gevonden.</CommandEmpty>
            <CommandGroup>
              {safeSuggestions.map((suggestion, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleSelect(suggestion.title || suggestion.description)}
                >
                  <div className="flex flex-col">
                    <span>{suggestion.title || suggestion.description}</span>
                    {suggestion.price && (
                      <span className="text-xs text-muted-foreground">
                        €{suggestion.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
