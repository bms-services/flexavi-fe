
import { Expense } from "@/types/expenses";
import { format, subDays } from "date-fns";

// Generate random expense data
export const mockExpenses: Expense[] = Array.from({ length: 50 }).map((_, index) => {
  const id = `exp-${index + 1}`;
  const types: Array<Expense['type']> = ['material', 'transport', 'equipment', 'subcontractor', 'other'];
  const statuses: Array<Expense['status']> = ['draft', 'approved', 'rejected', 'pending', 'processed'];
  const companies = [
    'Bouwmarkt Nederland', 
    'Bouwcenter', 
    'Hout Handel B.V.', 
    'Materiaalexpress', 
    'Gereedschapswereld',
    'Transport Partners',
    'Verf Groothandel',
    'Installatiebedrijf De Monteur',
    'Sanitair Specials',
    'Elektroland'
  ];
  
  const descriptions = [
    'Aanschaf bouwmaterialen',
    'Transport materialen naar locatie',
    'Huur steiger',
    'Inhuur onderaannemer',
    'Aanschaf gereedschap',
    'Verf en toebehoren',
    'Sanitaire materialen',
    'Elektra materialen',
    'Hout en plaatmateriaal',
    'Isolatiemateriaal'
  ];
  
  const randomAmount = Math.round(Math.random() * 1000 + 50);
  const randomVatRate = Math.random() > 0.7 ? 9 : 21;
  const vatAmount = Math.round(randomAmount * (randomVatRate / 100));
  const totalAmount = randomAmount + vatAmount;
  
  // Select a random project ID from 1-15
  const projectId = Math.random() > 0.3 ? `proj-${Math.floor(Math.random() * 15) + 1}` : undefined;
  // Only assign invoice ID to approved expenses sometimes
  const invoiceId = Math.random() > 0.7 && statuses[index % statuses.length] === 'approved' 
    ? `inv-${Math.floor(Math.random() * 10) + 1}` 
    : undefined;
  
  // Create a random date within the last 90 days
  const randomDaysAgo = Math.floor(Math.random() * 90);
  const date = format(subDays(new Date(), randomDaysAgo), 'yyyy-MM-dd');
  const createdAt = format(subDays(new Date(), randomDaysAgo - 1), 'yyyy-MM-dd\'T\'HH:mm:ss');
  const updatedAt = format(subDays(new Date(), Math.max(0, randomDaysAgo - 2)), 'yyyy-MM-dd\'T\'HH:mm:ss');

  // Generate random receipt URL for some expenses
  const hasReceipt = Math.random() > 0.3;
  const receiptId = hasReceipt ? `receipt-${id}` : undefined;
  const receiptUrl = hasReceipt ? `/images/receipts/receipt-${(index % 5) + 1}.jpg` : undefined;
  
  // Generate random tags
  const allTags = ['urgent', 'reviewed', 'budgeted', 'fixed-price', 'variable', 'travel', 'tools', 'materials'];
  const tags = Math.random() > 0.5 
    ? Array.from(new Set([
        allTags[Math.floor(Math.random() * allTags.length)], 
        allTags[Math.floor(Math.random() * allTags.length)]
      ]))
    : undefined;
    
  return {
    id,
    receiptId,
    receiptUrl,
    company: companies[index % companies.length],
    description: descriptions[index % descriptions.length],
    amount: randomAmount,
    vatRate: randomVatRate,
    vatAmount,
    totalAmount,
    date,
    type: types[index % types.length],
    status: statuses[index % statuses.length],
    projectId,
    invoiceId,
    tags,
    notes: Math.random() > 0.7 ? 'Aanvullende notities voor deze uitgave.' : undefined,
    createdAt,
    updatedAt,
    processedBy: statuses[index % statuses.length] === 'processed' ? 'Jan Janssen' : undefined,
    processedAt: statuses[index % statuses.length] === 'processed' 
      ? format(subDays(new Date(), Math.max(0, randomDaysAgo - 3)), 'yyyy-MM-dd\'T\'HH:mm:ss')
      : undefined
  };
});

// Export function to get a specific expense by ID
export const getExpenseById = (id: string): Expense | undefined => {
  return mockExpenses.find(expense => expense.id === id);
};

// Update our mockData.ts to include the mockExpenses
export const updateMockData = () => {
  // This is just for documentation, as we're already exporting mockExpenses directly
};
