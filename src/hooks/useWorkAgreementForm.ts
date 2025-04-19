
import { WorkAgreement, Lead, Quote } from "@/types";
import { useEffect } from "react";
import { mockLeads } from "@/data/mockData";
import { toast } from "sonner";
import { useWorkAgreementState } from "./workagreements/useWorkAgreementState";
import { useLineItems } from "./workagreements/useLineItems";
import { usePaymentTerms } from "./workagreements/usePaymentTerms";
import { useWorkAgreementValidation } from "./workagreements/useWorkAgreementValidation";

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

  const { validateAndSaveWorkAgreement } = useWorkAgreementValidation(isEditing);

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
    validateAndSaveWorkAgreement(
      workAgreement,
      selectedCustomer,
      selectedQuote,
      lineItems,
      totalAmount
    );
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
