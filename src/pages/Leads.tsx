
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { LeadList } from "@/components/leads/LeadList";
import { mockLeads } from "@/data/mockData";

const Leads = () => {
  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Beheer al je leads op één plek.
          </p>
        </div>

        <LeadList leads={mockLeads} />
      </div>
    </Layout>
  );
};

export default Leads;
