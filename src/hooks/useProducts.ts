
import { mockProducts } from "@/data/mockProducts";
import { Product } from "@/types/product";

export const useProducts = () => {
  const searchProducts = (query: string): Product[] => {
    if (!query || query.trim().length < 2) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return mockProducts.filter(product => 
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
    );
  };

  return {
    searchProducts
  };
};
