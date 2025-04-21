
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
  label?: string; // Add the label property
}

export const ProductSearch: React.FC<ProductSearchProps> = ({ 
  value, 
  onChange, 
  suggestions, 
  onSearch,
  disabled = false,
  label = "Omschrijving" // Default label
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
              {suggestions?.map((suggestion, index) => (
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
