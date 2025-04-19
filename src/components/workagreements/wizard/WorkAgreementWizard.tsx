
import React from 'react';
import { useWorkAgreementWizard } from './useWorkAgreementWizard';
import { WorkAgreementWizardSteps } from './WorkAgreementWizardSteps';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CustomerSearch } from '@/components/quotes/CustomerSearch';
import { QuoteSelector } from '@/components/workagreements/forms/quote-selector/QuoteSelector';
import { WorkDetails } from '@/components/workagreements/forms/work-details/WorkDetails';
import { PaymentTermsForm } from '@/components/workagreements/forms/payment-terms/PaymentTermsForm';
import { WorkAgreementExclusionsForm } from '@/components/workagreements/forms/WorkAgreementExclusionsForm';

export const WorkAgreementWizard = () => {
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoPrevious,
    isLastStep,
    workAgreement,
    setWorkAgreement
  } = useWorkAgreementWizard();

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <CustomerSearch
            selectedCustomer={workAgreement.leadId ? { id: workAgreement.leadId } : null}
            onCustomerSelect={(customer) => 
              setWorkAgreement(prev => ({ ...prev, leadId: customer?.id || "" }))
            }
          />
        );
      case 1:
        return (
          <div className="space-y-4">
            <QuoteSelector
              quote={null}
              filteredQuotes={[]}
              searchTerm=""
              onSearchChange={() => {}}
              onQuoteSelect={(quote) => 
                setWorkAgreement(prev => ({ ...prev, quoteId: quote.id }))
              }
            />
          </div>
        );
      case 2:
        return (
          <WorkDetails
            description={workAgreement.description}
            workDescription={workAgreement.workDescription}
            warranty={workAgreement.warranty}
            startDate={workAgreement.startDate}
            onFieldChange={(field, value) => 
              setWorkAgreement(prev => ({ ...prev, [field]: value }))
            }
          />
        );
      case 3:
        return (
          <PaymentTermsForm
            paymentMethod={workAgreement.paymentMethod}
            cashPaymentAmount={workAgreement.cashPaymentAmount}
            paymentInstallments={workAgreement.paymentInstallments}
            onPaymentMethodChange={(method) => 
              setWorkAgreement(prev => ({ ...prev, paymentMethod: method }))
            }
            onCashPaymentAmountChange={(amount) => 
              setWorkAgreement(prev => ({ ...prev, cashPaymentAmount: amount }))
            }
            onPaymentInstallmentsChange={(installments) => 
              setWorkAgreement(prev => ({ ...prev, paymentInstallments: installments }))
            }
          />
        );
      case 4:
        return (
          <WorkAgreementExclusionsForm
            exclusions={workAgreement.exclusions || []}
            onChange={(exclusions) => 
              setWorkAgreement(prev => ({ ...prev, exclusions }))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <WorkAgreementWizardSteps currentStep={currentStep} />
      <div className="flex-1 p-6">
        <Card>
          <CardContent className="pt-6">
            {renderStepContent()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={!canGoPrevious}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Vorige
            </Button>
            <Button
              onClick={goToNextStep}
              disabled={!canGoNext}
            >
              {isLastStep ? 'Voltooien' : 'Volgende'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
