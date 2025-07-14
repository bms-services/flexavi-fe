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
import { QuoteDetailsForm } from "@/components/quotes/forms/QuoteDetailsForm";
import { LineItemsList } from "@/components/quotes/LineItemsList";
import { QuoteSummary } from "@/components/quotes/QuoteSummary";
import { QuoteHeader } from "@/components/quotes/header/QuoteHeader";
import { CustomerCard } from "@/components/quotes/customer/CustomerCard";
import { QuoteStats } from "@/components/quotes/QuoteStats";
import { Control, FieldValues, FormProvider, useForm } from "react-hook-form";
import { QuotationReq, quotationStatusMap } from "@/zustand/types/quotationT";
import { useCreateQuotation, useGetQuotation, useUpdateQuotation } from "@/zustand/hooks/useQuotation";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { appendAddress, appendAttachments, appendIfExists, appendItems, appendLeads } from "@/utils/dataTransform";
import { useGetMyAttachments } from "@/zustand/hooks/useSetting";
import { DropZoneAlpha } from "@/components/ui/drop-zone-alpha/DropZoneAlpha";
import { useTranslation } from "react-i18next";

const defaultQuotationData: QuotationReq = {
  leads: [],
  title: "",
  description: "",
  notes: "",
  planned_start_date: "",
  status: Object.keys(quotationStatusMap)[0] as keyof typeof quotationStatusMap,
  address: {
    street: "",
    city: "",
    postal_code: "",
    house_number: ""
  },
  items: [],
  subtotal: 0,
  discount_amount: 0,
  discount_type: "percentage",
  total_amount: 0,
  attachments: []
};

const appendQuotation = (data: QuotationReq, isUpdate: boolean) => {
  const formData = new FormData();

  if (isUpdate) {
    formData.append('_method', "patch");
  }

  appendIfExists(formData, "title", data.title);
  appendIfExists(formData, "description", data.description);
  appendIfExists(formData, "notes", data.notes);
  appendIfExists(formData, "planned_start_date", data.planned_start_date);
  appendIfExists(formData, "status", data.status);

  appendLeads(formData, data.leads);
  appendAddress(formData, data.address);
  appendAttachments(formData, data.attachments);
  appendItems(formData, data);


  return formData;
}

const QuoteEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const getMyAttachmentsZ = useGetMyAttachments({
    page: 1,
    per_page: 10,
    search: "",
    type: "quotation",
  });

  const createQuotationZ = useCreateQuotation();
  const updateQuotationZ = useUpdateQuotation();
  const getQuotationZ = useGetQuotation(id || "");

  const methods = useForm<QuotationReq>({
    defaultValues: defaultQuotationData,
  });

  const handleStore = async (data: QuotationReq) => {
    const formData = appendQuotation(data, false);
    await createQuotationZ.mutateAsync(formData);
  };

  const handleUpdate = async (data: QuotationReq) => {
    await updateQuotationZ.mutateAsync({ id: id || "", formData: appendQuotation(data, true) });
  }

  useEffect(() => {
    if (createQuotationZ.isError) {
      mapApiErrorsToForm(createQuotationZ.error.errors, methods.setError);
    }
  }, [createQuotationZ.isError, createQuotationZ.error, methods.setError]);

  useEffect(() => {
    if (updateQuotationZ.isError) {
      mapApiErrorsToForm(updateQuotationZ.error.errors, methods.setError);
    }
  }, [updateQuotationZ.isError, updateQuotationZ.error, methods.setError]);

  useEffect(() => {
    if (getQuotationZ.isSuccess && getQuotationZ.data.result) {
      const data = getQuotationZ.data.result;
      methods.reset({
        ...data,
        status: data.status,
        leads: data.leads.map((lead) =>
          typeof lead === "string" ? lead : { value: lead.id, label: lead.name }
        ),
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
          vat_amount: Number(item.vat_amount),
          total: Number(item.total),
        })),
        subtotal: Number(data.subtotal),
        discount_amount: Number(data.discount_amount),
        total_amount: Number(data.total_amount),
        attachments: data?.attachments?.map((file) =>
          file instanceof File
            ? new File([], file.name || "attachment.pdf", { type: "application/pdf" })
            : file
        ),
      });
    }
  }, [getQuotationZ.isSuccess, getQuotationZ.data, methods]);

  return (
    <Layout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(id ? handleUpdate : handleStore)}>
          <div className="px-[24px] py-6 space-y-6">
            <QuoteHeader
              isEditing={!!id}
              loadingSubmit={createQuotationZ.isPending || updateQuotationZ.isPending}
              quotationNumber={getQuotationZ.isSuccess ? getQuotationZ.data.result.quote_number : ""}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CustomerCard />

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Offerte details</CardTitle>
                  <CardDescription>Vul de details van de offerte in</CardDescription>
                </CardHeader>
                <CardContent>
                  <QuoteDetailsForm />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Offerteregels</CardTitle>
                  <CardDescription>Voeg producten en diensten toe aan de offerte</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineItemsList />
                  <QuoteSummary />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Offerte statistieken</CardTitle>
                  <CardDescription>Inzicht in hoe vaak de offerte is bekeken (niet zichtbaar voor klanten)</CardDescription>
                </CardHeader>
                <CardContent>
                  <DropZoneAlpha
                    label={t("settings.attachment.label.upload")}
                    multiple={true}
                    accept={{
                      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
                      "application/pdf": [".pdf"],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                      "application/vnd.ms-excel": [".xls", ".xlsx"],
                      "text/plain": [".txt"],
                    }}
                    maxFiles={5}
                    maxSize={2 * 1024 * 1024}
                    rules={{
                      name: "attachments",
                      control: methods.control as unknown as Control<FieldValues>,
                      options: {
                        // required: t("settings.attachment.error.required.files"),
                        // validate: {
                        //   maxFiles: (value) => {
                        //     const files = value as File[];
                        //     return files.length <= 5 || t("settings.attachment.error.maxFiles.files");
                        //   },
                        // },
                      },
                      errors: methods.formState.errors as FieldValues,
                    }}
                    listUploaded={getMyAttachmentsZ}
                    type={"agreement"}
                  />
                </CardContent>
              </Card>

              {id && (
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Offerte statistieken</CardTitle>
                    <CardDescription>Inzicht in hoe vaak de offerte is bekeken (niet zichtbaar voor klanten)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <QuoteStats quoteId={id || ""} />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default QuoteEdit;
