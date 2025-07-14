
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectWizardNavProps {
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastStep: boolean;
}

export const ProjectWizardNav: React.FC<ProjectWizardNavProps> = ({
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastStep,
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
        <Button type='submit'>
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
