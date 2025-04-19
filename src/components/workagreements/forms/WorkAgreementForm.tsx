
import React from 'react';
import { useWorkAgreementForm } from '@/hooks/useWorkAgreementForm';
import { CustomerSearch } from '@/components/appointments/components/CustomerSearch';
import { WorkDetails } from './work-details/WorkDetails';
import { PaymentTermsForm } from './payment-terms/PaymentTermsForm';
import { WorkAgreementExclusionsForm } from './WorkAgreementExclusionsForm';
import { QuoteSelector } from './quote-selector/QuoteSelector';
import { WorkAgreementAttachments } from './attachments/WorkAgreementAttachments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockLeads } from '@/data/mockData';
import { toast } from 'sonner';

interface WorkAgreementFormProps {
  workAgreementId?: string;
}

export const WorkAgreementForm = ({ workAgreementId }: WorkAgreementFormProps) => {
  const {
    workAgreement,
    selectedCustomer,
    selectedQuote,
    handleCustomerSelect,
    handleQuoteSelect,
    handleWorkAgreementFieldChange,
    handleExclusionsChange,
    handlePaymentMethodChange,
    handleCashPaymentAmountChange,
    handlePaymentInstallmentsChange,
    handleSaveWorkAgreement,
  } = useWorkAgreementForm(workAgreementId);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/workagreements');
  };

  return (
    <div className="container py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Werkovereenkomst bewerken</CardTitle>
            <CardDescription>
              Pas de details van de werkovereenkomst aan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Klant</h3>
                <CustomerSearch
                  selectedCustomer={selectedCustomer}
                  onSelectCustomer={handleCustomerSelect}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Offerte</h3>
                <QuoteSelector
                  quote={selectedQuote}
                  filteredQuotes={[]}
                  searchTerm=""
                  onSearchChange={() => {}}
                  onQuoteSelect={handleQuoteSelect}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Werkzaamheden</h3>
                <WorkDetails
                  description={workAgreement.description}
                  workDescription={workAgreement.workDescription}
                  warranty={workAgreement.warranty}
                  startDate={workAgreement.startDate}
                  onFieldChange={handleWorkAgreementFieldChange}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Betalingsvoorwaarden</h3>
                <PaymentTermsForm
                  paymentMethod={workAgreement.paymentMethod}
                  cashPaymentAmount={workAgreement.cashPaymentAmount}
                  paymentInstallments={workAgreement.paymentInstallments}
                  onPaymentMethodChange={handlePaymentMethodChange}
                  onCashPaymentAmountChange={handleCashPaymentAmountChange}
                  onPaymentInstallmentsChange={handlePaymentInstallmentsChange}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Uitsluitingen</h3>
                <WorkAgreementExclusionsForm
                  exclusions={workAgreement.exclusions || []}
                  onChange={handleExclusionsChange}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Bijlagen</h3>
                <WorkAgreementAttachments
                  attachments={[]}
                  onAttachmentsChange={() => {}}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug
            </Button>
            <Button onClick={handleSaveWorkAgreement}>
              <Save className="mr-2 h-4 w-4" />
              Opslaan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
