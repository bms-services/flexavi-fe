
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProjectWizardSteps } from './ProjectWizardSteps';
import { ProjectWizardNav } from './ProjectWizardNav';
import { useProjectWizard } from './useProjectWizard';
import { WizardLeadStep } from './steps/WizardLeadStep';
import { WizardQuoteStep } from './steps/WizardQuoteStep';
import { WizardWorkAgreementStep } from './steps/WizardWorkAgreementStep';
import { WizardInvoiceStep } from './steps/WizardInvoiceStep';
import { WizardPersonnelStep } from './steps/WizardPersonnelStep';
import { WizardMaterialStep } from './steps/WizardMaterialStep';
import { WizardTransportStep } from './steps/WizardTransportStep';
import { WizardPhotosStep } from './steps/WizardPhotosStep';

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

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WizardLeadStep wizardData={wizardData} setWizardData={setWizardData} />;
      case 1:
        return <WizardQuoteStep wizardData={wizardData} setWizardData={setWizardData} />;
      case 2:
        return <WizardWorkAgreementStep wizardData={wizardData} setWizardData={setWizardData} />;
      case 3:
        return <WizardInvoiceStep wizardData={wizardData} setWizardData={setWizardData} />;
      case 4:
        return <WizardPersonnelStep wizardData={wizardData} setWizardData={setWizardData} />;
      case 5:
        return <WizardMaterialStep wizardData={wizardData} setWizardData={setWizardData} />;
      case 6:
        return <WizardTransportStep wizardData={wizardData} setWizardData={setWizardData} />;
      case 7:
        return <WizardPhotosStep wizardData={wizardData} setWizardData={setWizardData} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0">
        <div className="flex min-h-[600px]">
          <ProjectWizardSteps currentStep={currentStep} />
          
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex-1 mb-6">
              {renderStepContent()}
            </div>
            
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
