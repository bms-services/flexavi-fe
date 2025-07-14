
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProjectWizardSteps } from './ProjectWizardSteps';
import { ProjectWizardNav } from './ProjectWizardNav';
import { WizardLeadStep } from './steps/WizardLeadStep';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProjectReq } from '@/zustand/types/projectT';
import { FormProvider, useForm } from 'react-hook-form';
import { WizardQuoteStep } from './steps/WizardQuoteStep';
import { WizardWorkAgreementStep } from './steps/WizardWorkAgreementStep';
import { WizardInvoiceStep } from './steps/WizardInvoiceStep';
import { WizardEmployeeStep } from './steps/WizardEmployeeStep';

interface ProjectWizardProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultProjectData: ProjectReq = {
  name: '',
  description: '',
  status: 'active',
  start_date: '',
  budget: 0,
  profit: 0,
  address: {
    street: '',
    postal_code: '',
    house_number: '',
    house_number_addition: '',
    city: '',
    province: ''
  },
  leads: [],
  quotes: [],
  agreements: [],
  invoices: [],
  staffs: [],
  materials: [],
  transports: []
}

export const ProjectWizard: React.FC<ProjectWizardProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const methods = useForm<ProjectReq>({
    defaultValues: defaultProjectData,
  });

  const onSubmit = (data: ProjectReq) => {

  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WizardLeadStep />;
      case 1:
        return <WizardQuoteStep />;
      case 2:
        return <WizardWorkAgreementStep />;
      case 3:
        return <WizardInvoiceStep />;
      case 4:
        return <WizardEmployeeStep />;
      // case 5:
      //   return <WizardMaterialStep />;
      // case 6:
      //   return <WizardTransportStep />;
      // case 7:
      //   return <WizardPhotosStep />;
      default:
        return null;
    }
  };


  const validateStep = async () => {
    switch (currentStep) {
      case 0:
        {
          const leadValid = await methods.trigger("leads");
          return leadValid;
        }
      case 1:
        return await methods.trigger("quotes");
      case 2:
        return await methods.trigger("agreements");
      case 3:
        return await methods.trigger("invoices");
      case 4:
        return await methods.trigger("staffs");
      default:
        return true;
    }
  };

  const goToNextStep = async () => {
    const isValid = await validateStep();
    if (!isValid) return;

    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const canGoPrevious = currentStep > 0;
  const isLastStep = currentStep === 7;
  const canGoNext = true;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent
            className={`!p-0 max-w-4xl w-full rounded-md !overflow-visible
        ${isMobile ? 'max-w-full min-h-[90vh] p-0 flex flex-col' : 'p-0'}
        `}
          >
            <div
              className={`
            flex ${isMobile ? 'flex-col min-h-[90vh] h-full' : 'min-h-[600px]'}
          `}
            >
              <ProjectWizardSteps currentStep={currentStep} />
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1 mb-6">
                  {renderStepContent()}
                </div>

                <ProjectWizardNav
                  onNext={goToNextStep}
                  onPrevious={goToPreviousStep}
                  canGoNext={canGoNext}
                  canGoPrevious={canGoPrevious}
                  isLastStep={isLastStep}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form >
    </FormProvider>
  );
};



{/* Sidebar on desktop, bottom bar on mobile */ }
{/* {isMobile ? (
                <>
                  <div className="flex-1 p-4 pt-6 flex flex-col min-h-0">
                    <div className="flex-1 mb-4 min-h-0">
                      {renderStepContent()}
                    </div>
                    <ProjectWizardNav
                      onNext={goToNextStep}
                      onPrevious={goToPreviousStep}
                      canGoNext={canGoNext}
                      canGoPrevious={canGoPrevious}
                      isLastStep={isLastStep}
                    />
                  </div>
                  <div className="border-t bg-muted/50 w-full py-2">
                    <ProjectWizardSteps currentStep={currentStep} />
                  </div>
                </>
              ) : (
                <>
                  <ProjectWizardSteps currentStep={currentStep} />
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex-1 mb-6">
                      {renderStepContent()}
                    </div>

                    <ProjectWizardNav
                      onNext={goToNextStep}
                      onPrevious={goToPreviousStep}
                      canGoNext={canGoNext}
                      canGoPrevious={canGoPrevious}
                      isLastStep={isLastStep}
                    />
                  </div>
                </>
              )} */}