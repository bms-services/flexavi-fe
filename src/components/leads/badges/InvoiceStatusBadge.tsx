
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@/types";

interface InvoiceStatusBadgeProps {
  status?: Invoice['status'];
}

export const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ status }) => {
  if (!status) return null;

  const statusConfig = {
    draft: { label: "Concept", variant: "outline" as const },
    sent: { label: "Verzonden", variant: "default" as const },
    paid: { label: "Betaald", variant: "success" as const },
    overdue: { label: "Te laat", variant: "destructive" as const },
    canceled: { label: "Geannuleerd", variant: "secondary" as const },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};
