
import React from "react";
import { LeadDetail as LeadDetailType } from "@/types";
import { LeadOverview } from "./components/LeadOverview";
import { LeadInfoCards } from "./components/LeadInfoCards";
import { LeadTabs } from "./components/LeadTabs";

interface LeadDetailProps {
  lead: LeadDetailType;
}

export const LeadDetail: React.FC<LeadDetailProps> = ({ lead }) => {
  return (
    <div className="space-y-6">
      <LeadOverview lead={lead} />
      <LeadInfoCards lead={lead} />
      <LeadTabs lead={lead} />
    </div>
  );
};
