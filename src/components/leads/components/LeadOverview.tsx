
import React from "react";
import { LeadDetail } from "@/types";
import { LeadHeader } from "./LeadHeader";
import { LeadStats } from "./LeadStats";
import { ActiveQuotes } from "./ActiveQuotes";
import { RecentActivities } from "./RecentActivities";
import { LeadDetailActions } from "./LeadActions";

interface LeadOverviewProps {
  lead: LeadDetail;
}

export const LeadOverview: React.FC<LeadOverviewProps> = ({ lead }) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <LeadHeader lead={lead} />
        <LeadStats lead={lead} />
      </div>

      <ActiveQuotes quotes={lead.quotes} />
      <RecentActivities activities={[...lead.quotes, ...lead.invoices]} />
      <LeadDetailActions />
    </div>
  );
};
