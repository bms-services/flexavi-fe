
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
import { FormProvider, useForm } from "react-hook-form";
import { InvoiceReq, InvoiceStatusMap } from "@/zustand/types/invoiceT";
import { flattenAddressToObject } from "@/utils/dataTransform";
import { useCreateInvoice, useGetInvoice, useUpdateInvoice } from "@/zustand/hooks/useInvoice";
import { QuoteSummary } from "@/components/quotes/QuoteSummary";
import { useState } from "react";
import { SendInvoiceDialog } from "@/components/invoices/SendInvoiceDialog";
import { CreditInvoiceDialog } from "@/components/invoices/CreditInvoiceDialog";

const defaultInvoiceData: InvoiceReq = {
  leads: [],
  title: "",
  description: "",
  notes: "",
  payment_date: "",
  expiration_date: "",
  status: Object.keys(InvoiceStatusMap)[0] as keyof typeof InvoiceStatusMap,
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
  total_amount: 0
};

const InvoiceEdit = () => {
  const { id } = useParams<{ id: string }>();

  const createInvoiceZ = useCreateInvoice();
  const updateInvoiceZ = useUpdateInvoice();
  const getInvoiceZ = useGetInvoice(id || "");

  const [modal, setModal] = useState({
    credit: false,
    send: false,
  });


  const methods = useForm<InvoiceReq>({
    defaultValues: defaultInvoiceData,
  });

  const handleStore = async (data: InvoiceReq) => {
    const formattedData: InvoiceReq = {
      ...data,
      address: flattenAddressToObject(data.address),
      leads: data.leads.map((lead) =>
        typeof lead === "string" ? lead : lead.value
      ),
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
    };
    await createInvoiceZ.mutateAsync(formattedData);
  };

  const handleUpdate = async (data: InvoiceReq) => {
    const {
      title,
      description,
      notes,
      expiration_date,
      payment_date,
      status,
      discount_type,
    } = data;


    const formattedData: Partial<InvoiceReq> = {
      title,
      description,
      notes,
      expiration_date,
      payment_date,
      status,
      discount_type,
      address: flattenAddressToObject(data.address),
      leads: data.leads.map((lead) =>
        typeof lead === "string" ? lead : lead.value
      ),
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
    };

    await updateInvoiceZ.mutateAsync({ id: id || "", formData: formattedData });
  }

  const handleSendInvoice = async (data) => {
    if (!id) return;
    await createInvoiceZ.mutateAsync(data);
  };

  const handleCreditInvoice = async (type: "full" | "partial") => {
    if (!id) return;
    await createInvoiceZ.mutateAsync({ id, type });
  };



  return (
    <Layout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(id ? handleUpdate : handleStore)}>
          <div className="px-[24px] py-6 space-y-6">
            <InvoiceHeader
              isEditing={!!id}
              loadingSubmit={createInvoiceZ.isPending || updateInvoiceZ.isPending}

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
            </div>
          </div>
        </form>
      </FormProvider>

      {getInvoiceZ.isSuccess && getInvoiceZ.data.result && (
        <SendInvoiceDialog
          open={modal.send}
          onOpenChange={(open) => setModal((prev) => ({ ...prev, send: open }))}
          invoice={getInvoiceZ.data.result}
          onSubmit={handleSendInvoice}
        />
      )}
      {getInvoiceZ.isSuccess && getInvoiceZ.data.result && (
        <CreditInvoiceDialog open={false}
          onOpenChange={(open) => setModal((prev) => ({ ...prev, credit: open }))}
          invoice={getInvoiceZ.data?.result}
          onSubmit={handleCreditInvoice}
        />
      )}
    </Layout>
  );
};

export default InvoiceEdit;
