import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { WorkAgreementReq } from "@/zustand/types/workAgreementT";
import { useCreateWorkAgreement, useGetWorkAgreement, useUpdateWorkAgreement } from "@/zustand/hooks/useWorkAgreement";

const defaultQuotationData: WorkAgreementReq = {
  leads: [],
  description: "",
  status: "draft",
  subtotal: 0,
  discount_amount: 0,
  discount_type: "percentage",
  total_amount: 0,
  payment: {
    payment_method: "bank",
    total_cash: 0,
    terms: [],
  },
  quotes: [],
  description_work: "",
  warranty: 0,
  start_date: "",
  general_term_conditions: "",
  items: [],
  exclusions: [],
  attachments: []
};

const WorkAgreementEdit = () => {
  const { id } = useParams<{ id: string }>();
  const createWorkAgreementZ = useCreateWorkAgreement();
  const updateWorkAgreementZ = useUpdateWorkAgreement();
  const getWorkAgreementZ = useGetWorkAgreement(id || "");

  const methods = useForm<WorkAgreementReq>({
    defaultValues: defaultQuotationData,
  });

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

  const isReadOnly = workAgreement.status === "signed";
  const canDelete = workAgreement.status === "draft";

  const handleStore = async (data: WorkAgreementReq) => {
    const formData = new FormData();

    formData.append("leads", JSON.stringify(data.leads.map(lead => typeof lead === "string" ? lead : lead.value)));
    formData.append("quotes", JSON.stringify(data.quotes));
    formData.append("description", data.description);
    formData.append("description_work", data.description_work);
    formData.append("warranty", String(data.warranty));
    formData.append("start_date", data.start_date);
    formData.append("status", data.status);
    formData.append("general_term_conditions", data.general_term_conditions);
    formData.append("items", JSON.stringify(data.items));
    formData.append("subtotal", String(data.subtotal));
    formData.append("discount_amount", String(data.discount_amount));
    formData.append("discount_type", data.discount_type);
    formData.append("total_amount", String(data.total_amount));
    formData.append("payment", JSON.stringify(data.payment));
    formData.append("exclusions", JSON.stringify(data.exclusions));

    data.attachments.forEach((file) => {
      if (file instanceof File) {
        formData.append("attachments[]", file);
      }
    });

    await createWorkAgreementZ.mutateAsync(formData);
  };

  const handleUpdate = async (data: WorkAgreementReq) => {
    const formData = new FormData();

    formData.append("leads", JSON.stringify(data.leads.map(lead => typeof lead === "string" ? lead : lead.value)));
    formData.append("quotes", JSON.stringify(data.quotes));
    formData.append("description", data.description);
    formData.append("description_work", data.description_work);
    formData.append("warranty", String(data.warranty));
    formData.append("start_date", data.start_date);
    formData.append("status", data.status);
    formData.append("general_term_conditions", data.general_term_conditions);
    formData.append("items", JSON.stringify(data.items));
    formData.append("subtotal", String(data.subtotal));
    formData.append("discount_amount", String(data.discount_amount));
    formData.append("discount_type", data.discount_type);
    formData.append("total_amount", String(data.total_amount));
    formData.append("payment", JSON.stringify(data.payment));
    formData.append("exclusions", JSON.stringify(data.exclusions));

    data.attachments.forEach((file) => {
      if (file instanceof File) {
        formData.append("attachments[]", file);
      }
    });

    await updateWorkAgreementZ.mutateAsync({ id: id || "", formData });
  };


  useEffect(() => {
    if (getWorkAgreementZ.isSuccess) {
      const workAgreementData = getWorkAgreementZ.data.result;
      methods.reset(workAgreementData);
    }
  }, [getWorkAgreementZ.isSuccess, getWorkAgreementZ.data, methods]);


  return (
    <Layout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(id ? handleUpdate : handleStore)}>
          <div className="px-[24px] py-6 space-y-6">
            <WorkAgreementHeader
              isEditing={isEditing}
              onSave={handleSaveWorkAgreement}
              canDelete={canDelete}
              isReadOnly={isReadOnly}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomerCard />

                <Card>
                  <CardHeader>
                    <CardTitle>Selecteer offerte</CardTitle>
                    <CardDescription>Verbind aan een geaccepteerde offerte</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WorkAgreementDetailsForm />
                  </CardContent>
                </Card>
              </div>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Werkzaamheden</CardTitle>
                  <CardDescription>Werkzaamheden uit de offerte of voeg nieuwe toe</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineItemsList />
                  <QuoteSummary />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Betaalvoorwaarden</CardTitle>
                  <CardDescription>Specificeer betaalmethode en betaaltermijnen</CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentTermsForm />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Uitsluitingen</CardTitle>
                  <CardDescription>Werkzaamheden die buiten de werkovereenkomst vallen</CardDescription>
                </CardHeader>
                <CardContent>
                  <WorkAgreementExclusionsForm />
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
                  <WorkAgreementAttachments />
                </CardContent>
              </Card>
            </div>

            {!isReadOnly && (
              <div className="lg:col-span-3 flex justify-end">
                <Button onClick={handleSaveWorkAgreement} className="w-full sm:w-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Werkovereenkomst opslaan
                </Button>
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default WorkAgreementEdit;
