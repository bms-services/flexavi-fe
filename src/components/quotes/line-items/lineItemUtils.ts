
import { QuoteLineItem } from "@/types";

/**
 * Calculate the total price for a line item including VAT
 */
export const calculateLineItemTotal = (
  pricePerUnit: number,
  quantity: number,
  vatRate: number
): number => {
  const totalExVat = pricePerUnit * quantity;
  return Math.round((totalExVat + totalExVat * (vatRate / 100)) * 100) / 100;
};

/**
 * Update a line item with new field value and recalculate totals if needed
 */
export const updateLineItem = (
  item: QuoteLineItem,
  field: keyof QuoteLineItem,
  value: any
): QuoteLineItem => {
  const updatedItem = { ...item, [field]: value };
  
  // Recalculate total if price, quantity or VAT changes
  if (field === "pricePerUnit" || field === "quantity" || field === "vatRate") {
    const price = field === "pricePerUnit" ? value : item.pricePerUnit;
    const quantity = field === "quantity" ? value : item.quantity;
    const vat = field === "vatRate" ? value : item.vatRate ?? 21;
    
    updatedItem.total = calculateLineItemTotal(price, quantity, vat);
  }
  
  return updatedItem;
};
