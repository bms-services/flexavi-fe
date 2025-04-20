
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InvoiceStatus } from "@/types";
import { mockInvoices } from "@/data/mockInvoices";
import { mockLeads } from "@/data/mockLeads";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInvoiceStatusBadge } from "@/hooks/useStatusBadge";
import { FileText, Download, Check, ChevronLeft } from "lucide-react";
import { InvoiceSummary } from "@/components/invoices/InvoiceSummary";
import { CustomerDetails } from "@/components/customer-portal/invoice/CustomerDetails";
import { InvoiceDetails } from "@/components/customer-portal/invoice/InvoiceDetails";
import { InvoiceLineItems } from "@/components/customer-portal/invoice/InvoiceLineItems";
import { PaymentStarted } from "@/components/customer-portal/invoice/PaymentStarted";
import { CustomerPortalLayout } from "@/components/customer-portal/layout/CustomerPortalLayout";
import { formatCurrency } from "@/utils/format";
import { Separator } from "@/components/ui/separator";
import { GeneralTerms } from "@/components/workagreements/customer-portal/components/GeneralTerms";
import { WarrantySection } from "@/components/customer-portal/quote/WarrantySection";
import { Attachments } from "@/components/workagreements/customer-portal/components/Attachments";
import { toast } from "sonner";

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

  // Add missing function to handle invoice download
  const handleDownloadInvoice = () => {
    toast.success("Factuur wordt gedownload...", {
      description: "Het bestand wordt automatisch gedownload naar uw apparaat."
    });
    // In a real application, this would trigger an actual download
    console.log("Downloading invoice:", invoice?.id);
  };

  // Add missing function to handle payment start
  const handleStartPayment = () => {
    toast.info("Betaling wordt gestart...", {
      description: "U wordt doorgestuurd naar onze beveiligde betaalomgeving."
    });
    // Simulate a redirect to payment gateway
    setTimeout(() => {
      setPaymentStarted(true);
    }, 1500);
  };

  const demoAttachments = [
    { name: "Situatie foto's.jpg", url: "https://source.unsplash.com/random/800x600/?construction" },
    { name: "Materiaal specificaties.jpg", url: "https://source.unsplash.com/random/800x600/?material" },
    { name: "Algemene voorwaarden.pdf", url: "#" }
  ];

  if (loading) {
    return (
      <CustomerPortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </CustomerPortalLayout>
    );
  }

  if (!invoice || !customer) {
    return (
      <CustomerPortalLayout>
        <div className="flex items-center justify-center py-12">
          <Card className="max-w-md w-full">
            <CardContent className="py-12 text-center">
              <p className="text-lg text-gray-600">Factuur niet gevonden.</p>
            </CardContent>
          </Card>
        </div>
      </CustomerPortalLayout>
    );
  }

  if (paymentStarted) {
    return <PaymentStarted />;
  }

  return (
    <CustomerPortalLayout
      title="Factuur Details"
      subtitle="Bekijk en beheer uw factuur"
    >
      <div className="max-w-4xl mx-auto">
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

        <Card className="border shadow-md bg-white">
          <CardHeader className="border-b pb-6 bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Factuur {invoice.id.replace("inv-", "FACT-")}
                </h2>
                <p className="text-muted-foreground mt-1">{invoice.description}</p>
              </div>
              {statusBadge && (
                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="py-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomerDetails customer={customer} />
              <InvoiceDetails invoice={invoice} />
            </div>
            
            <Separator className="my-8" />
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Specificatie</h3>
              <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
                <InvoiceLineItems 
                  lineItems={invoice.lineItems}
                  formatCurrency={formatCurrency}
                />
              </div>
            </div>
            
            <InvoiceSummary subtotal={invoice.amount} vatRate={21} />
            
            <Separator className="my-8" />
            
            <WarrantySection 
              warranty="Op alle installatie werkzaamheden geven wij 5 jaar garantie. Op de gebruikte materialen is de fabrieksgarantie van toepassing."
            />
            
            <Attachments 
              defaultAttachments={demoAttachments}
            />
            
            <GeneralTerms />
          </CardContent>
          
          <CardFooter className="flex justify-between space-x-4 border-t py-6 bg-gray-50">
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
    </CustomerPortalLayout>
  );
};

export default CustomerPortalInvoice;
