import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WorkAgreementDetailsForm } from "@/components/workagreements/forms/WorkAgreementDetailsForm";
import { LineItemsList } from "@/components/quotes/LineItemsList";
import { QuoteSummary } from "@/components/quotes/QuoteSummary";
import { WorkAgreementHeader } from "@/components/workagreements/header/WorkAgreementHeader";
import { CustomerCard } from "@/components/quotes/customer/CustomerCard";
import { useWorkAgreementForm } from "@/hooks/useWorkAgreementForm";
import { WorkAgreementExclusionsForm } from "@/components/workagreements/forms/WorkAgreementExclusionsForm";
import { PaymentTermsForm } from "@/components/workagreements/forms/payment-terms/PaymentTermsForm";
import { GeneralTerms } from "@/components/workagreements/customer-portal/components/GeneralTerms";
import { WorkAgreementAttachments } from "@/components/workagreements/forms/attachments/WorkAgreementAttachments";

const WorkAgreementEdit = () => {
  const { id } = useParams<{ id: string }>();
  const {
    workAgreement,
    lineItems,
    selectedCustomer,
    selectedQuote,
    productSuggestions,
    totalAmount,
    isEditing,
    handleLineItemChange,
    handleAddLineItem,
    handleRemoveLineItem,
    handleCustomerSelect,
    handleQuoteSelect,
    handleWorkAgreementFieldChange,
    getProductSuggestions,
    handleSaveWorkAgreement,
    handleExclusionsChange,
    handlePaymentMethodChange,
    handleCashPaymentAmountChange,
    handlePaymentInstallmentsChange,
  } = useWorkAgreementForm(id);

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <WorkAgreementHeader isEditing={isEditing} onSave={handleSaveWorkAgreement} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomerCard
              selectedCustomer={selectedCustomer}
              onSelectCustomer={handleCustomerSelect}
            />

            <Card>
              <CardHeader>
                <CardTitle>Selecteer offerte</CardTitle>
                <CardDescription>Verbind aan een geaccepteerde offerte</CardDescription>
              </CardHeader>
              <CardContent>
                <WorkAgreementDetailsForm 
                  quote={selectedQuote}
                  description={workAgreement.description}
                  workDescription={workAgreement.workDescription}
                  warranty={workAgreement.warranty}
                  startDate={workAgreement.startDate}
                  status={workAgreement.status}
                  onFieldChange={handleWorkAgreementFieldChange}
                  onQuoteSelect={handleQuoteSelect}
                />
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Werkzaamheden</CardTitle>
              <CardDescription>Werkzaamheden uit de offerte of voeg nieuwe toe</CardDescription>
            </CardHeader>
            <CardContent>
              <LineItemsList 
                lineItems={lineItems}
                onLineItemChange={handleLineItemChange}
                onAddLineItem={handleAddLineItem}
                onRemoveLineItem={handleRemoveLineItem}
                productSuggestions={productSuggestions}
                onProductSearch={getProductSuggestions}
              />
              <QuoteSummary subtotal={totalAmount} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Betaalvoorwaarden</CardTitle>
              <CardDescription>Specificeer betaalmethode en betaaltermijnen</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentTermsForm 
                paymentMethod={workAgreement.paymentMethod}
                cashPaymentAmount={workAgreement.cashPaymentAmount}
                paymentInstallments={workAgreement.paymentInstallments}
                onPaymentMethodChange={handlePaymentMethodChange}
                onCashPaymentAmountChange={handleCashPaymentAmountChange}
                onPaymentInstallmentsChange={handlePaymentInstallmentsChange}
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Uitsluitingen</CardTitle>
              <CardDescription>Werkzaamheden die buiten de werkovereenkomst vallen</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkAgreementExclusionsForm 
                exclusions={workAgreement.exclusions || []}
                onChange={handleExclusionsChange}
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Algemene Voorwaarden</CardTitle>
              <CardDescription>Algemene voorwaarden die van toepassing zijn op deze werkovereenkomst</CardDescription>
            </CardHeader>
            <CardContent>
              <GeneralTerms />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Bijlages</CardTitle>
              <CardDescription>Voeg bestanden toe aan de werkovereenkomst</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkAgreementAttachments
                attachments={workAgreement.attachments || []}
                onAttachmentsChange={(files) => handleWorkAgreementFieldChange('attachments', files as unknown as string)}
                defaultAttachments={[
                  { name: 'Algemene voorwaarden.pdf', url: '/attachments/terms.pdf' }
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default WorkAgreementEdit;
