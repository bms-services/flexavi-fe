
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WizardData } from './useProjectWizard';

interface ProjectWizardNavProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastStep: boolean;
  onFinish: () => void;
  wizardData: WizardData;
  setWizardData: (data: WizardData) => void;
}

export const ProjectWizardNav: React.FC<ProjectWizardNavProps> = ({
  currentStep,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastStep,
  onFinish,
  wizardData,
  setWizardData,
}) => {
  return (
    <div className="flex justify-between mt-6">
      <Button
        onClick={onPrevious}
        variant="outline"
        disabled={!canGoPrevious}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Vorige
      </Button>

      {isLastStep ? (
        <Button onClick={onFinish}>
          Project aanmaken
        </Button>
      ) : (
        <Button onClick={onNext} disabled={!canGoNext}>
          Volgende
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
