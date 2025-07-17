
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InvoiceDetailsForm } from "@/components/invoices/forms/InvoiceDetailsForm";
import { LineItemsList } from "@/components/quotes/LineItemsList";
import { InvoiceHeader } from "@/components/invoices/header/InvoiceHeader";
import { CustomerCard } from "@/components/quotes/customer/CustomerCard";
import { Control, FieldValues, FormProvider, useForm } from "react-hook-form";
import { InvoiceCreditReq, InvoiceCreditType, InvoiceReq, InvoiceSendReq, InvoiceStatusMap } from "@/zustand/types/invoiceT";
import { appendAddress, appendAttachments, appendIfExists, appendItems, appendLeads, flattenAddressToObject } from "@/utils/dataTransform";
import { useCreateInvoice, useCreditInvoice, useGetInvoice, useSendInvoice, useUpdateInvoice } from "@/zustand/hooks/useInvoice";
import { QuoteSummary } from "@/components/quotes/QuoteSummary";
import { useEffect, useState } from "react";
import { SendInvoiceDialog } from "@/components/invoices/SendInvoiceDialog";
import { CreditInvoiceDialog } from "@/components/invoices/CreditInvoiceDialog";
import { DropZoneAlpha } from "@/components/ui/drop-zone-alpha/DropZoneAlpha";
import { useTranslation } from "react-i18next";
import { useGetMyAttachments } from "@/zustand/hooks/useSetting";

const defaultInvoiceData: InvoiceReq = {
  leads: [],
  description: "",
  notes: "",
  payment_date: "",
  expiration_date: "",
  status: Object.keys(InvoiceStatusMap)[0] as keyof typeof InvoiceStatusMap,
  address: {
    street: "",
    city: "",
    postal_code: "",
    house_number: "",
    province: "",
  },
  items: [],
  subtotal: 0,
  discount_amount: 0,
  discount_type: "percentage",
  total_amount: 0,
  attachments: [],
};

const defaultInvoiceSendData: InvoiceSendReq = {
  id: "",
  subject: "",
  message: "",
  email: "",
};

const appendInvoice = (data: InvoiceReq, isUpdate: boolean): FormData => {
  const formData = new FormData();

  if (isUpdate) {
    formData.append('_method', "patch");
  }

  appendIfExists(formData, "description", data.description);
  appendIfExists(formData, "notes", data.notes);
  appendIfExists(formData, "payment_date", data.payment_date);
  appendIfExists(formData, "expiration_date", data.expiration_date);
  appendIfExists(formData, "status", data.status);

  appendAddress(formData, data.address);
  appendLeads(formData, data.leads);
  appendAttachments(formData, data.attachments);
  appendItems(formData, data);

  return formData;
}

const InvoiceEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const createInvoiceZ = useCreateInvoice();
  const updateInvoiceZ = useUpdateInvoice();
  const getInvoiceZ = useGetInvoice(id || "");
  const creditInvoiceZ = useCreditInvoice();
  const sendInvoiceZ = useSendInvoice();

  const [modal, setModal] = useState({
    credit: false,
    send: false,
  });

  const getMyAttachmentsZ = useGetMyAttachments({
    page: 1,
    per_page: 10,
    search: "",
    type: "invoice",
  });


  const methods = useForm<InvoiceReq>({
    defaultValues: defaultInvoiceData,
  });

  const methodsSend = useForm<InvoiceSendReq>({
    defaultValues: defaultInvoiceSendData,
  });

  const handleStore = async (data: InvoiceReq) => {
    const formData = appendInvoice(data, false);
    await createInvoiceZ.mutateAsync(formData);
  };

  const handleUpdate = async (data: InvoiceReq) => {
    const formData = appendInvoice(data, true);
    await updateInvoiceZ.mutateAsync({ id: id || "", formData });
  }

  const handleOpenModal = (type: "send" | "credit") => {
    setModal((prev) => ({ ...prev, [type]: true }));
  };

  const handleSendInvoice = async (data: InvoiceSendReq) => {
    if (!id) return;
    await sendInvoiceZ.mutateAsync(data);
  };

  const handleCreditInvoice = async (type: InvoiceCreditType) => {
    if (!id) return;
    await creditInvoiceZ.mutateAsync({ id, type });
  };


  useEffect(() => {
    if (getInvoiceZ.isSuccess && getInvoiceZ.data.result) {
      const data = getInvoiceZ.data.result;
      methods.reset({
        ...data,
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
        attachments: data?.attachments.map((file) =>
          file instanceof File
            ? new File([], file.name || "attachment.pdf", { type: "application/pdf" })
            : file
        ),
      });
    }
  }, [getInvoiceZ.isSuccess, getInvoiceZ.data, methods]);

  return (
    <Layout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(id ? handleUpdate : handleStore)}>
          <div className="px-[24px] py-6 space-y-6">
            <InvoiceHeader
              isEditing={!!id}
              loadingSubmit={createInvoiceZ.isPending || updateInvoiceZ.isPending}
              handleOpenModal={handleOpenModal}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CustomerCard />
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Factuur details</CardTitle>
                  <CardDescription>Vul de details van de factuur in</CardDescription>
                </CardHeader>
                <CardContent>
                  <InvoiceDetailsForm />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Factuurregels</CardTitle>
                  <CardDescription>Voeg producten en diensten toe aan de factuur</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineItemsList />
                  <QuoteSummary />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Factuur bijlagen</CardTitle>
                  <CardDescription>
                    Voeg bijlagen toe aan de factuur
                  </CardDescription>
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
            </div>
          </div>
        </form>
      </FormProvider>

      {getInvoiceZ.isSuccess && getInvoiceZ.data.result && (
        <FormProvider {...methods}>
          <form onSubmit={methodsSend.handleSubmit(handleSendInvoice)}>
            <SendInvoiceDialog
              open={modal.send}
              onOpenChange={(open) => setModal((prev) => ({ ...prev, send: open }))}
              invoice={getInvoiceZ.data.result}
            />
          </form>
        </FormProvider>
      )}

      {getInvoiceZ.isSuccess && getInvoiceZ.data.result && (
        <CreditInvoiceDialog
          open={modal.credit}
          onOpenChange={(open) => setModal((prev) => ({ ...prev, credit: open }))}
          invoice={getInvoiceZ.data?.result}
          onSubmit={handleCreditInvoice}
        />
      )}
    </Layout>
  );
};

export default InvoiceEdit;
