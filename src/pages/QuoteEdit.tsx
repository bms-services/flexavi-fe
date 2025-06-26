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
import { useQuoteForm } from "@/hooks/useQuoteForm";
import { QuoteStats } from "@/components/quotes/QuoteStats";
import { FormProvider, useForm } from "react-hook-form";
import { QuotationReq } from "@/zustand/types/quotationT";
import { useCreateQuotation, useUpdateQuotation } from "@/zustand/hooks/useQuotation";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";

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
  sub_total: 0,
  discount_amount: 0,
  discount_type: "percentage",
  total_amount: 0
};


const QuoteEdit = () => {
  const { id } = useParams<{ id: string }>();

  const createQuotationZ = useCreateQuotation();
  const updateQuotationZ = useUpdateQuotation();

  const {
    isEditing,
    discountType,
    discountValue,
    setDiscountType,
    setDiscountValue,
  } = useQuoteForm(id);

  // Check if the quote is accepted, and redirect if trying to edit an accepted quote
  // useEffect(() => {
  //   if (isEditing && quote.status === "accepted") {

  //     navigate("/quotes");
  //   }
  // }, [isEditing, quote.status, navigate]);

  const methods = useForm<QuotationReq>({
    defaultValues: defaultQuotationData,
  });

  const handleStore = async (data: QuotationReq) => {
    try {
      const formattedData: QuotationReq = {
        ...data,
        leads: data.leads.map((lead) =>
          typeof lead === "string" ? lead : lead.value
        ),
      };

      await createQuotationZ.mutateAsync(formattedData);
    } catch (error) {
      throw new Error("Failed to create quotation");
    }
  };

  const handleUpdate = async (data: QuotationReq) => {
    try {
      await updateQuotationZ.mutateAsync({ id: data.id!, formData: data });
    } catch (error) {
      throw new Error("Failed to update quotation");
    }
  };

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


  return (
    <Layout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(id ? handleUpdate : handleStore)}>
          <div className="container py-6 space-y-6">
            <QuoteHeader isEditing={isEditing} />

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

              {isEditing && (
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
