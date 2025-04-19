
import React from "react";
import { LeadDetail } from "@/types";
import { ContactInfo } from "./ContactInfo";
import { LeadDetailsCard } from "./LeadDetails";

interface LeadInfoCardsProps {
  lead: LeadDetail;
}

export const LeadInfoCards: React.FC<LeadInfoCardsProps> = ({ lead }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContactInfo lead={lead} />
      <LeadDetailsCard lead={lead} />
    </div>
  );
};
