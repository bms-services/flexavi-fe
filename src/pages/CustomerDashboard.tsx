
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { mockInvoices } from "@/data/mockInvoices";
import { mockQuotes } from "@/data/mockQuotes";
import { mockLeads } from "@/data/mockLeads";
import {
  Card,
  CardContent,
  CardDescription,
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
  Home,
  Phone,
  Mail,
  MapPin
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
  const [activeTab, setActiveTab] = useState("invoices");

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <p className="text-gray-700 font-medium">Gegevens laden...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
            <User className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Klant niet gevonden</h2>
          <p className="text-gray-500 mb-6">We konden geen klantgegevens vinden voor dit account.</p>
          <Link to="/">
            <Button className="w-full">Terug naar homepagina</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Klant Portal</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4 text-primary/70" />
                <span>{customer.email}</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mx-4">
                <Phone className="h-4 w-4 text-primary/70" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full">
                <User className="h-5 w-5 text-primary" />
                <span className="font-medium">{customer.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Customer Welcome Card */}
        <Card className="border-none overflow-hidden shadow-xl bg-white">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0"></div>
            <div className="relative z-10 p-8 md:p-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Welkom, {customer.name}</h2>
                  <p className="text-gray-600 text-lg max-w-xl">
                    Beheer eenvoudig uw project, bekijk offertes en facturen, en volg de voortgang van uw werkzaamheden.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{customer.address || "Geen adres bekend"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link to={`/portal/profile/${leadId}`}>
                    <Button variant="outline" className="shadow-sm">
                      Profiel bekijken
                    </Button>
                  </Link>
                  <Button className="shadow-sm">
                    Contact opnemen
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 p-6 lg:p-8 bg-gradient-to-b from-white to-gray-50 border-t">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
              <div className="text-center">
                <div className="bg-blue-50 inline-flex p-3 rounded-full mb-4">
                  <FileText className="h-7 w-7 text-blue-500" />
                </div>
                <p className="text-3xl font-bold mb-1">{customerQuotes.length}</p>
                <p className="text-sm text-gray-500">Offertes</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
              <div className="text-center">
                <div className="bg-green-50 inline-flex p-3 rounded-full mb-4">
                  <FileCheck className="h-7 w-7 text-green-500" />
                </div>
                <p className="text-3xl font-bold mb-1">{customerInvoices.length}</p>
                <p className="text-sm text-gray-500">Facturen</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
              <div className="text-center">
                <div className="bg-purple-50 inline-flex p-3 rounded-full mb-4">
                  <Image className="h-7 w-7 text-purple-500" />
                </div>
                <p className="text-3xl font-bold mb-1">{jobPhotos.length}</p>
                <p className="text-sm text-gray-500">Projectfoto's</p>
              </div>
            </div>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm p-1 shadow-md rounded-xl w-full grid grid-cols-3">
            <TabsTrigger value="invoices" className="rounded-lg py-3">
              <FileCheck className="h-4 w-4 mr-2" />
              Facturen
            </TabsTrigger>
            <TabsTrigger value="quotes" className="rounded-lg py-3">
              <FileText className="h-4 w-4 mr-2" />
              Offertes
            </TabsTrigger>
            <TabsTrigger value="photos" className="rounded-lg py-3">
              <Image className="h-4 w-4 mr-2" />
              Projectfoto's
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="invoices">
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-blue-500" />
                  Uw facturen
                </CardTitle>
                <CardDescription>Overzicht van al uw facturen</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {customerInvoices.length === 0 ? (
                  <div className="text-center py-10 px-6">
                    <div className="bg-blue-50 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <FileCheck className="h-8 w-8 text-blue-300" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Geen facturen gevonden</h3>
                    <p className="text-gray-500 max-w-md mx-auto">U heeft momenteel geen facturen. Wanneer er facturen beschikbaar zijn, zullen ze hier verschijnen.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customerInvoices.map(invoice => {
                      const statusBadge = useInvoiceStatusBadge(invoice.status);
                      return (
                        <div key={invoice.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
                          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                            <div>
                              <h3 className="font-medium text-lg flex items-center gap-2">
                                <FileCheck className="h-5 w-5 text-blue-500" />
                                {invoice.id.replace("inv-", "FACT-")}
                              </h3>
                              <p className="text-gray-500 mt-1">{invoice.description}</p>
                              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                  {format(new Date(invoice.createdAt), "dd-MM-yyyy", { locale: nl })}
                                </div>
                                <div className="flex items-center text-sm font-medium">
                                  <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                                  {formatCurrency(invoice.amount)}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col md:items-end gap-3 md:min-w-[140px]">
                              {statusBadge && (
                                <Badge variant={statusBadge.variant} className="mb-2">
                                  {statusBadge.label}
                                </Badge>
                              )}
                              <Link to={`/portal/invoice/${invoice.id}`}>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="gap-1 w-full md:w-auto border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
                                >
                                  Bekijken
                                  <ArrowRight className="h-3 w-3" />
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
          
          <TabsContent value="quotes">
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-white border-b">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-500" />
                  Uw offertes
                </CardTitle>
                <CardDescription>Overzicht van al uw offertes</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {customerQuotes.length === 0 ? (
                  <div className="text-center py-10 px-6">
                    <div className="bg-indigo-50 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <FileText className="h-8 w-8 text-indigo-300" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Geen offertes gevonden</h3>
                    <p className="text-gray-500 max-w-md mx-auto">U heeft momenteel geen offertes. Wanneer er offertes beschikbaar zijn, zullen ze hier verschijnen.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customerQuotes.map(quote => {
                      const statusBadge = useQuoteStatusBadge(quote.status);
                      return (
                        <div key={quote.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
                          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                            <div>
                              <h3 className="font-medium text-lg flex items-center gap-2">
                                <FileText className="h-5 w-5 text-indigo-500" />
                                {quote.id.replace("quote-", "OF-")}
                              </h3>
                              <p className="text-gray-500 mt-1">{quote.description}</p>
                              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                  {format(new Date(quote.createdAt), "dd-MM-yyyy", { locale: nl })}
                                </div>
                                <div className="flex items-center text-sm font-medium">
                                  <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                                  {formatCurrency(quote.amount)}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col md:items-end gap-3 md:min-w-[140px]">
                              {statusBadge && (
                                <Badge variant={statusBadge.variant} className="mb-2">
                                  {statusBadge.label}
                                </Badge>
                              )}
                              <Link to={`/portal/quote/${quote.id}`}>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="gap-1 w-full md:w-auto border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 hover:border-indigo-300"
                                >
                                  Bekijken
                                  <ArrowRight className="h-3 w-3" />
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
          
          <TabsContent value="photos">
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-purple-500" />
                  Projectfoto's
                </CardTitle>
                <CardDescription>Foto's van de voortgang van uw project</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobPhotos.map(photo => (
                    <div key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={photo.url} 
                          alt={photo.title} 
                          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg">{photo.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-purple-400" />
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
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 Bouw Bedrijf. Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/portal/help" className="text-sm text-gray-500 hover:text-primary">
                Help
              </Link>
              <Link to="/portal/contact" className="text-sm text-gray-500 hover:text-primary">
                Contact
              </Link>
              <Link to="/portal/privacy" className="text-sm text-gray-500 hover:text-primary">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerDashboard;
