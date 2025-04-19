
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { NotesTab } from "../tabs/NotesTab";
import { AppointmentsTab } from "../tabs/AppointmentsTab";
import { QuotesTab } from "../tabs/QuotesTab";
import { InvoicesTab } from "../tabs/InvoicesTab";
import { LeadDetail } from "@/types";

interface LeadTabsProps {
  lead: LeadDetail;
}

export const LeadTabs: React.FC<LeadTabsProps> = ({ lead }) => {
  return (
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
  );
};
