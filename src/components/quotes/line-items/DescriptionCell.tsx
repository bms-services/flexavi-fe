
import React, { useState } from "react";
import { Product } from "@/types/product";
import { ProductSuggestionDropdown } from "./ProductSuggestionDropdown";

interface DescriptionCellProps {
  value: string;
  onChange: (value: string) => void;
  onProductSearch: (query: string) => void;
  productSuggestions?: Product[];
  onProductSelect: (product: Product) => void;
  disabled?: boolean;
}

export const DescriptionCell: React.FC<DescriptionCellProps> = ({
  value,
  onChange,
  onProductSearch,
  productSuggestions,
  onProductSelect,
  disabled = false,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    onProductSearch(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full bg-transparent border-none outline-none focus:ring-0 focus:outline-none p-0 h-auto text-left"
        disabled={disabled}
        autoComplete="off"
        onFocus={() => productSuggestions && productSuggestions.length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      <ProductSuggestionDropdown
        visible={showSuggestions && !disabled}
        products={productSuggestions}
        onSelect={(product) => {
          onProductSelect(product);
          setShowSuggestions(false);
        }}
      />
    </div>
  );
};
