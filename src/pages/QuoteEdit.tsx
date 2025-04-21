import React, { useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const QuoteEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    quote,
    lineItems,
    selectedCustomer,
    productSuggestions,
    totalAmount,
    isEditing,
    handleLineItemChange,
    handleAddLineItem,
    handleRemoveLineItem,
    handleCustomerSelect,
    handleQuoteFieldChange,
    getProductSuggestions,
    handleSaveQuote,
  } = useQuoteForm(id);

  useEffect(() => {
    if (isEditing && quote.status === "accepted") {
      toast({
        title: "Bewerkingen niet toegestaan",
        description: "Geaccepteerde offertes kunnen niet bewerkt worden.",
        variant: "destructive",
      });
      navigate("/quotes");
    }
  }, [isEditing, quote.status, navigate, toast]);

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

          <Card className="lg:col-span-2">
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
              <QuoteSummary subtotal={totalAmount} />
            </CardContent>
          </Card>
          
          <div className="lg:col-span-1">
            <QuoteStats quoteId={id || ""} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuoteEdit;
