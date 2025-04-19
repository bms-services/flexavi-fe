
import { useState } from 'react';
import { WorkAgreement } from '@/types';

export const useWorkAgreementWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [workAgreement, setWorkAgreement] = useState<WorkAgreement>({
    id: `wa-${Date.now().toString(36)}`,
    quoteId: "",
    leadId: "",
    totalAmount: 0,
    description: "",
    status: "draft",
    workDescription: "",
    warranty: "1",
    startDate: new Date().toISOString(),
    companySignature: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lineItems: []
  });

  const TOTAL_STEPS = 5;

  const goToNextStep = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(current => current + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1);
    }
  };

  const canGoNext = () => {
    if (currentStep === 0) return !!workAgreement.leadId;
    if (currentStep === 1) return !!workAgreement.quoteId;
    return true;
  };

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    canGoNext: canGoNext(),
    canGoPrevious: currentStep > 0,
    isLastStep: currentStep === TOTAL_STEPS - 1,
    workAgreement,
    setWorkAgreement,
  };
};
