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
import { WorkAgreementExclusionsForm } from "@/components/workagreements/forms/WorkAgreementExclusionsForm";
import { PaymentTermsForm } from "@/components/workagreements/forms/payment-terms/PaymentTermsForm";
import { GeneralTerms } from "@/components/workagreements/customer-portal/components/GeneralTerms";
import { WorkAgreementAttachments } from "@/components/workagreements/forms/attachments/WorkAgreementAttachments";
import { FormProvider, useForm } from "react-hook-form";
import { WorkAgreementPaymentMethod, WorkAgreementReq, WorkAgreementStatusMap } from "@/zustand/types/workAgreementT";
import { useCreateWorkAgreement, useGetWorkAgreement, useUpdateWorkAgreement } from "@/zustand/hooks/useWorkAgreement";
import { useEffect } from "react";
import { appendAddress, appendAttachments, appendExclusions, appendIfExists, appendItems, appendLeads, appendPayment, appendQuotes } from "@/utils/dataTransform";
import { useGetMyAttachments } from "@/zustand/hooks/useSetting";

const defaultWorkAgreement: WorkAgreementReq = {
  leads: [],
  description: "",
  status: Object.keys(WorkAgreementStatusMap)[0] as keyof typeof WorkAgreementStatusMap,
  subtotal: 0,
  discount_amount: 0,
  discount_type: "percentage",
  total_amount: 0,
  payment: {
    payment_method: "bank_transfer",
    total_cash: 0,
    terms: [],
    total_percentage: 0
  },
  address: {
    street: "",
    postal_code: "",
    house_number: "",
    house_number_addition: "",
    city: "",
    province: ""
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

const appendWorkContract = (data: WorkAgreementReq, isUpdate: boolean): FormData => {
  const formData = new FormData();

  if (isUpdate) {
    formData.append('_method', "patch");
  }

  appendIfExists(formData, "description", data.description);
  appendIfExists(formData, "description_work", data.description_work);
  appendIfExists(formData, "warranty", data.warranty);
  appendIfExists(formData, "start_date", data.start_date);
  appendIfExists(formData, "status", data.status || "concept");
  appendIfExists(formData, "general_term_conditions", data.general_term_conditions);

  appendLeads(formData, data.leads);
  appendQuotes(formData, data.quotes);
  appendAddress(formData, data.address);
  appendAttachments(formData, data.attachments);
  appendExclusions(formData, data.exclusions);
  appendPayment(formData, data.payment);
  appendItems(formData, data);

  return formData;
};

const WorkAgreementEdit = () => {
  const { id } = useParams<{ id: string }>();
  const methods = useForm<WorkAgreementReq>({
    defaultValues: defaultWorkAgreement,
  });

  const getMyAttachmentsZ = useGetMyAttachments({
    page: 1,
    per_page: 10,
    search: "",
    type: "agreement",
  });

  const createWorkAgreementZ = useCreateWorkAgreement();
  const updateWorkAgreementZ = useUpdateWorkAgreement();
  const getWorkAgreementZ = useGetWorkAgreement(id || "");

  const handleStore = async (data: WorkAgreementReq) => {
    const formData = appendWorkContract(data, false);
    await createWorkAgreementZ.mutateAsync(formData);
  };

  const handleUpdate = async (data: WorkAgreementReq) => {
    const formData = appendWorkContract(data, true);
    formData.append("_method", "PATCH");
    await updateWorkAgreementZ.mutateAsync({ id: id || "", formData });
  };

  useEffect(() => {
    if (getWorkAgreementZ.isSuccess && getWorkAgreementZ.data?.result) {
      const data = getWorkAgreementZ.data.result;

      methods.reset({
        ...data,
        leads: data.leads.map((lead) => ({ value: lead.id, label: lead.name })),
        quotes: data.quotes.map((q) => q.id),
        warranty: Number(data.warranty ?? 0),
        subtotal: Number(data.subtotal),
        discount_amount: Number(data.discount_amount ?? 0),
        discount_type: data.discount_type,
        // vat_amount: Number(data.vat_amount ?? 0),
        total_amount: Number(data.total_amount),
        address: {
          ...data.address,
          postal_code: typeof data.address.postal_code === "string"
            ? {
              label: data.address.postal_code,
              value: data.address.postal_code,
            }
            : data.address.postal_code,
        },
        items: data.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          unit_price: Number(item.unit_price),
          vat_amount: Number(item.vat_amount ?? 0),
          total: Number(item.total),
        })),
        payment: {
          payment_method: data.payment.payment_method as WorkAgreementPaymentMethod,
          total_cash: Number(data.payment.total_cash ?? 0),
          terms: data.payment.terms?.map((term) => ({
            ...term,
            percentage: Number(term.percentage),
            total_price: Number(term.total_price),
          })) ?? [],
        },
        exclusions: data.exclusions.map((e) => ({ description: e.description })),
        attachments: data?.attachments.map((file) =>
          file instanceof File
            ? new File([], file.name || "attachment.pdf", { type: "application/pdf" })
            : file
        ),
      });
    }
  }, [getWorkAgreementZ.isSuccess, getWorkAgreementZ.data]);



  return (
    <Layout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(id ? handleUpdate : handleStore)}>
          <div className="px-[24px] py-6 space-y-6">
            <WorkAgreementHeader
              isEditing={!!id}
              isReadOnly={!!id}
            // handleDelete={}
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
                  <PaymentTermsForm isWorkContractCreate={!id} />
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
                  <WorkAgreementAttachments defaultAttachments={getMyAttachmentsZ} />
                </CardContent>
              </Card>
            </div>

            {/* {!isReadOnly && (
              <div className="lg:col-span-3 flex justify-end">
                <Button onClick={handleSaveWorkAgreement} className="w-full sm:w-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Werkovereenkomst opslaan
                </Button>
              </div>
            )} */}
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default WorkAgreementEdit;
