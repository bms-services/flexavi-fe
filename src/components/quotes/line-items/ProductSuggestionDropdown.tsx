
import React from "react";
import { Product } from "@/types/product";

interface ProductSuggestionDropdownProps {
  visible: boolean;
  products?: Product[];
  onSelect: (product: Product) => void;
}

export const ProductSuggestionDropdown: React.FC<ProductSuggestionDropdownProps> = ({
  visible,
  products,
  onSelect,
}) => {
  if (!visible || !products || products.length === 0) return null;

  return (
    <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto left-0 right-0">
      {products.map((product, i) => (
        <div
          key={i}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(product)}
        >
          <div>{product.title}</div>
          <div className="text-xs text-gray-500">{product.pricePerUnit} EUR</div>
        </div>
      ))}
    </div>
  );
};
