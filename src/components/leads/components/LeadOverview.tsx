
import React from "react";
import { LeadHeader } from "./LeadHeader";
import { LeadStats } from "./LeadStats";
import { ActiveQuotes } from "./ActiveQuotes";
import { RecentActivities } from "./RecentActivities";
import { LeadDetailActions } from "./LeadActions";
import { WozValueCard } from "./WozValueCard";
import { LeadLocationMap } from "./LeadLocationMap";
import { LeadMedia } from "./LeadMedia";
import { LeadRes } from "@/zustand/types/leadT";

interface LeadOverviewProps {
  lead: LeadRes;
}

export const LeadOverview: React.FC<LeadOverviewProps> = ({ lead }) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <LeadHeader lead={lead} />
        <LeadStats lead={lead} />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <ActiveQuotes quotes={lead.quotes} />
        <RecentActivities activities={[...lead.quotes, ...lead.invoices]} />
      </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <WozValueCard address={lead.address} />
        <LeadLocationMap address={lead.address} />
      </div> */}

      <LeadMedia leadId={lead.id} />
      <LeadDetailActions />
    </div>
  );
};

