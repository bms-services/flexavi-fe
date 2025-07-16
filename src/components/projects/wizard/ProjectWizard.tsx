
import React, { useEffect, useState } from 'react';
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
import { WizardMaterialStep } from './steps/WizardMaterialStep';
import { WizardTransportStep } from './steps/WizardTransportStep';
import { WizardPhotosStep } from './steps/WizardPhotosStep';
import { WizardInformation } from './steps/WizardInformation';
import { useCreateProject } from '@/zustand/hooks/useProject';

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
  transports: [],
  photos: []
}

export const ProjectWizard: React.FC<ProjectWizardProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const createProjectZ = useCreateProject();

  const methods = useForm<ProjectReq>({
    defaultValues: defaultProjectData,
    mode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: false,
  });

  const onSubmit = (data: ProjectReq) => {
    console.log('Submitting project data:', data);
    const formData = new FormData();

    // Basic project info
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('status', data.status);
    formData.append('start_date', data.start_date);
    formData.append('budget', String(data.budget));

    // Address
    formData.append('address[street]', data.address.street);
    formData.append('address[postal_code]', typeof data.address.postal_code === 'object' ?
      data.address.postal_code.value : data.address.postal_code);
    formData.append('address[house_number]', data.address.house_number);
    formData.append('address[house_number_addition]', data.address.house_number_addition || '');
    formData.append('address[city]', data.address.city);
    formData.append('address[province]', data.address.province);

    // Relations - Arrays (leads, quotes, agreements, invoices)
    if (data.leads && data.leads.length > 0) {
      data.leads.forEach(leadId => {
        formData.append('leads[]', leadId as string);
      });
    }

    if (data.quotes && data.quotes.length > 0) {
      data.quotes.forEach(quoteId => {
        formData.append('quotes[]', quoteId as string);
      });
    }

    if (data.agreements && data.agreements.length > 0) {
      data.agreements.forEach(agreementId => {
        formData.append('agreements[]', agreementId as string);
      });
    }

    if (data.invoices && data.invoices.length > 0) {
      data.invoices.forEach(invoiceId => {
        formData.append('invoices[]', invoiceId as string);
      });
    }

    // Staff with additional properties
    // if (data.staffs && data.staffs.length > 0) {
    //   data.staffs.forEach((staff, index) => {
    //     // Check if staff has expected structure
    //     if (typeof staff === 'object' && staff !== null) {
    //       // If it's a complex object with properties
    //       if ('company_users_id' in staff) {
    //         formData.append(`staffs[${index}][company_users_id]`, staff.company_users_id);
    //         formData.append(`staffs[${index}][number_of_day]`, String(staff.number_of_day || 1));
    //       } else {
    //         // If it's just an ID
    //         formData.append(`staffs[]`, String(staff));
    //       }
    //     } else {
    //       // If it's just an ID string
    //       formData.append(`staffs[]`, String(staff));
    //     }
    //   });
    // }

    if (data.staffs && data.staffs.length > 0) {
      data.staffs.forEach((staff) => {
        formData.append('invoices[]', staff as string);
      });
    }

    // Materials
    if (data.materials && data.materials.length > 0) {
      data.materials.forEach((material, index) => {
        formData.append(`materials[${index}][description]`, material.description);
        formData.append(`materials[${index}][amount]`, String(material.amount));
      });
    }

    // Transports
    if (data.transports && data.transports.length > 0) {
      data.transports.forEach((transport, index) => {
        formData.append(`transports[${index}][description]`, transport.description);
        formData.append(`transports[${index}][amount]`, String(transport.amount));
      });
    }

    // Photos (handle both string URLs and File objects)
    if (data.photos && data.photos.length > 0) {
      data.photos.forEach((photo, index) => {
        if (typeof photo === 'object' && photo !== null) {
          if (photo.file instanceof File) {
            // If it's a File object
            formData.append(`photos[${index}][file]`, photo.file);
          } else if (photo.file && 'path' in photo.file) {
            // If it's an object with path property
            formData.append(`photos[${index}][file]`, photo.file.path);
          }

          if (photo.name) formData.append(`photos[${index}][name]`, photo.name);
          if (photo.description) formData.append(`photos[${index}][description]`, photo.description || '');
        } else {
          // If it's just a string URL
          formData.append(`photos[]`, String(photo));
        }
      });
    }

    createProjectZ.mutate(formData);
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WizardInformation />;
      case 1:
        return <WizardLeadStep />;
      case 2:
        return <WizardQuoteStep />;
      case 3:
        return <WizardWorkAgreementStep />;
      case 4:
        return <WizardInvoiceStep />;
      case 5:
        return <WizardEmployeeStep />;
      case 6:
        return <WizardMaterialStep />;
      case 7:
        return <WizardTransportStep />;
      case 8:
        return <WizardPhotosStep />;
      default:
        return null;
    }
  };


  const validateStep = async () => {
    const fieldsToValidate = {
      0: [
        "name", "start_date", "budget", "profit",
        "address.street", "address.postal_code", "address.house_number",
        "address.city", "address.province"
      ],
      1: ["leads"],
      2: ["quotes"],
      3: ["agreements"],
      4: ["invoices"],
      5: ["staffs"],
      6: ["materials"],
      7: ["transports"],
      8: ["photos"]
    }[currentStep] || [];

    const results = await Promise.all(
      fieldsToValidate.map(field => methods.trigger(field as unknown))
    );

    // Return true hanya jika semua validasi berhasil
    return results.every(result => result === true);
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
  const isLastStep = currentStep === 8;
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
              className={`flex ${isMobile ? 'flex-col min-h-[90vh] h-full' : 'min-h-[600px]'}`}
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
                  onSubmit={methods.handleSubmit(onSubmit)}
                />
                {/* <Button type="submit"
                  onClick={() => console.log(methods.getValues())}
                  className="mt-4 w-full"
                // disabled={!methods.formState.isValid}
                >
                  Project aanmaken
                </Button> */}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
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