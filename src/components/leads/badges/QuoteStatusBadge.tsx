
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Quote } from "@/types";

interface QuoteStatusBadgeProps {
  status?: Quote['status'];
}

export const QuoteStatusBadge: React.FC<QuoteStatusBadgeProps> = ({ status }) => {
  if (!status) return null;

  const statusConfig = {
    draft: { label: "Concept", variant: "outline" as const },
    sent: { label: "Verzonden", variant: "default" as const },
    accepted: { label: "Geaccepteerd", variant: "success" as const },
    rejected: { label: "Afgewezen", variant: "destructive" as const },
    revised: { label: "Herzien", variant: "warning" as const },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};
