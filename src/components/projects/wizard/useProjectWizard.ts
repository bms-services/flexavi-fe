
import { useState } from 'react';
import { Project } from '@/types/project';

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
  const [wizardData, setWizardData] = useState<WizardData>({});

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

  const canGoNext = currentStep < TOTAL_STEPS - 1;
  const canGoPrevious = currentStep > 0;
  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoPrevious,
    isLastStep,
    wizardData,
    setWizardData,
  };
};
