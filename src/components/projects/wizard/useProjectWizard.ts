
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface WizardData {
  projectId?: string;
  leadId?: string;
  quoteId?: string;
  workAgreementId?: string;
  invoiceId?: string;
  photos?: { name: string; url: string }[];
}

export const useProjectWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>({
    projectId: `proj-${uuidv4().slice(0, 8)}`,
    photos: []
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

  // For lead step, next button is enabled when a lead is selected
  const canGoNext = () => {
    if (currentStep === 0) return !!wizardData.leadId;
    return true;
  };

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    canGoNext: canGoNext(),
    canGoPrevious: currentStep > 0,
    isLastStep: currentStep === TOTAL_STEPS - 1,
    wizardData,
    setWizardData,
  };
};
