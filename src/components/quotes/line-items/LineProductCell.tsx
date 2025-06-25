import React, { useState, useMemo } from 'react';
import { ProductSuggestionDropdown } from './ProductSuggestionDropdown';
import { useGetProducts } from '@/zustand/hooks/useProduct';
import { ParamGlobal } from '@/zustand/types/apiT';
import { ProductRes } from '@/zustand/types/productT';

interface LineProductCellProps {
  value: string;
  onChange: (value: string) => void;
  onProductSelect: (product: ProductRes) => void;
  disabled?: boolean;
}

export const LineProductCell: React.FC<LineProductCellProps> = ({
  value, onChange, onProductSelect, disabled = false,
}) => {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const params: ParamGlobal = useMemo(() => ({
    page: 1, per_page: 10, search, filters: {}, sorts: {},
  }), [search]);

  const { data, isLoading } = useGetProducts(params);
  const productSuggestions = data?.result?.data || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setSearch(newValue);
    setShowSuggestions(true);
  };

  const handleSelectProduct = (product: ProductRes) => {
    onProductSelect(product);
    setSearch("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        disabled={disabled}
        autoComplete="off"
        className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-left"
      />

      <ProductSuggestionDropdown
        visible={showSuggestions && productSuggestions.length > 0 && search.length >= 1}
        products={productSuggestions}
        onSelect={handleSelectProduct}
        loading={isLoading}
      />
    </div>
  );
};