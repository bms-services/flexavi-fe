
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
import { formatCurrency } from "@/utils/format";
import { GeneralTerms } from "@/components/workagreements/customer-portal/components/GeneralTerms";
import { WarrantySection } from "@/components/customer-portal/quote/WarrantySection";
import { Attachments } from "@/components/workagreements/customer-portal/components/Attachments";
import { Separator } from "@/components/ui/separator";

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
        <div className="flex items-center justify-center py-12">
          <Card className="max-w-md w-full">
            <CardContent className="py-12 text-center">
              <p className="text-lg text-gray-600">Offerte niet gevonden.</p>
            </CardContent>
          </Card>
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

  // Sample mockup attachments for demonstration
  const demoAttachments = [
    { name: "Situatie dakkapel.jpg", url: "https://source.unsplash.com/random/800x600/?roof" },
    { name: "Materiaal voorbeelden.jpg", url: "https://source.unsplash.com/random/800x600/?construction" },
    { name: "Algemene voorwaarden.pdf", url: "#" }
  ];

  return (
    <CustomerPortalLayout 
      title="Offerte Details" 
      subtitle="Bekijk en beheer uw offerte"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="border shadow-md overflow-hidden bg-white">
          <CardHeader className="border-b pb-6 bg-gradient-to-r from-primary/10 to-primary/5">
            <QuotePortalHeader
              quoteId={quote.id}
              description={quote.description}
              status={quote.status as QuoteStatus}
            />
          </CardHeader>
          
          <CardContent className="py-8 space-y-8">
            <QuoteDetails 
              customer={customer}
              quote={quote}
              formatCurrency={formatCurrency}
            />
            
            <Separator className="my-8" />
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Specificatie</h3>
              <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
                <QuoteLineItems 
                  lineItems={quote.lineItems}
                  formatCurrency={formatCurrency}
                />
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <WarrantySection 
              warranty="Op alle installatie werkzaamheden geven wij 5 jaar garantie. Op de gebruikte materialen is de fabrieksgarantie van toepassing."
            />
            
            <Attachments 
              defaultAttachments={demoAttachments}
            />
            
            <GeneralTerms />
            
            <Separator className="my-8" />
            
            <QuoteSignatureSection onSignatureChange={setSignature} />
          </CardContent>
          
          <CardFooter className="bg-gray-50 border-t py-6">
            <QuoteActions
              onRevisionRequest={() => setIsRevisionDialogOpen(true)}
              onAccept={handleAccept}
            />
          </CardFooter>
        </Card>
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
