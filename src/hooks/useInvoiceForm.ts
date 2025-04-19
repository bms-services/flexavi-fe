
import { useState, useEffect } from "react";
import { Invoice, QuoteLineItem } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useProducts } from "@/hooks/useProducts";
import { mockInvoices } from "@/data/mockInvoices";
import { mockLeads } from "@/data/mockLeads";
import { Lead } from "@/types";
import { Product } from "@/types/product";

export const useInvoiceForm = (invoiceId?: string) => {
  // Determine if we're creating or editing
  const isEditing = !!invoiceId;
  
  // Get products
  const { searchProducts } = useProducts();

  // State for invoice
  const [invoice, setInvoice] = useState<Invoice>({
    id: invoiceId || `inv-${uuidv4().substring(0, 8)}`,
    leadId: "",
    quoteId: null,
    amount: 0,
    description: "",
    status: "draft",
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lineItems: [],
    location: "",
    notes: "",
  });

  // State for line items
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([
    {
      id: uuidv4(),
      description: "",
      quantity: 1,
      unit: "stuk",
      pricePerUnit: 0,
      total: 0,
      vatRate: 21,
    },
  ]);

  // State for selected customer
  const [selectedCustomer, setSelectedCustomer] = useState<Lead | null>(null);

  // State for product suggestions
  const [productSuggestions, setProductSuggestions] = useState<Record<string, Product[]>>({});

  // Effect to load invoice if editing
  useEffect(() => {
    if (isEditing && invoiceId) {
      // Find invoice in mock data
      const existingInvoice = mockInvoices.find((i) => i.id === invoiceId);
      
      if (existingInvoice) {
        setInvoice({
          ...existingInvoice,
          lineItems: existingInvoice.lineItems || [],
        });
        
        if (existingInvoice.lineItems) {
          setLineItems(existingInvoice.lineItems);
        }
        
        // Find customer
        if (existingInvoice.leadId) {
          const lead = mockLeads.find((l) => l.id === existingInvoice.leadId);
          if (lead) {
            setSelectedCustomer(lead);
          }
        }
      }
    }
  }, [invoiceId, isEditing]);

  // Calculate total
  useEffect(() => {
    const total = lineItems.reduce((sum, item) => sum + item.total, 0);
    setInvoice((prev) => ({ ...prev, amount: total }));
  }, [lineItems]);

  // Handle line item changes
  const handleLineItemChange = (index: number, updatedItem: QuoteLineItem) => {
    const newLineItems = [...lineItems];
    newLineItems[index] = updatedItem;
    setLineItems(newLineItems);
  };

  // Add line item
  const handleAddLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      {
        id: uuidv4(),
        description: "",
        quantity: 1,
        unit: "stuk",
        pricePerUnit: 0,
        total: 0,
        vatRate: 21,
      },
    ]);
  };

  // Remove line item
  const handleRemoveLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle customer selection
  const handleCustomerSelect = (lead: Lead) => {
    setSelectedCustomer(lead);
    setInvoice((prev) => ({ ...prev, leadId: lead.id }));
  };

  // Handle invoice field changes
  const handleInvoiceFieldChange = (field: string, value: string) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  // Get product suggestions
  const getProductSuggestions = (query: string, lineItemId: string) => {
    if (!query || query.length < 2) {
      setProductSuggestions((prev) => ({ ...prev, [lineItemId]: [] }));
      return;
    }

    const results = searchProducts(query);
    setProductSuggestions((prev) => ({ ...prev, [lineItemId]: results }));
  };

  // Save invoice
  const handleSaveInvoice = () => {
    // In a real application, this would send data to the server
    // For now, we'll just log it
    const finalInvoice = {
      ...invoice,
      leadId: selectedCustomer?.id || "",
      lineItems: lineItems,
      updatedAt: new Date().toISOString(),
    };
    
    console.log("Saving invoice:", finalInvoice);
    
    // Mock success message
    alert("Factuur succesvol opgeslagen!");
  };

  return {
    invoice,
    lineItems,
    selectedCustomer,
    productSuggestions,
    totalAmount: invoice.amount,
    isEditing,
    handleLineItemChange,
    handleAddLineItem,
    handleRemoveLineItem,
    handleCustomerSelect,
    handleInvoiceFieldChange,
    getProductSuggestions,
    handleSaveInvoice,
  };
};
