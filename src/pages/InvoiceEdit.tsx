
import React from "react";
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
import { InvoiceSummary } from "@/components/invoices/InvoiceSummary";
import { InvoiceHeader } from "@/components/invoices/header/InvoiceHeader";
import { CustomerCard } from "@/components/quotes/customer/CustomerCard";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";

const InvoiceEdit = () => {
  const { id } = useParams<{ id: string }>();
  const {
    invoice,
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
    handleInvoiceFieldChange,
    getProductSuggestions,
    handleSaveInvoice,
    setDiscountType,
    setDiscountValue,
  } = useInvoiceForm(id);

  const calculateAverageVatRate = () => {
    if (lineItems.length === 0) return 21;
    const totalWithVat = lineItems.reduce((sum, item) => {
      return sum + (item.total * (item.vatRate || 21)) / 100;
    }, 0);
    return totalAmount > 0 ? Math.round((totalWithVat / totalAmount) * 100) : 21;
  };

  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <InvoiceHeader
          isEditing={isEditing}
          onSave={handleSaveInvoice}
          status={invoice.status}
          invoiceNumber={invoice.id}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CustomerCard
            selectedCustomer={selectedCustomer}
            onSelectCustomer={handleCustomerSelect}
          />
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Factuur details</CardTitle>
              <CardDescription>Vul de details van de factuur in</CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceDetailsForm
                description={invoice.description}
                location={invoice.location}
                dueDate={invoice.dueDate}
                status={invoice.status}
                notes={invoice.notes || ""}
                paymentDate={invoice.paymentDate}
                onFieldChange={handleInvoiceFieldChange}
              />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Factuurregels</CardTitle>
              <CardDescription>Voeg producten en diensten toe aan de factuur</CardDescription>
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
              <InvoiceSummary
                subtotal={totalAmount}
                vatRate={calculateAverageVatRate()}
                discountType={discountType}
                discountValue={discountValue}
                onDiscountTypeChange={setDiscountType}
                onDiscountValueChange={setDiscountValue}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceEdit;
