
import { mockProducts } from "@/data/mockProducts";
import { Product } from "@/types/product";

export const useProducts = () => {
  const searchProducts = (query: string): Product[] => {
    // Return empty array for invalid queries
    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return [];
    }
    
    try {
      const normalizedQuery = query.toLowerCase().trim();
      
      return mockProducts.filter(product => 
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      );
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  };

  const getProductById = (id: string): Product | undefined => {
    if (!id) return undefined;
    
    try {
      return mockProducts.find(product => product.id === id);
    } catch (error) {
      console.error("Error getting product by ID:", error);
      return undefined;
    }
  };

  const getAllProducts = (): Product[] => {
    try {
      return [...mockProducts];
    } catch (error) {
      console.error("Error getting all products:", error);
      return [];
    }
  };

  return {
    searchProducts,
    getProductById,
    getAllProducts
  };
};
