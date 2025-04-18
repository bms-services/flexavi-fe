
import React from "react";
import { Badge } from "@/components/ui/badge";
import { LeadStatus } from "@/types";

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

export const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    new: { label: "Nieuw", variant: "default" as const },
    contacted: { label: "Contact", variant: "secondary" as const },
    qualified: { label: "Gekwalificeerd", variant: "outline" as const },
    proposal: { label: "Offerte", variant: "primary" as const },
    negotiation: { label: "Onderhandeling", variant: "warning" as const },
    won: { label: "Gewonnen", variant: "success" as const },
    lost: { label: "Verloren", variant: "destructive" as const },
  };

  const config = statusConfig[status] || statusConfig.new;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};
