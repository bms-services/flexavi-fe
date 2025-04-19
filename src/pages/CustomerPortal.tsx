
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QuoteStatus } from "@/types";
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
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { FileText, User, MapPin, Calendar, Check, X } from "lucide-react";
import Signature from "@/components/customer/Signature";

const CustomerPortal = () => {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<any | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    // In een echte applicatie zou dit een API call zijn
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
    
    // In een echte applicatie zou dit een API call zijn om de offerte te accepteren
    setSubmitted(true);
    console.log("Offerte geaccepteerd met handtekening:", signature);
  };

  const handleReject = () => {
    // In een echte applicatie zou dit een API call zijn om de offerte af te wijzen
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">Offerte Geaccepteerd</CardTitle>
            <CardDescription>
              Hartelijk dank voor het accepteren van onze offerte.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Check className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <p>
              We hebben uw acceptatie ontvangen en zullen binnenkort contact met u opnemen
              om de volgende stappen te bespreken.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (rejected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-600">Offerte Afgewezen</CardTitle>
            <CardDescription>
              We hebben uw afwijzing geregistreerd.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <X className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <p>
              Mocht u van gedachten veranderen of vragen hebben, aarzel dan niet om contact met ons op te nemen.
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
                <h3 className="text-sm font-medium text-gray-500 mb-2">Offerte details</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Datum: {format(new Date(quote.createdAt), "d MMMM yyyy", {
                      locale: nl,
                    })}</span>
                  </div>
                  {quote.plannedStartDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Geplande startdatum: {format(new Date(quote.plannedStartDate), "d MMMM yyyy", {
                        locale: nl,
                      })}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <h3 className="text-sm font-medium text-gray-500 pb-2 border-b">Offerteregels</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Beschrijving</th>
                    <th className="text-center py-2">Aantal</th>
                    <th className="text-center py-2">Eenheid</th>
                    <th className="text-right py-2">Prijs per eenheid</th>
                    <th className="text-right py-2">Totaal</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.lineItems.map((item: any) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">{item.description}</td>
                      <td className="text-center py-2">{item.quantity}</td>
                      <td className="text-center py-2">{item.unit}</td>
                      <td className="text-right py-2">{formatCurrency(item.pricePerUnit)}</td>
                      <td className="text-right py-2">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4} className="text-right py-4 font-medium">Totaal:</td>
                    <td className="text-right py-4 font-bold">{formatCurrency(quote.amount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
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
              <X className="mr-2 h-4 w-4" />
              Offerte afwijzen
            </Button>
            <Button onClick={handleAccept}>
              <Check className="mr-2 h-4 w-4" />
              Offerte accepteren
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPortal;
