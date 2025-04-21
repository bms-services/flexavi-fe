
import React from "react";
import { Badge } from "@/components/ui/badge";
import { RequestStatus } from "@/types/requests";

interface RequestStatusBadgeProps {
  status: RequestStatus;
}

export const RequestStatusBadge: React.FC<RequestStatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<RequestStatus, { label: string; variant: "default" | "outline" | "secondary" | "destructive" }> = {
    idea: { label: "Idee", variant: "outline" },
    planned: { label: "Gepland", variant: "secondary" },
    in_progress: { label: "In ontwikkeling", variant: "default" },
    beta: { label: "Beta", variant: "secondary" },
    rolled_out: { label: "Uitgerold", variant: "default" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};
