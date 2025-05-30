
import { WorkAgreement, QuoteLineItem, Lead, Quote } from "@/types";
import { useNavigate } from "react-router-dom";


export const useWorkAgreementValidation = (isEditing: boolean) => {
  const navigate = useNavigate();

  const validateAndSaveWorkAgreement = (
    workAgreement: WorkAgreement,
    selectedCustomer: Lead | null,
    selectedQuote: Quote | null,
    lineItems: QuoteLineItem[],
    totalAmount: number
  ) => {
    if (!selectedCustomer) {
      
      return false;
    }

    if (!selectedQuote) {
      
      return false;
    }

    if (lineItems.some(item => !item.description || item.quantity <= 0)) {
      
      return false;
    }

    if (workAgreement.paymentInstallments && workAgreement.paymentInstallments.length > 0) {
      const totalPercentage = workAgreement.paymentInstallments.reduce(
        (sum, { percentage }) => sum + percentage,
        0
      );

      if (totalPercentage !== 100) {
        
        return false;
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
      console.log('Updating work agreement');
    } else {
      console.log('Creating work agreement');
    }

    navigate("/workagreements");
    return true;
  };

  return {
    validateAndSaveWorkAgreement
  };
};
