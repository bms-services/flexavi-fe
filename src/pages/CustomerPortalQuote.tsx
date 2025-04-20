import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockQuotes } from "@/data/mockQuotes";
import { mockLeads } from "@/data/mockLeads";
import { useToast } from "@/hooks/use-toast";
import { QuotePortalLoading } from "@/components/customer-portal/quote/QuotePortalLoading";
import { QuotePortalNotFound } from "@/components/customer-portal/quote/QuotePortalNotFound";
import { QuotePortalContent } from "@/components/customer-portal/quote/QuotePortalContent";
import { FloatingActions } from "@/components/customer-portal/quote/FloatingActions";
import { QuoteRevisionDialog } from "@/components/customer-portal/quote/QuoteRevisionDialog";

const CustomerPortalQuote = () => {
  const { id } = useParams<{ id: string }>();
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
    return <QuotePortalLoading />;
  }

  if (!quote || !customer) {
    return <QuotePortalNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-[80%]">
          <div className="p-4">
            <QuotePortalContent
              quote={quote}
              customer={customer}
              companyDetails={companyDetails}
              demoAttachments={demoAttachments}
            />
          </div>
        </div>
        
        <div className="w-[20%]">
          <FloatingActions
            onAccept={handleAccept}
            onRequestRevision={handleRevisionRequest}
            onReject={handleReject}
          />
        </div>
      </div>

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
