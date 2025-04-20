import React, { useState } from "react";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

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
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                    <span className="break-all">Offerte {quote.id.replace("quote-", "OF-")}</span>
                  </CardTitle>
                  <CardDescription className="mt-1">{quote.description}</CardDescription>
                </div>
                {statusBadge && (
                  <Badge variant={statusBadge.variant} className="self-start">
                    {statusBadge.label}
                  </Badge>
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
            
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsRevisionDialogOpen(true)}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Revisie Aanvragen
              </Button>
              <Button 
                onClick={handleAccept}
                className="w-full sm:w-auto order-1 sm:order-2"
              >
                Offerte accepteren
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Dialog open={isRevisionDialogOpen} onOpenChange={setIsRevisionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revisie Aanvragen</DialogTitle>
            <DialogDescription>
              Geef aan welke aanpassingen u graag zou willen zien in de offerte.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={revisionComment}
              onChange={(e) => setRevisionComment(e.target.value)}
              placeholder="Beschrijf hier uw gewenste aanpassingen..."
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRevisionDialogOpen(false)}>
              Annuleren
            </Button>
            <Button onClick={handleRevisionRequest} disabled={!revisionComment}>
              Verstuur Revisie Verzoek
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerPortal;
