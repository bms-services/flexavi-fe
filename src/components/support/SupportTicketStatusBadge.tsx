
import React from "react";
import { Badge } from "@/components/ui/badge";
import { SupportTicketStatus, SupportTicketPriority } from "@/types/support";
import { cn } from "@/utils/format";

interface SupportTicketStatusBadgeProps {
  status: SupportTicketStatus;
  className?: string;
}

export function SupportTicketStatusBadge({ status, className }: SupportTicketStatusBadgeProps) {
  let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "outline";
  let label = "";

  switch (status) {
    case "open":
      badgeVariant = "default";
      label = "Open";
      break;
    case "in-progress":
      badgeVariant = "secondary";
      label = "In behandeling";
      break;
    case "waiting-for-customer":
      badgeVariant = "outline";
      label = "Wachtend op klant";
      break;
    case "waiting-for-staff":
      badgeVariant = "outline";
      label = "Wachtend op medewerker";
      break;
    case "resolved":
      badgeVariant = "default";
      label = "Opgelost";
      break;
    case "closed":
      badgeVariant = "outline";
      label = "Gesloten";
      break;
    default:
      label = status;
  }

  return (
    <Badge variant={badgeVariant} className={className}>
      {label}
    </Badge>
  );
}

interface SupportTicketPriorityBadgeProps {
  priority: SupportTicketPriority;
  className?: string;
}

export function SupportTicketPriorityBadge({ priority, className }: SupportTicketPriorityBadgeProps) {
  let badgeColor = "";
  let label = "";

  switch (priority) {
    case "low":
      badgeColor = "bg-green-100 text-green-800 border-green-200";
      label = "Laag";
      break;
    case "medium":
      badgeColor = "bg-blue-100 text-blue-800 border-blue-200";
      label = "Gemiddeld";
      break;
    case "high":
      badgeColor = "bg-orange-100 text-orange-800 border-orange-200";
      label = "Hoog";
      break;
    case "urgent":
      badgeColor = "bg-red-100 text-red-800 border-red-200";
      label = "Urgent";
      break;
    default:
      label = priority;
  }

  return (
    <Badge variant="outline" className={cn(badgeColor, className)}>
      {label}
    </Badge>
  );
}
