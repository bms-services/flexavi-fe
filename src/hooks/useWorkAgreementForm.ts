
import { WorkAgreement, Lead, Quote } from "@/types";
import { toast } from "sonner";
import { useWorkAgreementState } from "./workagreements/useWorkAgreementState";
import { useLineItems } from "./workagreements/useLineItems";
import { usePaymentTerms } from "./workagreements/usePaymentTerms";

export const useWorkAgreementForm = (workAgreementId?: string) => {
  const {
    workAgreement,
    setWorkAgreement,
    selectedCustomer,
    setSelectedCustomer,
    selectedQuote,
    setSelectedQuote,
    isEditing
  } = useWorkAgreementState(workAgreementId);

  const {
    lineItems,
    totalAmount,
    productSuggestions,
    handleLineItemChange,
    handleAddLineItem,
    handleRemoveLineItem,
    getProductSuggestions
  } = useLineItems(selectedQuote);

  const {
    handlePaymentMethodChange,
    handleCashPaymentAmountChange,
    handlePaymentInstallmentsChange
  } = usePaymentTerms(workAgreement, setWorkAgreement);

  useEffect(() => {
    if (selectedQuote) {
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
        quoteId: selectedQuote.id,
        totalAmount: selectedQuote.amount
      }));
    }
  }, [selectedQuote]);

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

    console.log("Saving work agreement:", finalWorkAgreement);
    
    if (isEditing) {
      toast.success("Werkovereenkomst bijgewerkt");
    } else {
      toast.success("Nieuwe werkovereenkomst aangemaakt");
    }
    
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
