import { useState, useEffect } from "react";
import { Quote, QuoteLineItem, Lead } from "@/types";
import { mockQuotes, mockLeads } from "@/data/mockData";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";

const createEmptyLineItem = (): QuoteLineItem => ({
  id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  description: "",
  quantity: 1,
  unit: "stuk",
  pricePerUnit: 0,
  total: 0,
  vatRate: 21,
});

// Empty quote template
const emptyQuote: Omit<Quote, "id" | "createdAt" | "updatedAt"> = {
  leadId: "",
  amount: 0,
  description: "",
  status: "draft",
  lineItems: [],
  location: "",
  plannedStartDate: new Date().toISOString(),
  notes: "",
};

export const useQuoteForm = (quoteId?: string) => {
  const navigate = useNavigate();
  const isEditing = !!quoteId;

  const [quote, setQuote] = useState<Omit<Quote, "id" | "createdAt" | "updatedAt">>(emptyQuote);
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([createEmptyLineItem()]);
  const [selectedCustomer, setSelectedCustomer] = useState<Lead | null>(null);
  const [productSuggestions, setProductSuggestions] = useState<Record<string, any[]>>({});

  const { searchProducts } = useProducts();

  // Calculate total amount
  const totalAmount = lineItems.reduce((sum, item) => sum + item.total, 0);

  // Load quote data when editing
  useEffect(() => {
    if (isEditing && quoteId) {
      const quotes = Array.isArray(mockQuotes) ? mockQuotes : [];
      const foundQuote = quotes.find(q => q.id === quoteId);
      
      if (foundQuote) {
        setQuote({
          leadId: foundQuote.leadId,
          amount: foundQuote.amount,
          description: foundQuote.description,
          status: foundQuote.status,
          location: foundQuote.location || "",
          plannedStartDate: foundQuote.plannedStartDate || new Date().toISOString(),
          notes: foundQuote.notes || "",
          lineItems: Array.isArray(foundQuote.lineItems) ? foundQuote.lineItems : [],
        });
        
        setLineItems(Array.isArray(foundQuote.lineItems) && foundQuote.lineItems.length > 0 
          ? foundQuote.lineItems 
          : [createEmptyLineItem()]);
        
        const leads = Array.isArray(mockLeads) ? mockLeads : [];
        const customer = leads.find(l => l.id === foundQuote.leadId);
        if (customer) {
          setSelectedCustomer(customer);
        }
      } else {
        toast.error("Offerte niet gevonden");
        navigate("/quotes");
      }
    }
  }, [quoteId, isEditing, navigate]);

  const handleLineItemChange = (index: number, updatedItem: QuoteLineItem) => {
    const newLineItems = [...lineItems];
    newLineItems[index] = updatedItem;
    setLineItems(newLineItems);
  };

  const handleAddLineItem = () => {
    setLineItems([...lineItems, createEmptyLineItem()]);
  };

  const handleRemoveLineItem = (index: number) => {
    if (lineItems.length > 1) {
      const newLineItems = [...lineItems];
      newLineItems.splice(index, 1);
      setLineItems(newLineItems);
    }
  };

  const handleCustomerSelect = (customer: Lead | null) => {
    setSelectedCustomer(customer);
    if (customer) {
      setQuote(prev => ({ ...prev, leadId: customer.id }));
    } else {
      setQuote(prev => ({ ...prev, leadId: "" }));
    }
  };

  const handleQuoteFieldChange = (field: string, value: string) => {
    setQuote(prev => ({ ...prev, [field]: value }));
  };

  const getProductSuggestions = (title: string, index: string) => {
    // Validate parameters to prevent undefined errors
    if (!title || !index || typeof title !== 'string' || typeof index !== 'string' || title.trim().length <= 2) {
      setProductSuggestions(prev => ({ 
        ...prev, 
        [index]: [] 
      }));
      return;
    }
    
    const suggestions = searchProducts(title);
    
    // Update suggestions for this specific line item
    setProductSuggestions(prev => ({ 
      ...prev, 
      [index]: suggestions 
    }));
  };

  const handleSaveQuote = () => {
    if (!selectedCustomer) {
      toast.error("Selecteer een klant");
      return;
    }

    if (lineItems.some(item => !item.description || item.quantity <= 0)) {
      toast.error("Vul alle velden van de offerteregels in");
      return;
    }

    const finalQuote = {
      ...quote,
      leadId: selectedCustomer.id,
      amount: totalAmount,
      lineItems: lineItems,
    };

    if (isEditing) {
      toast.success("Offerte bijgewerkt");
    } else {
      toast.success("Nieuwe offerte aangemaakt");
    }
    
    console.log("Saving quote:", finalQuote);
    navigate("/quotes");
  };

  return {
    quote,
    lineItems,
    selectedCustomer,
    productSuggestions,
    totalAmount,
    isEditing,
    handleLineItemChange,
    handleAddLineItem,
    handleRemoveLineItem,
    handleCustomerSelect,
    handleQuoteFieldChange,
    getProductSuggestions,
    handleSaveQuote,
  };
};
