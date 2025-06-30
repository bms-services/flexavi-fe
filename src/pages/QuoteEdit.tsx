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
import { FormProvider, useForm } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";
import { useCreateQuotation, useGetQuotation, useUpdateQuotation } from "@/zustand/hooks/useQuotation";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { flattenAddressToObject } from "@/utils/dataTransform";

const defaultQuotationData: QuotationReq = {
  leads: [],
  title: "",
  description: "",
  notes: "",
  planned_start_date: "",
  status: "",
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


const QuoteEdit = () => {
  const { id } = useParams<{ id: string }>();

  const createQuotationZ = useCreateQuotation();
  const updateQuotationZ = useUpdateQuotation();
  const getQuotationZ = useGetQuotation(id || "");

  const methods = useForm<QuotationReq>({
    defaultValues: defaultQuotationData,
  });

  const handleStore = async (data: QuotationReq) => {
    const formattedData: QuotationReq = {
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
    await createQuotationZ.mutateAsync(formattedData);
  };

  const handleUpdate = async (data: QuotationReq) => {
    const {
      title,
      description,
      notes,
      planned_start_date,
      status,
      discount_type,
    } = data;


    const formattedData: Partial<QuotationReq> = {
      title,
      description,
      notes,
      planned_start_date,
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

    await updateQuotationZ.mutateAsync({ id: id || "", formData: formattedData });
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
    if (getQuotationZ.isSuccess) {
      const quotationData = getQuotationZ.data.result;
      methods.reset({
        ...quotationData,
        status: typeof quotationData.status === "string"
          ? quotationData.status
          : quotationData.status.value,
        leads: quotationData.leads.map((lead) =>
          typeof lead === "string" ? lead : { value: lead.id, label: lead.name }
        ),
        address: {
          ...quotationData.address,
          postal_code: typeof quotationData.address.postal_code === "string"
            ? {
              label: quotationData.address.postal_code,
              value: quotationData.address.postal_code,
            }
            : quotationData.address.postal_code,
        },
        items: quotationData.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          unit_price: Number(item.unit_price),
          vat_amount: Number(item.vat_amount),
          total: Number(item.total),
        })),
        subtotal: Number(quotationData.subtotal),
        discount_amount: Number(quotationData.discount_amount),
        total_amount: Number(quotationData.total_amount),
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
