import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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


const QuoteEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  const {
    quote,
    lineItems,
    selectedCustomer,
    productSuggestions,
    totalAmount,
    isEditing,
    discountType,
    discountValue,
    handleLineItemChange,
    handleAddLineItem,
    handleRemoveLineItem,
    handleCustomerSelect,
    handleQuoteFieldChange,
    getProductSuggestions,
    handleSaveQuote,
    setDiscountType,
    setDiscountValue,
  } = useQuoteForm(id);

  // Check if the quote is accepted, and redirect if trying to edit an accepted quote
  useEffect(() => {
    if (isEditing && quote.status === "accepted") {

      navigate("/quotes");
    }
  }, [isEditing, quote.status, navigate]);

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <QuoteHeader isEditing={isEditing} onSave={handleSaveQuote} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CustomerCard
            selectedCustomer={selectedCustomer}
            onSelectCustomer={handleCustomerSelect}
          />

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Offerte details</CardTitle>
              <CardDescription>Vul de details van de offerte in</CardDescription>
            </CardHeader>
            <CardContent>
              <QuoteDetailsForm
                description={quote.description}
                location={quote.location}
                plannedStartDate={quote.plannedStartDate}
                status={quote.status}
                notes={quote.notes || ""}
                onFieldChange={handleQuoteFieldChange}
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Offerteregels</CardTitle>
              <CardDescription>Voeg producten en diensten toe aan de offerte</CardDescription>
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
              <QuoteSummary
                subtotal={totalAmount}
                discountType={discountType}
                discountValue={discountValue}
                onDiscountTypeChange={setDiscountType}
                onDiscountValueChange={setDiscountValue}
              />
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
    </Layout>
  );
};

export default QuoteEdit;
