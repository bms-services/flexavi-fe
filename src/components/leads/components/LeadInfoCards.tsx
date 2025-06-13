
import React from "react";
import { ContactInfo } from "./ContactInfo";
import { LeadDetailsCard } from "./LeadDetails";
import { LeadRes } from "@/zustand/types/leadT";

interface LeadInfoCardsProps {
  lead: LeadRes;
}

export const LeadInfoCards: React.FC<LeadInfoCardsProps> = ({ lead }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContactInfo lead={lead} />
      <LeadDetailsCard lead={lead} />
    </div>
  );
};
