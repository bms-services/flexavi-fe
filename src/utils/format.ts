
/**
 * Format a number as currency (Euro)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('nl-NL', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};
