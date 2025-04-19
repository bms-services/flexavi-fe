
import React from "react";
import { LeadDetail as LeadDetailType } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Mail, MapPin, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { Button } from "@/components/ui/button";
import { NotesTab } from "./tabs/NotesTab";
import { AppointmentsTab } from "./tabs/AppointmentsTab";
import { QuotesTab } from "./tabs/QuotesTab";
import { InvoicesTab } from "./tabs/InvoicesTab";
import { getLeadStats, formatCurrency } from "@/utils/leadStats";

interface LeadDetailProps {
  lead: LeadDetailType;
}

export const LeadDetail: React.FC<LeadDetailProps> = ({ lead }) => {
  const formatDate = (date: string) => {
    return format(new Date(date), "d MMMM yyyy", { locale: nl });
  };

  const leadStats = getLeadStats(lead.id);

  return (
    <div className="space-y-6">
      {/* Hero Section with Quick Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
            <LeadStatusBadge status={lead.status} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white/50 border-none">
              <CardHeader className="p-4">
                <CardDescription>Totale Waarde</CardDescription>
                <CardTitle className="text-2xl text-primary">
                  {formatCurrency(leadStats.quotesValue)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/50 border-none">
              <CardHeader className="p-4">
                <CardDescription>Betaald</CardDescription>
                <CardTitle className="text-2xl text-emerald-600">
                  {formatCurrency(leadStats.invoicesValue)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/50 border-none">
              <CardHeader className="p-4">
                <CardDescription>Laatste Offerte</CardDescription>
                <CardTitle className="text-lg">
                  {leadStats.latestQuoteStatus ? (
                    <LeadStatusBadge status={leadStats.latestQuoteStatus} />
                  ) : (
                    "Geen"
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/50 border-none">
              <CardHeader className="p-4">
                <CardDescription>Laatste Factuur</CardDescription>
                <CardTitle className="text-lg">
                  {leadStats.latestInvoiceStatus ? (
                    <LeadStatusBadge status={leadStats.latestInvoiceStatus} />
                  ) : (
                    "Geen"
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="outline">Notitie Toevoegen</Button>
          <Button variant="outline">Afspraak Plannen</Button>
          <Button>Lead Bewerken</Button>
        </div>
      </div>

      {/* Contact & Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Informatie</CardTitle>
            <CardDescription>Belangrijke contactgegevens van de lead</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Naam</p>
                <p className="font-medium">{lead.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{lead.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Telefoon</p>
                <p className="font-medium">{lead.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Adres</p>
                <p className="font-medium">{lead.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Details */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Details</CardTitle>
            <CardDescription>Algemene informatie over de lead</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <FileText className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Bron</p>
                <p className="font-medium">{lead.source}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Aangemaakt op</p>
                <p className="font-medium">{formatDate(lead.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Laatste update</p>
                <p className="font-medium">{formatDate(lead.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Card>
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger value="notes" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Notities
            </TabsTrigger>
            <TabsTrigger value="appointments" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Afspraken
            </TabsTrigger>
            <TabsTrigger value="quotes" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Offertes
            </TabsTrigger>
            <TabsTrigger value="invoices" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Facturen
            </TabsTrigger>
          </TabsList>
          
          <div className="p-6">
            <TabsContent value="notes">
              <NotesTab notes={lead.notes} leadId={lead.id} />
            </TabsContent>
            <TabsContent value="appointments">
              <AppointmentsTab appointments={lead.appointments} leadId={lead.id} />
            </TabsContent>
            <TabsContent value="quotes">
              <QuotesTab quotes={lead.quotes} leadId={lead.id} />
            </TabsContent>
            <TabsContent value="invoices">
              <InvoicesTab invoices={lead.invoices} leadId={lead.id} />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
};
