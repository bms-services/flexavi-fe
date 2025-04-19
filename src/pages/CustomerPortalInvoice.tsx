
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { FileText, User, MapPin, Calendar, Check, Download, CreditCard } from "lucide-react";
import { InvoiceSummary } from "@/components/invoices/InvoiceSummary";

const CustomerPortalInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<any | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStarted, setPaymentStarted] = useState(false);

  useEffect(() => {
    // In a real application, this would be an API call
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
    // In a real application, this would redirect to a payment gateway
    setPaymentStarted(true);
    console.log("Starting payment for invoice:", invoice?.id);
  };

  const handleDownloadInvoice = () => {
    // In a real application, this would download the invoice PDF
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">Betaling gestart</CardTitle>
            <CardDescription>
              U wordt doorgestuurd naar onze betaalpagina.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <CreditCard className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <p>
              Bedankt voor uw betaling. U wordt binnen enkele seconden doorgestuurd naar 
              ons beveiligde betaalsysteem.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
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
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Klantgegevens</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{customer.address}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Factuur details</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Factuurdatum: {format(new Date(invoice.createdAt), "d MMMM yyyy", {
                      locale: nl,
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Vervaldatum: {format(new Date(invoice.dueDate), "d MMMM yyyy", {
                      locale: nl,
                    })}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="text-sm font-medium text-gray-500 pb-2 border-b">Factuurregels</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Beschrijving</th>
                    <th className="text-center py-2">Aantal</th>
                    <th className="text-center py-2">Eenheid</th>
                    <th className="text-right py-2">Prijs per eenheid</th>
                    <th className="text-right py-2">BTW%</th>
                    <th className="text-right py-2">Totaal</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.lineItems.map((item: any) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">{item.description}</td>
                      <td className="text-center py-2">{item.quantity}</td>
                      <td className="text-center py-2">{item.unit}</td>
                      <td className="text-right py-2">{formatCurrency(item.pricePerUnit)}</td>
                      <td className="text-right py-2">{item.vatRate}%</td>
                      <td className="text-right py-2">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
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
