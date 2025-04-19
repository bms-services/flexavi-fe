
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { mockInvoices } from "@/data/mockInvoices";
import { mockQuotes } from "@/data/mockQuotes";
import { mockLeads } from "@/data/mockLeads";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  FileCheck, 
  User, 
  Calendar, 
  CreditCard, 
  Image,
  ArrowRight,
  Home
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useInvoiceStatusBadge, useQuoteStatusBadge } from "@/hooks/useStatusBadge";

const jobPhotos = [
  { id: 1, title: "Voorbereiding dak", date: "2025-04-05T10:00:00Z", url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=500&auto=format&fit=crop" },
  { id: 2, title: "Isolatie installatie", date: "2025-04-06T09:30:00Z", url: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=500&auto=format&fit=crop" },
  { id: 3, title: "Plaatsing dakpannen", date: "2025-04-07T14:15:00Z", url: "https://images.unsplash.com/photo-1593604572577-1c6c44fa2f9f?q=80&w=500&auto=format&fit=crop" },
  { id: 4, title: "Eindresultaat", date: "2025-04-08T16:45:00Z", url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=500&auto=format&fit=crop" },
];

const CustomerDashboard = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const [customer, setCustomer] = useState<any | null>(null);
  const [customerInvoices, setCustomerInvoices] = useState<any[]>([]);
  const [customerQuotes, setCustomerQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would be an API call
    if (leadId) {
      const foundCustomer = mockLeads.find(l => l.id === leadId);
      if (foundCustomer) {
        setCustomer(foundCustomer);
        
        // Get customer invoices
        const invoices = mockInvoices.filter(i => i.leadId === leadId);
        setCustomerInvoices(invoices);
        
        // Get customer quotes
        const quotes = mockQuotes.filter(q => q.leadId === leadId);
        setCustomerQuotes(quotes);
      }
    }
    setLoading(false);
  }, [leadId]);

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

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Klant niet gevonden.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-bold">Klant Portal</h1>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{customer.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Welkom, {customer.name}</CardTitle>
            <CardDescription>
              Bekijk uw offertes, facturen en projectvoortgang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{customerQuotes.length}</p>
                <p className="text-sm text-gray-500">Offertes</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <FileCheck className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold">{customerInvoices.length}</p>
                <p className="text-sm text-gray-500">Facturen</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Image className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <p className="text-2xl font-bold">{jobPhotos.length}</p>
                <p className="text-sm text-gray-500">Projectfoto's</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="invoices">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="invoices">Facturen</TabsTrigger>
            <TabsTrigger value="quotes">Offertes</TabsTrigger>
            <TabsTrigger value="photos">Projectfoto's</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invoices" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Uw facturen</CardTitle>
                <CardDescription>
                  Overzicht van al uw facturen
                </CardDescription>
              </CardHeader>
              <CardContent>
                {customerInvoices.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">Geen facturen gevonden</p>
                ) : (
                  <div className="space-y-4">
                    {customerInvoices.map(invoice => {
                      const statusBadge = useInvoiceStatusBadge(invoice.status);
                      return (
                        <div key={invoice.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{invoice.id.replace("inv-", "FACT-")}</h3>
                              <p className="text-sm text-gray-500">{invoice.description}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {format(new Date(invoice.createdAt), "dd-MM-yyyy", { locale: nl })}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <CreditCard className="h-4 w-4 mr-1" />
                                  {formatCurrency(invoice.amount)}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {statusBadge && (
                                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                              )}
                              <Link to={`/portal/invoice/${invoice.id}`}>
                                <Button size="sm" variant="outline">
                                  Bekijken
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quotes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Uw offertes</CardTitle>
                <CardDescription>
                  Overzicht van al uw offertes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {customerQuotes.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">Geen offertes gevonden</p>
                ) : (
                  <div className="space-y-4">
                    {customerQuotes.map(quote => {
                      const statusBadge = useQuoteStatusBadge(quote.status);
                      return (
                        <div key={quote.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{quote.id.replace("quote-", "OF-")}</h3>
                              <p className="text-sm text-gray-500">{quote.description}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {format(new Date(quote.createdAt), "dd-MM-yyyy", { locale: nl })}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <CreditCard className="h-4 w-4 mr-1" />
                                  {formatCurrency(quote.amount)}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {statusBadge && (
                                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                              )}
                              <Link to={`/portal/quote/${quote.id}`}>
                                <Button size="sm" variant="outline">
                                  Bekijken
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="photos" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Projectfoto's</CardTitle>
                <CardDescription>
                  Foto's van de voortgang van uw project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobPhotos.map(photo => (
                    <div key={photo.id} className="border rounded-lg overflow-hidden">
                      <img 
                        src={photo.url} 
                        alt={photo.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-medium">{photo.title}</h3>
                        <p className="text-sm text-gray-500">
                          {format(new Date(photo.date), "d MMMM yyyy", { locale: nl })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CustomerDashboard;
