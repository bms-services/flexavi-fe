import React from "react";
import { ProductRes } from "@/zustand/types/productT";

interface Props {
  visible: boolean;
  products?: ProductRes[];
  onSelect: (product: ProductRes) => void;
  loading?: boolean;
}

export const ProductSuggestionDropdown: React.FC<Props> = ({ visible, products, onSelect, loading = false }) => {
  if (!visible) return null;

  if (loading) {
    return (
      <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-4 text-gray-500">Loading...</div>
    );
  }

  if (!products?.length) {
    return (
      <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-4 text-gray-500">No products found.</div>
    );
  }

  return (
    <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
      {products.map((product) => (
        <div key={product.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onMouseDown={() => onSelect(product)}>
          <div>{product.title}</div>
          <div className="text-xs text-gray-500">{product.price} EUR</div>
        </div>
      ))}
    </div>
  );
};