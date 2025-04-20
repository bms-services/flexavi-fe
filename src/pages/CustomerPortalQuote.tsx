
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockQuotes } from "@/data/mockQuotes";
import { mockLeads } from "@/data/mockLeads";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";
import { FileText, Download, Printer } from "lucide-react";
import { QuoteDetails } from "@/components/customer-portal/quote/QuoteDetails";
import { QuoteLineItems } from "@/components/customer-portal/quote/QuoteLineItems";
import { formatCurrency } from "@/utils/format";
import { GeneralTerms } from "@/components/workagreements/customer-portal/components/GeneralTerms";
import { WarrantySection } from "@/components/customer-portal/quote/WarrantySection";
import { Attachments } from "@/components/workagreements/customer-portal/components/Attachments";
import { Separator } from "@/components/ui/separator";
import { CompanyDetails } from "@/components/workagreements/customer-portal/components/CompanyDetails";
import { FloatingActions } from "@/components/customer-portal/quote/FloatingActions";
import { QuoteRevisionDialog } from "@/components/customer-portal/quote/QuoteRevisionDialog";
import { useToast } from "@/hooks/use-toast";

const CustomerPortalQuote = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quote, setQuote] = useState<any | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
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

  const statusBadge = useQuoteStatusBadge(quote?.status);

  const companyDetails = {
    name: "Mijn Dakbedrijf B.V.",
    address: "Dakstraat 10, 1234 AB Amsterdam",
    email: "info@dakbedrijf.nl",
    phone: "020-1234567",
    taxId: "NL123456789B01",
    bankName: "ING Bank",
    iban: "NL00 INGB 0000 0000 00"
  };
  
  const demoAttachments = [
    { name: "Situatie foto's.jpg", url: "https://source.unsplash.com/random/800x600/?construction" },
    { name: "Materiaal specificaties.jpg", url: "https://source.unsplash.com/random/800x600/?material" },
    { name: "Algemene voorwaarden.pdf", url: "#" }
  ];

  const handleAccept = () => {
    toast({
      title: "Offerte geaccepteerd",
      description: "We nemen zo spoedig mogelijk contact met u op.",
    });
  };

  const handleRevisionRequest = () => {
    setRevisionDialogOpen(true);
  };

  const handleRevisionSubmit = () => {
    setRevisionDialogOpen(false);
    setRevisionComment("");
    toast({
      title: "Revisie verzoek verzonden",
      description: "We nemen zo spoedig mogelijk contact met u op.",
    });
  };

  const handleReject = () => {
    toast({
      title: "Offerte geweigerd",
      description: "We nemen zo spoedig mogelijk contact met u op.",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!quote || !customer) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center">
            <p className="text-lg text-gray-600">Offerte niet gevonden.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-4xl mx-auto p-4">
        <Card className="border shadow-md bg-white">
          <CardHeader className="border-b pb-6 bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Offerte {quote.id.replace("quote-", "OF-")}
                </h2>
                <p className="text-muted-foreground mt-1">{quote.description}</p>
              </div>
              {statusBadge && (
                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="py-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CompanyDetails companyDetails={companyDetails} />
              <QuoteDetails 
                customer={customer} 
                quote={quote} 
                formatCurrency={formatCurrency}
              />
            </div>
            
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
          </CardContent>
          
          <CardFooter className="flex justify-between space-x-4 border-t py-6 bg-gray-50">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Afdrukken
            </Button>
            <Button variant="default">
              <Download className="mr-2 h-4 w-4" />
              Download offerte
            </Button>
          </CardFooter>
        </Card>
      </div>

      <FloatingActions
        onAccept={handleAccept}
        onRequestRevision={handleRevisionRequest}
        onReject={handleReject}
      />

      <QuoteRevisionDialog
        open={revisionDialogOpen}
        onOpenChange={setRevisionDialogOpen}
        revisionComment={revisionComment}
        onRevisionCommentChange={setRevisionComment}
        onSubmit={handleRevisionSubmit}
      />
    </div>
  );
};

export default CustomerPortalQuote;
