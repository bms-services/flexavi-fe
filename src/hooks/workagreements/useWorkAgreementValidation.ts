
import { WorkAgreement, QuoteLineItem } from "@/types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useWorkAgreementValidation = (isEditing: boolean) => {
  const navigate = useNavigate();

  const validateAndSaveWorkAgreement = (
    workAgreement: WorkAgreement,
    selectedCustomer: any,
    selectedQuote: any,
    lineItems: QuoteLineItem[],
    totalAmount: number
  ) => {
    if (!selectedCustomer) {
      toast.error("Selecteer een klant");
      return false;
    }

    if (!selectedQuote) {
      toast.error("Selecteer een offerte");
      return false;
    }

    if (lineItems.some(item => !item.description || item.quantity <= 0)) {
      toast.error("Vul alle velden van de werkzaamheden in");
      return false;
    }

    if (workAgreement.paymentInstallments && workAgreement.paymentInstallments.length > 0) {
      const totalPercentage = workAgreement.paymentInstallments.reduce(
        (sum, { percentage }) => sum + percentage,
        0
      );

      if (totalPercentage !== 100) {
        toast.error("Betaaltermijnen moeten in totaal 100% zijn");
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
      toast.success("Werkovereenkomst bijgewerkt");
    } else {
      toast.success("Nieuwe werkovereenkomst aangemaakt");
    }

    navigate("/workagreements");
    return true;
  };

  return {
    validateAndSaveWorkAgreement
  };
};
