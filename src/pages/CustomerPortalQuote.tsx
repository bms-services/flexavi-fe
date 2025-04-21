
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockQuotes } from "@/data/mockData";
import { mockLeads } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { QuotePortalLoading } from "@/components/customer-portal/quote/QuotePortalLoading";
import { QuotePortalNotFound } from "@/components/customer-portal/quote/QuotePortalNotFound";
import { QuotePortalContent } from "@/components/customer-portal/quote/QuotePortalContent";
import { FloatingActions } from "@/components/customer-portal/quote/FloatingActions";
import { QuoteRevisionDialog } from "@/components/customer-portal/quote/QuoteRevisionDialog";
import { AcceptQuoteDialog } from "@/components/customer-portal/quote/AcceptQuoteDialog";
import { RejectQuoteDialog } from "@/components/customer-portal/quote/RejectQuoteDialog";

const CustomerPortalQuote = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quote, setQuote] = useState<any | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
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
    setAcceptDialogOpen(true);
  };

  const handleAcceptWithSignature = (signatureData: string) => {
    console.log("Quote accepted with signature:", signatureData);
    
    toast({
      title: "Offerte geaccepteerd",
      description: "Bedankt voor uw acceptatie. We nemen zo spoedig mogelijk contact met u op.",
    });
    
    // In a real app, we would update the quote status in the database here
  };

  const handleRevisionRequest = () => {
    setRevisionDialogOpen(true);
  };

  const handleRevisionSubmit = () => {
    setRevisionDialogOpen(false);
    console.log("Revision requested with comment:", revisionComment);
    setRevisionComment("");
    
    toast({
      title: "Revisie verzoek verzonden",
      description: "We nemen zo spoedig mogelijk contact met u op.",
    });
    
    // In a real app, we would update the quote status in the database here
  };

  const handleReject = () => {
    setRejectDialogOpen(true);
  };
  
  const handleRejectWithReason = (reason: string) => {
    console.log("Quote rejected with reason:", reason);
    
    toast({
      title: "Offerte geweigerd",
      description: "Bedankt voor uw feedback. We nemen zo spoedig mogelijk contact met u op.",
    });
    
    // In a real app, we would update the quote status in the database here
  };

  if (loading) {
    return <QuotePortalLoading />;
  }

  if (!quote || !customer) {
    return <QuotePortalNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-4xl mx-auto p-4">
        <QuotePortalContent
          quote={quote}
          customer={customer}
          companyDetails={companyDetails}
          demoAttachments={demoAttachments}
        />
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
      
      <AcceptQuoteDialog
        open={acceptDialogOpen}
        onOpenChange={setAcceptDialogOpen}
        onAcceptWithSignature={handleAcceptWithSignature}
      />
      
      <RejectQuoteDialog
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        onReject={handleRejectWithReason}
      />
    </div>
  );
};

export default CustomerPortalQuote;
