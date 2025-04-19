
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QuoteStatus } from "@/types";
import { mockQuotes } from "@/data/mockQuotes";
import { mockLeads } from "@/data/mockLeads";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";
import Signature from "@/components/customer/Signature";
import { QuoteDetails } from "@/components/customer-portal/quote/QuoteDetails";
import { QuoteLineItems } from "@/components/customer-portal/quote/QuoteLineItems";
import PortalSuccessMessage from "@/components/customer-portal/PortalSuccessMessage";
import PortalRejectedMessage from "@/components/customer-portal/PortalRejectedMessage";

const CustomerPortal = () => {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<any | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    if (id) {
      const foundQuote = mockQuotes.find(q => q.id === id);
      if (foundQuote) {
        setQuote(foundQuote);
        const foundCustomer = mockLeads.find(l => l.id === foundQuote.leadId);
        if (foundCustomer) {
          setCustomer(foundCustomer);
        }
      }
    }
    setLoading(false);
  }, [id]);

  const statusBadge = useQuoteStatusBadge(quote?.status as QuoteStatus);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const handleAccept = () => {
    if (!signature) {
      alert("Plaats eerst uw handtekening om de offerte te accepteren.");
      return;
    }
    setSubmitted(true);
    console.log("Offerte geaccepteerd met handtekening:", signature);
  };

  const handleReject = () => {
    setRejected(true);
    console.log("Offerte afgewezen");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Laden...</p>
      </div>
    );
  }

  if (!quote || !customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Offerte niet gevonden.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <PortalSuccessMessage 
        title="Offerte Geaccepteerd"
        description="Hartelijk dank voor het accepteren van onze offerte."
      />
    );
  }

  if (rejected) {
    return (
      <PortalRejectedMessage 
        title="Offerte Afgewezen"
        description="We hebben uw afwijzing geregistreerd."
      />
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
                  Offerte {quote.id.replace("quote-", "OF-")}
                </CardTitle>
                <CardDescription>{quote.description}</CardDescription>
              </div>
              {statusBadge && (
                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="py-6 space-y-6">
            <QuoteDetails 
              customer={customer}
              quote={quote}
              formatCurrency={formatCurrency}
            />
            
            <h3 className="text-sm font-medium text-gray-500 pb-2 border-b">Offerteregels</h3>
            <QuoteLineItems 
              lineItems={quote.lineItems}
              formatCurrency={formatCurrency}
            />
            
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Handtekening</h3>
              <p className="text-sm text-gray-500 mb-4">
                Om deze offerte te accepteren, plaats uw handtekening hieronder en klik op 'Accepteren'.
              </p>
              <Signature onSignatureChange={setSignature} />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between space-x-4 border-t pt-6">
            <Button variant="outline" onClick={handleReject}>
              Offerte afwijzen
            </Button>
            <Button onClick={handleAccept}>
              Offerte accepteren
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPortal;
