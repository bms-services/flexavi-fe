import { useState, useEffect } from "react";
import { WorkAgreement, QuoteLineItem, Lead, Quote, WorkAgreementStatus } from "@/types";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { mockLeads, mockQuotes } from "@/data/mockData";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";

type PaymentMethod = "bank" | "cash" | "both";

type PaymentInstallment = {
  percentage: number;
  description: string;
  dueType: "upfront" | "start" | "during" | "completion";
};

export const useWorkAgreementForm = (workAgreementId?: string) => {
  const navigate = useNavigate();
  const isEditing = !!workAgreementId;

  // Initialize with empty work agreement
  const [workAgreement, setWorkAgreement] = useState<WorkAgreement>({
    id: workAgreementId || `wa-${Date.now().toString(36)}`,
    quoteId: "",
    leadId: "",
    totalAmount: 0,
    description: "",
    status: "draft",
    workDescription: "",
    warranty: "1",
    startDate: new Date().toISOString(),
    companySignature: "data:image/png;base64,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",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lineItems: [],
    exclusions: [
      "Werkzaamheden die niet genoemd zijn vallen buiten deze werkovereenkomst",
      "Werkzaamheden aan asbesthoudende materialen",
      "Werkzaamheden anders dan omschreven",
      "Parkeerkosten"
    ],
    paymentMethod: "bank",
    paymentInstallments: [
      {
        percentage: 30,
        description: "Aanbetaling",
        dueType: "upfront"
      },
      {
        percentage: 30,
        description: "Bij aanvang werkzaamheden",
        dueType: "start"
      },
      {
        percentage: 30,
        description: "Tussentijdse betaling",
        dueType: "during"
      },
      {
        percentage: 10,
        description: "Bij oplevering",
        dueType: "completion"
      }
    ]
  });

  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Lead | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [productSuggestions, setProductSuggestions] = useState<Record<string, Product[]>>({});

  const { searchProducts } = useProducts();

  const totalAmount = lineItems.reduce((sum, item) => sum + (parseFloat(String(item.total)) || 0), 0);

  useEffect(() => {
    if (isEditing && workAgreementId) {
      const foundWorkAgreement = mockWorkAgreements.find(wa => wa.id === workAgreementId);
      
      if (foundWorkAgreement) {
        setWorkAgreement(foundWorkAgreement);
        
        setLineItems(Array.isArray(foundWorkAgreement.lineItems) && foundWorkAgreement.lineItems.length > 0 
          ? foundWorkAgreement.lineItems 
          : []);
        
        const customer = mockLeads.find(l => l.id === foundWorkAgreement.leadId);
        if (customer) {
          setSelectedCustomer(customer);
        }

        const quote = mockQuotes.find(q => q.id === foundWorkAgreement.quoteId);
        if (quote) {
          setSelectedQuote(quote);
        }
      } else {
        toast.error("Werkovereenkomst niet gevonden");
        navigate("/workagreements");
      }
    }
  }, [workAgreementId, isEditing, navigate]);

  useEffect(() => {
    if (selectedQuote) {
      if (selectedQuote.lineItems && selectedQuote.lineItems.length > 0) {
        setLineItems(selectedQuote.lineItems);
      }
      
      if (!workAgreement.description) {
        setWorkAgreement(prev => ({
          ...prev,
          description: selectedQuote.description,
          workDescription: selectedQuote.description
        }));
      }
      
      if (selectedQuote.leadId && !selectedCustomer) {
        const lead = mockLeads.find(l => l.id === selectedQuote.leadId);
        if (lead) {
          setSelectedCustomer(lead);
          setWorkAgreement(prev => ({
            ...prev,
            leadId: lead.id
          }));
        }
      }
      
      setWorkAgreement(prev => ({
        ...prev,
        quoteId: selectedQuote.id
      }));
      
      setWorkAgreement(prev => ({
        ...prev,
        totalAmount: selectedQuote.amount
      }));
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

  const handleCustomerSelect = (customer: Lead | null) => {
    setSelectedCustomer(customer);
    if (customer) {
      setWorkAgreement(prev => ({ ...prev, leadId: customer.id }));
    } else {
      setWorkAgreement(prev => ({ ...prev, leadId: "" }));
    }
  };

  const handleQuoteSelect = (quote: Quote | null) => {
    setSelectedQuote(quote);
  };

  const handleWorkAgreementFieldChange = (field: string, value: string) => {
    setWorkAgreement(prev => ({ ...prev, [field]: value }));
  };

  const handleExclusionsChange = (exclusions: string[]) => {
    setWorkAgreement(prev => ({ ...prev, exclusions }));
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setWorkAgreement(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const handleCashPaymentAmountChange = (amount: number) => {
    setWorkAgreement(prev => ({
      ...prev,
      cashPaymentAmount: amount
    }));
  };

  const handlePaymentInstallmentsChange = (installments: PaymentInstallment[]) => {
    setWorkAgreement(prev => ({
      ...prev,
      paymentInstallments: installments
    }));
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

  const handleSaveWorkAgreement = () => {
    if (!selectedCustomer) {
      toast.error("Selecteer een klant");
      return;
    }

    if (!selectedQuote) {
      toast.error("Selecteer een offerte");
      return;
    }

    if (lineItems.some(item => !item.description || item.quantity <= 0)) {
      toast.error("Vul alle velden van de werkzaamheden in");
      return;
    }

    if (workAgreement.paymentInstallments && workAgreement.paymentInstallments.length > 0) {
      const totalPercentage = workAgreement.paymentInstallments.reduce(
        (sum, { percentage }) => sum + percentage, 
        0
      );
      
      if (totalPercentage !== 100) {
        toast.error("Betaaltermijnen moeten in totaal 100% zijn");
        return;
      }
    }

    const finalWorkAgreement = {
      ...workAgreement,
      leadId: selectedCustomer.id,
      quoteId: selectedQuote.id,
      totalAmount: totalAmount,
      lineItems: lineItems,
      updatedAt: new Date().toISOString()
    };

    if (isEditing) {
      toast.success("Werkovereenkomst bijgewerkt");
    } else {
      toast.success("Nieuwe werkovereenkomst aangemaakt");
    }
    
    console.log("Saving work agreement:", finalWorkAgreement);
    navigate("/workagreements");
  };

  return {
    workAgreement,
    lineItems,
    selectedCustomer,
    selectedQuote,
    productSuggestions,
    totalAmount,
    isEditing,
    handleLineItemChange,
    handleAddLineItem,
    handleRemoveLineItem,
    handleCustomerSelect,
    handleQuoteSelect,
    handleWorkAgreementFieldChange,
    getProductSuggestions,
    handleSaveWorkAgreement,
    handleExclusionsChange,
    handlePaymentMethodChange,
    handleCashPaymentAmountChange,
    handlePaymentInstallmentsChange,
  };
};
