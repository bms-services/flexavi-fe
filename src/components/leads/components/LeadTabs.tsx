
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { NotesTab } from "../tabs/NotesTab";
import { AppointmentsTab } from "../tabs/AppointmentsTab";
import { QuotesTab } from "../tabs/QuotesTab";
import { InvoicesTab } from "../tabs/InvoicesTab";
import { ProjectsTab } from "../tabs/ProjectsTab";
import { WorkOrdersTab } from "../tabs/WorkOrdersTab";
import { LeadDetail } from "@/types";
import { ListPlus, Briefcase } from "lucide-react";

interface LeadTabsProps {
  lead: LeadDetail;
}

export const LeadTabs: React.FC<LeadTabsProps> = ({ lead }) => {
  return (
    <Card>
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 overflow-x-auto">
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
          <TabsTrigger value="workorders" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Briefcase className="h-4 w-4 mr-2" />
            Werkopdrachten
          </TabsTrigger>
          <TabsTrigger value="projects" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <ListPlus className="h-4 w-4 mr-2" />
            Projecten
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
          <TabsContent value="workorders">
            <WorkOrdersTab leadId={lead.id} />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsTab leadId={lead.id} />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};
