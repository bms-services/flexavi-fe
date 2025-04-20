import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QuoteStatus } from "@/types";
import { mockQuotes } from "@/data/mockQuotes";
import { mockLeads } from "@/data/mockLeads";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CustomerPortalLayout } from "@/components/customer-portal/layout/CustomerPortalLayout";
import { QuoteDetails } from "@/components/customer-portal/quote/QuoteDetails";
import { QuoteLineItems } from "@/components/customer-portal/quote/QuoteLineItems";
import PortalSuccessMessage from "@/components/customer-portal/PortalSuccessMessage";
import PortalRejectedMessage from "@/components/customer-portal/PortalRejectedMessage";
import { QuotePortalHeader } from "@/components/customer-portal/quote/QuotePortalHeader";
import { QuoteRevisionDialog } from "@/components/customer-portal/quote/QuoteRevisionDialog";
import { QuoteActions } from "@/components/customer-portal/quote/QuoteActions";
import { QuotePortalLoading } from "@/components/customer-portal/quote/QuotePortalLoading";
import { QuoteSignatureSection } from "@/components/customer-portal/quote/QuoteSignatureSection";

const CustomerPortal = () => {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<any | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [isRevisionDialogOpen, setIsRevisionDialogOpen] = useState(false);
  const [revisionComment, setRevisionComment] = useState("");

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

  const handleRevisionRequest = () => {
    if (!revisionComment) {
      return;
    }
    console.log("Revision request submitted with comment:", revisionComment);
    setRejected(true);
  };

  if (loading) {
    return (
      <CustomerPortalLayout>
        <QuotePortalLoading />
      </CustomerPortalLayout>
    );
  }

  if (!quote || !customer) {
    return (
      <CustomerPortalLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-lg text-gray-600">Offerte niet gevonden.</p>
        </div>
      </CustomerPortalLayout>
    );
  }

  if (submitted) {
    return (
      <CustomerPortalLayout>
        <PortalSuccessMessage 
          title="Offerte Geaccepteerd"
          description="Hartelijk dank voor het accepteren van onze offerte."
        />
      </CustomerPortalLayout>
    );
  }

  if (rejected) {
    return (
      <CustomerPortalLayout>
        <PortalRejectedMessage 
          title="Revisie Aangevraagd"
          description="We hebben uw revisie verzoek ontvangen en nemen spoedig contact met u op."
        />
      </CustomerPortalLayout>
    );
  }

  return (
    <CustomerPortalLayout 
      title="Offerte Details" 
      subtitle="Bekijk en beheer uw offerte"
    >
      <div className="py-6 md:py-12 px-4">
        <div className="container mx-auto flex justify-center">
          <Card className="w-full max-w-3xl border shadow-md">
            <CardHeader className="border-b pb-6 bg-white">
              <QuotePortalHeader
                quoteId={quote.id}
                description={quote.description}
                status={quote.status as QuoteStatus}
              />
            </CardHeader>
            
            <CardContent className="py-6 space-y-6 bg-white">
              <QuoteDetails 
                customer={customer}
                quote={quote}
                formatCurrency={formatCurrency}
              />
              
              <h3 className="text-sm font-medium text-gray-500 pb-2 border-b mt-8">Offerteregels</h3>
              <div className="overflow-x-auto -mx-6 px-6">
                <QuoteLineItems 
                  lineItems={quote.lineItems}
                  formatCurrency={formatCurrency}
                />
              </div>
              
              <QuoteSignatureSection onSignatureChange={setSignature} />
            </CardContent>
            
            <CardFooter className="bg-white border-t">
              <QuoteActions
                onRevisionRequest={() => setIsRevisionDialogOpen(true)}
                onAccept={handleAccept}
              />
            </CardFooter>
          </Card>
        </div>
      </div>

      <QuoteRevisionDialog
        open={isRevisionDialogOpen}
        onOpenChange={setIsRevisionDialogOpen}
        revisionComment={revisionComment}
        onRevisionCommentChange={setRevisionComment}
        onSubmit={handleRevisionRequest}
      />
    </CustomerPortalLayout>
  );
};

export default CustomerPortal;
