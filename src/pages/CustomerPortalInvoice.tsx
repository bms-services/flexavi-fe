
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InvoiceStatus } from "@/types";
import { mockInvoices } from "@/data/mockInvoices";
import { mockLeads } from "@/data/mockLeads";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInvoiceStatusBadge } from "@/hooks/useStatusBadge";
import { FileText, Download, Check, ChevronLeft } from "lucide-react";
import { InvoiceSummary } from "@/components/invoices/InvoiceSummary";
import { CustomerDetails } from "@/components/customer-portal/invoice/CustomerDetails";
import { InvoiceDetails } from "@/components/customer-portal/invoice/InvoiceDetails";
import { InvoiceLineItems } from "@/components/customer-portal/invoice/InvoiceLineItems";
import { PaymentStarted } from "@/components/customer-portal/invoice/PaymentStarted";

const CustomerPortalInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStarted, setPaymentStarted] = useState(false);

  useEffect(() => {
    if (id) {
      const foundInvoice = mockInvoices.find(i => i.id === id);
      if (foundInvoice) {
        setInvoice(foundInvoice);
        const foundCustomer = mockLeads.find(l => l.id === foundInvoice.leadId);
        if (foundCustomer) {
          setCustomer(foundCustomer);
        }
      }
    }
    setLoading(false);
  }, [id]);

  const statusBadge = useInvoiceStatusBadge(invoice?.status as InvoiceStatus);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const handleStartPayment = () => {
    setPaymentStarted(true);
    console.log("Starting payment for invoice:", invoice?.id);
  };

  const handleDownloadInvoice = () => {
    console.log("Downloading invoice:", invoice?.id);
    alert("Factuur wordt gedownload als PDF.");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Laden...</p>
      </div>
    );
  }

  if (!invoice || !customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Factuur niet gevonden.</p>
      </div>
    );
  }

  if (paymentStarted) {
    return <PaymentStarted />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="hover:bg-white/50 transition-colors"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Terug naar overzicht
          </Button>
        </div>
        
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="border-b pb-6">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Factuur {invoice.id.replace("inv-", "FACT-")}
                </CardTitle>
                <CardDescription>{invoice.description}</CardDescription>
              </div>
              {statusBadge && (
                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="py-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomerDetails customer={customer} />
              <InvoiceDetails invoice={invoice} />
            </div>
            
            <InvoiceLineItems 
              lineItems={invoice.lineItems} 
              formatCurrency={formatCurrency}
            />
            
            <InvoiceSummary subtotal={invoice.amount} vatRate={21} />
          </CardContent>
          
          <CardFooter className="flex justify-between space-x-4 border-t pt-6">
            <Button variant="outline" onClick={handleDownloadInvoice}>
              <Download className="mr-2 h-4 w-4" />
              Download factuur
            </Button>
            {invoice.status !== "paid" && (
              <Button onClick={handleStartPayment}>
                <Check className="mr-2 h-4 w-4" />
                Betaal factuur
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPortalInvoice;
