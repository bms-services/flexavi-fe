
import React from "react";
import { LeadStatusBadge } from "../LeadStatusBadge";
import { LeadRes } from "@/zustand/types/leadT";

interface LeadHeaderProps {
  lead: LeadRes;
}

export const LeadHeader: React.FC<LeadHeaderProps> = ({ lead }) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
      <LeadStatusBadge status={lead.status} />
    </div>
  );
};
