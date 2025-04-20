import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QuoteStatus } from "@/types";
import { mockQuotes } from "@/data/mockQuotes";
import { mockLeads } from "@/data/mockLeads";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Signature from "@/components/customer/Signature";
import { QuoteDetails } from "@/components/customer-portal/quote/QuoteDetails";
import { QuoteLineItems } from "@/components/customer-portal/quote/QuoteLineItems";
import PortalSuccessMessage from "@/components/customer-portal/PortalSuccessMessage";
import PortalRejectedMessage from "@/components/customer-portal/PortalRejectedMessage";
import { QuotePortalHeader } from "@/components/customer-portal/quote/QuotePortalHeader";
import { QuoteRevisionDialog } from "@/components/customer-portal/quote/QuoteRevisionDialog";
import { QuoteActions } from "@/components/customer-portal/quote/QuoteActions";

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
        title="Revisie Aangevraagd"
        description="We hebben uw revisie verzoek ontvangen en nemen spoedig contact met u op."
      />
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4">
        <div className="container mx-auto flex justify-center">
          <Card className="w-full max-w-3xl">
            <CardHeader className="border-b pb-6">
              <QuotePortalHeader
                quoteId={quote.id}
                description={quote.description}
                status={quote.status as QuoteStatus}
              />
            </CardHeader>
            
            <CardContent className="py-6 space-y-6">
              <QuoteDetails 
                customer={customer}
                quote={quote}
                formatCurrency={formatCurrency}
              />
              
              <h3 className="text-sm font-medium text-gray-500 pb-2 border-b">Offerteregels</h3>
              <div className="overflow-x-auto -mx-6 px-6">
                <QuoteLineItems 
                  lineItems={quote.lineItems}
                  formatCurrency={formatCurrency}
                />
              </div>
              
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-medium mb-4">Handtekening</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Om deze offerte te accepteren, plaats uw handtekening hieronder en klik op 'Accepteren'.
                </p>
                <Signature onSignatureChange={setSignature} />
              </div>
            </CardContent>
            
            <CardFooter>
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
    </>
  );
};

export default CustomerPortal;
