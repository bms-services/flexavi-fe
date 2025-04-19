
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockQuotes } from "@/data/mockQuotes";
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
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";
import { FileText, ChevronLeft } from "lucide-react";
import { QuoteDetails } from "@/components/customer-portal/quote/QuoteDetails";
import { QuoteLineItems } from "@/components/customer-portal/quote/QuoteLineItems";

const CustomerPortalQuote = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<any | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
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
          </CardContent>
          
          <CardFooter className="flex justify-between space-x-4 border-t pt-6">
            <Button variant="outline" onClick={() => window.print()}>
              <FileText className="mr-2 h-4 w-4" />
              Download offerte
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPortalQuote;
