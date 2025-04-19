
import { useState, useEffect } from "react";
import { QuoteLineItem, Quote } from "@/types";
import { Product } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";

export const useLineItems = (selectedQuote: Quote | null) => {
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([]);
  const [productSuggestions, setProductSuggestions] = useState<Record<string, Product[]>>({});
  const { searchProducts } = useProducts();

  useEffect(() => {
    if (selectedQuote?.lineItems) {
      setLineItems(selectedQuote.lineItems);
    }
  }, [selectedQuote]);

  const handleLineItemChange = (index: number, updatedItem: QuoteLineItem) => {
    const newLineItems = [...lineItems];
    if (index >= 0 && index < newLineItems.length) {
      newLineItems[index] = updatedItem;
      setLineItems(newLineItems);
    }
  };

  const handleAddLineItem = () => {
    setLineItems([...lineItems, {
      id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      description: "",
      quantity: 1,
      unit: "stuk",
      pricePerUnit: 0,
      total: 0,
      vatRate: 21,
    }]);
  };

  const handleRemoveLineItem = (index: number) => {
    if (lineItems.length > 1) {
      const newLineItems = [...lineItems];
      newLineItems.splice(index, 1);
      setLineItems(newLineItems);
    }
  };

  const getProductSuggestions = (title: string, index: string) => {
    if (!title || typeof title !== 'string' || title.trim().length <= 1 || !index) {
      return;
    }
    
    const results = searchProducts(title);
    const safeResults = Array.isArray(results) ? results : [];
    
    setProductSuggestions(prev => ({
      ...prev,
      [index]: safeResults
    }));
  };

  const totalAmount = lineItems.reduce((sum, item) => sum + (parseFloat(String(item.total)) || 0), 0);

  return {
    lineItems,
    totalAmount,
    productSuggestions,
    handleLineItemChange,
    handleAddLineItem,
    handleRemoveLineItem,
    getProductSuggestions
  };
};
