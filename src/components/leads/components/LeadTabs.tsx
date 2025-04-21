
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadOverview } from "./LeadOverview";
import { AppointmentsTab } from "../tabs/AppointmentsTab";
import { NotesTab } from "../tabs/NotesTab";
import { QuotesTab } from "../tabs/QuotesTab";
import { WorkOrdersTab } from "../tabs/WorkOrdersTab";
import { InvoicesTab } from "../tabs/InvoicesTab";
import { Lead } from "@/types";
import { ProjectsTab } from "../tabs/ProjectsTab";
import { ReviewsTab } from "../tabs/ReviewsTab";

interface LeadTabsProps {
  lead: Lead;
  appointments: any[];
  notes: any[];
  quotes: any[];
  workAgreements: any[];
  invoices: any[];
  projects: any[];
}

export const LeadTabs = ({
  lead,
  appointments,
  notes,
  quotes,
  workAgreements,
  invoices,
  projects,
}: LeadTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="mt-8">
      <TabsList className="w-full justify-start border-b rounded-none px-0">
        <TabsTrigger value="overview" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Overzicht
        </TabsTrigger>
        <TabsTrigger value="quotes" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Offertes {quotes.length > 0 && `(${quotes.length})`}
        </TabsTrigger>
        <TabsTrigger value="workorders" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Werkovereenkomsten {workAgreements.length > 0 && `(${workAgreements.length})`}
        </TabsTrigger>
        <TabsTrigger value="invoices" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Facturen {invoices.length > 0 && `(${invoices.length})`}
        </TabsTrigger>
        <TabsTrigger value="projects" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Projecten {projects.length > 0 && `(${projects.length})`}
        </TabsTrigger>
        <TabsTrigger value="appointments" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Afspraken {appointments.length > 0 && `(${appointments.length})`}
        </TabsTrigger>
        <TabsTrigger value="notes" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Notities {notes.length > 0 && `(${notes.length})`}
        </TabsTrigger>
        <TabsTrigger value="reviews" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Reviews
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <LeadOverview
          lead={lead}
          quotes={quotes}
          invoices={invoices}
          workAgreements={workAgreements}
          appointments={appointments}
        />
      </TabsContent>

      <TabsContent value="quotes">
        <QuotesTab quotes={quotes} leadId={lead.id} />
      </TabsContent>

      <TabsContent value="workorders">
        <WorkOrdersTab workAgreements={workAgreements} leadId={lead.id} />
      </TabsContent>

      <TabsContent value="invoices">
        <InvoicesTab invoices={invoices} leadId={lead.id} />
      </TabsContent>

      <TabsContent value="projects">
        <ProjectsTab projects={projects} leadId={lead.id} />
      </TabsContent>

      <TabsContent value="appointments">
        <AppointmentsTab appointments={appointments} leadId={lead.id} />
      </TabsContent>

      <TabsContent value="notes">
        <NotesTab notes={notes} leadId={lead.id} />
      </TabsContent>
      
      <TabsContent value="reviews">
        <ReviewsTab lead={lead} />
      </TabsContent>
    </Tabs>
  );
};
