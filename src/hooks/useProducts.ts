
import { mockProducts } from "@/data/mockProducts";
import { Product } from "@/types/product";

export const useProducts = () => {
  const searchProducts = (query: string): Product[] => {
    // Return empty array for invalid queries
    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return [];
    }
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return mockProducts.filter(product => 
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
    );
  };

  const getProductById = (id: string): Product | undefined => {
    if (!id) return undefined;
    return mockProducts.find(product => product.id === id);
  };

  const getAllProducts = (): Product[] => {
    return [...mockProducts];
  };

  return {
    searchProducts,
    getProductById,
    getAllProducts
  };
};
