import React from "react";
import { ProductRes } from "@/zustand/types/productT";
import { formatEuro } from "@/utils/format";
import * as Portal from "@radix-ui/react-portal";

interface Props {
  visible: boolean;
  products: ProductRes[];
  onSelect: (product: ProductRes) => void;
  loading?: boolean;
  anchorRef: React.RefObject<HTMLInputElement>;
}

export const ProductSuggestionDropdown: React.FC<Props> = ({
  visible,
  products,
  onSelect,
  loading = false,
  anchorRef,
}) => {
  if (!visible || !anchorRef.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return (
    <Portal.Root>
      <div
        style={{
          position: "absolute",
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          zIndex: 9999,
        }}
        className="bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
      >
        {loading && (
          <div className="p-4 text-gray-500">Loading...</div>
        )}
        {!loading && !products?.length && (
          <div className="p-4 text-gray-500">No products found.</div>
        )}
        {!loading && products.map((product) => (
          <div
            key={product.id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onMouseDown={() => onSelect(product)}
          >
            <div>{product.title}</div>
            <div className="text-xs text-gray-500">{formatEuro(product.price)}</div>
          </div>
        ))}
      </div>
    </Portal.Root>
  );
};