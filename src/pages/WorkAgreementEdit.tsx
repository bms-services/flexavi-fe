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
import { appendIfExists } from "@/utils/dataTransform";

const defaultWorkAgreement: WorkAgreementReq = {
  leads: [],
  description: "",
  status: Object.keys(WorkAgreementStatusMap)[0] as keyof typeof WorkAgreementStatusMap,
  subtotal: 0,
  discount_amount: 0,
  discount_type: "percentage",
  vat_amount: 0,
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

const buildFormData = (data: WorkAgreementReq): FormData => {
  const formData = new FormData();

  // leads[]
  data.leads.forEach((lead: string | { value: string; label: string }) => {
    formData.append("leads[]", typeof lead === "string" ? lead : lead.value);
  });

  // quotes[]
  data.quotes.forEach((quote) => {
    formData.append("quotes[]", quote);
  });

  // Basic fields
  appendIfExists(formData, "description", data.description);
  appendIfExists(formData, "description_work", data.description_work);
  appendIfExists(formData, "warranty", data.warranty);
  appendIfExists(formData, "start_date", data.start_date);
  appendIfExists(formData, "status", data.status || "concept");
  appendIfExists(formData, "general_term_conditions", data.general_term_conditions);

  formData.append("address[street]", data.address.street || "");
  formData.append("address[postal_code]", typeof data.address.postal_code === "object"
    ? data.address.postal_code.value
    : data.address.postal_code || "");
  formData.append("address[house_number]", data.address.house_number || "");
  formData.append("address[house_number_addition]", data.address.house_number_addition || "");
  formData.append("address[city]", data.address.city || "");
  formData.append("address[province]", data.address.province || "");

  // Pricing
  appendIfExists(formData, "subtotal", data.subtotal);
  appendIfExists(formData, "vat_amount", data.vat_amount ?? 0);
  appendIfExists(formData, "discount_amount", data.discount_amount);
  appendIfExists(formData, "discount_type", data.discount_type || "percentage");
  appendIfExists(formData, "total_amount", data.total_amount);

  // items[n][field]
  data.items.forEach((item, idx) => {
    appendIfExists(formData, `items[${idx}][product_id]`, item.product_id);
    appendIfExists(formData, `items[${idx}][unit]`, item.unit);
    appendIfExists(formData, `items[${idx}][title]`, item.title);
    appendIfExists(formData, `items[${idx}][description]`, item.description);
    appendIfExists(formData, `items[${idx}][unit_price]`, item.unit_price);
    appendIfExists(formData, `items[${idx}][vat_amount]`, item.vat_amount ?? 0);
    appendIfExists(formData, `items[${idx}][total]`, item.total);
  });

  // Payment
  if (data.payment) {
    appendIfExists(formData, "payment[payment_method]", data.payment.payment_method);
    appendIfExists(formData, "payment[total_cash]", data.payment.total_cash);

    data.payment.terms?.forEach((term, idx) => {
      appendIfExists(formData, `payment[terms][${idx}][description]`, term.description);
      appendIfExists(formData, `payment[terms][${idx}][status]`, term.status);
      appendIfExists(formData, `payment[terms][${idx}][percentage]`, term.percentage);
      appendIfExists(formData, `payment[terms][${idx}][total_price]`, term.total_price);
    });
  }

  // exclusions[]
  (data.exclusions ?? []).forEach((exclusion) => {
    formData.append("exclusions[]", exclusion.description);
  });

  // attachments[]
  (data.attachments ?? []).forEach((file) => {
    if (file instanceof File) {
      formData.append("attachments[]", file);
    } else if (typeof file === "object" && file !== null) {
      formData.append("attachments[]", file.url || "");
    }
  });

  return formData;
};

const WorkAgreementEdit = () => {
  const { id } = useParams<{ id: string }>();
  const createWorkAgreementZ = useCreateWorkAgreement();
  const updateWorkAgreementZ = useUpdateWorkAgreement();
  const getWorkAgreementZ = useGetWorkAgreement(id || "");

  const methods = useForm<WorkAgreementReq>({
    defaultValues: defaultWorkAgreement,
  });

  const handleStore = async (data: WorkAgreementReq) => {
    const formData = buildFormData(data);
    await createWorkAgreementZ.mutateAsync(formData);
  };

  const handleUpdate = async (data: WorkAgreementReq) => {
    const formData = buildFormData(data);
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
        vat_amount: Number(data.vat_amount ?? 0),
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
        attachments: data.attachments.map((file) =>
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
                  <WorkAgreementAttachments />
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
