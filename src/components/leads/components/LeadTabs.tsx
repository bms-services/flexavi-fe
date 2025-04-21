
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadOverview } from "./LeadOverview";
import { AppointmentsTab } from "../tabs/AppointmentsTab";
import { NotesTab } from "../tabs/NotesTab";
import { QuotesTab } from "../tabs/QuotesTab";
import { WorkOrdersTab } from "../tabs/WorkOrdersTab";
import { InvoicesTab } from "../tabs/InvoicesTab";
import { LeadDetail } from "@/types";
import { ProjectsTab } from "../tabs/ProjectsTab";
import { ReviewsTab } from "../tabs/ReviewsTab";

interface LeadTabsProps {
  lead: LeadDetail;
}

export const LeadTabs = ({ lead }: LeadTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="mt-8">
      <TabsList className="w-full justify-start border-b rounded-none px-0">
        <TabsTrigger value="overview" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Overzicht
        </TabsTrigger>
        <TabsTrigger value="quotes" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Offertes {lead.quotes.length > 0 && `(${lead.quotes.length})`}
        </TabsTrigger>
        <TabsTrigger value="workorders" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Werkovereenkomsten {lead.workAgreements && lead.workAgreements.length > 0 && `(${lead.workAgreements.length})`}
        </TabsTrigger>
        <TabsTrigger value="invoices" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Facturen {lead.invoices.length > 0 && `(${lead.invoices.length})`}
        </TabsTrigger>
        <TabsTrigger value="projects" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Projecten
        </TabsTrigger>
        <TabsTrigger value="appointments" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Afspraken {lead.appointments.length > 0 && `(${lead.appointments.length})`}
        </TabsTrigger>
        <TabsTrigger value="notes" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Notities {lead.notes.length > 0 && `(${lead.notes.length})`}
        </TabsTrigger>
        <TabsTrigger value="reviews" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Reviews
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <LeadOverview
          lead={lead}
          quotes={lead.quotes}
          invoices={lead.invoices}
          workAgreements={lead.workAgreements || []}
          appointments={lead.appointments}
        />
      </TabsContent>

      <TabsContent value="quotes">
        <QuotesTab quotes={lead.quotes} leadId={lead.id} />
      </TabsContent>

      <TabsContent value="workorders">
        <WorkOrdersTab leadId={lead.id} />
      </TabsContent>

      <TabsContent value="invoices">
        <InvoicesTab invoices={lead.invoices} leadId={lead.id} />
      </TabsContent>

      <TabsContent value="projects">
        <ProjectsTab leadId={lead.id} />
      </TabsContent>

      <TabsContent value="appointments">
        <AppointmentsTab appointments={lead.appointments} leadId={lead.id} />
      </TabsContent>

      <TabsContent value="notes">
        <NotesTab notes={lead.notes} leadId={lead.id} />
      </TabsContent>
      
      <TabsContent value="reviews">
        <ReviewsTab lead={lead} />
      </TabsContent>
    </Tabs>
  );
};
