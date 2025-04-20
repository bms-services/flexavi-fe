
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

/**
 * Format a date to a localized string (Dutch)
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Format a percentage
 */
export const formatPercentage = (value: number): string => {
  return `${value}%`;
};
