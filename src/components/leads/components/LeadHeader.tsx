
import React from "react";
import { LeadDetail } from "@/types";
import { LeadStatusBadge } from "../LeadStatusBadge";

interface LeadHeaderProps {
  lead: LeadDetail;
}

export const LeadHeader: React.FC<LeadHeaderProps> = ({ lead }) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
      <LeadStatusBadge status={lead.status} />
    </div>
  );
};
