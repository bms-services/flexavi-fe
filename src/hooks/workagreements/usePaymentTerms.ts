
import { PaymentMethod, PaymentInstallment } from "@/types";

export const usePaymentTerms = (
  workAgreement: WorkAgreement,
  setWorkAgreement: (wa: WorkAgreement) => void
) => {
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setWorkAgreement({
      ...workAgreement,
      paymentMethod: method
    });
  };

  const handleCashPaymentAmountChange = (amount: number) => {
    setWorkAgreement({
      ...workAgreement,
      cashPaymentAmount: amount
    });
  };

  const handlePaymentInstallmentsChange = (installments: PaymentInstallment[]) => {
    setWorkAgreement({
      ...workAgreement,
      paymentInstallments: installments
    });
  };

  return {
    handlePaymentMethodChange,
    handleCashPaymentAmountChange,
    handlePaymentInstallmentsChange
  };
};
