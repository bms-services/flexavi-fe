
import React from "react";
import { LeadDetail as LeadDetailType } from "@/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Phone, Mail, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { Button } from "@/components/ui/button";
import { NotesTab } from "./tabs/NotesTab";
import { AppointmentsTab } from "./tabs/AppointmentsTab";
import { QuotesTab } from "./tabs/QuotesTab";
import { InvoicesTab } from "./tabs/InvoicesTab";

interface LeadDetailProps {
  lead: LeadDetailType;
}

export const LeadDetail: React.FC<LeadDetailProps> = ({ lead }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Contact Informatie</CardTitle>
            <CardDescription>Details van de lead</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Naam</p>
                <p className="font-medium">{lead.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{lead.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Telefoon</p>
                <p className="font-medium">{lead.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Adres</p>
                <p className="font-medium">{lead.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:w-2/3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lead Status</CardTitle>
                <CardDescription>
                  Overzicht van de huidige status
                </CardDescription>
              </div>
              <Button>Status Bijwerken</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Huidige Status</p>
                <div className="text-lg font-medium flex items-center">
                  <LeadStatusBadge status={lead.status} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Bron</p>
                <p className="font-medium">{lead.source}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Toegevoegd op</p>
                <p className="font-medium">
                  {format(new Date(lead.createdAt), "d MMMM yyyy", {
                    locale: nl,
                  })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Laatste update</p>
                <div className="font-medium flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  {format(new Date(lead.updatedAt), "d MMMM yyyy", {
                    locale: nl,
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notes">
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
        <TabsContent value="notes" className="pt-6">
          <NotesTab notes={lead.notes} leadId={lead.id} />
        </TabsContent>
        <TabsContent value="appointments" className="pt-6">
          <AppointmentsTab appointments={lead.appointments} leadId={lead.id} />
        </TabsContent>
        <TabsContent value="quotes" className="pt-6">
          <QuotesTab quotes={lead.quotes} leadId={lead.id} />
        </TabsContent>
        <TabsContent value="invoices" className="pt-6">
          <InvoicesTab invoices={lead.invoices} leadId={lead.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
