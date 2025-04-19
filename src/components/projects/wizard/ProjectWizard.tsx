
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProjectWizardSteps } from './ProjectWizardSteps';
import { ProjectWizardNav } from './ProjectWizardNav';
import { useProjectWizard } from './useProjectWizard';

interface ProjectWizardProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectWizard: React.FC<ProjectWizardProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoPrevious,
    isLastStep,
    wizardData,
    setWizardData,
  } = useProjectWizard();

  const navigate = useNavigate();

  const handleFinish = () => {
    console.log('Wizard completed with data:', wizardData);
    onOpenChange(false);
    navigate(`/projects/${wizardData.projectId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0">
        <div className="flex min-h-[600px]">
          <ProjectWizardSteps currentStep={currentStep} />
          
          <div className="flex-1 p-6">
            <ProjectWizardNav 
              currentStep={currentStep} 
              onNext={goToNextStep}
              onPrevious={goToPreviousStep}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
              isLastStep={isLastStep}
              onFinish={handleFinish}
              wizardData={wizardData}
              setWizardData={setWizardData}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
