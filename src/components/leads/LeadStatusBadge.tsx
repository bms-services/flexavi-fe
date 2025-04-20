
import React from "react";
import { Badge } from "@/components/ui/badge";
import { LeadStatus } from "@/types";

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

export const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    new_lead: { label: "Nieuwe lead", variant: "default" as const },
    appointment_scheduled: { label: "Afspraak ingepland", variant: "secondary" as const },
    warranty_visit: { label: "Garantie afspraak", variant: "outline" as const },
    payment_pending: { label: "Openstaande betaling", variant: "warning" as const },
    in_collection: { label: "Loopt bij incasso", variant: "destructive" as const },
    legal_case: { label: "Rechtzaak lopend", variant: "destructive" as const },
    satisfied: { label: "Tevreden klant", variant: "success" as const },
  };

  const config = statusConfig[status] || statusConfig.new_lead;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};
