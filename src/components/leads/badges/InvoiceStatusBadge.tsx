
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@/types";
import { useInvoiceStatusBadge } from "@/hooks/useStatusBadge";

interface InvoiceStatusBadgeProps {
  status?: Invoice['status'];
}

export const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ status }) => {
  const statusConfig = useInvoiceStatusBadge(status);
  if (!statusConfig) return null;
  
  return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
};
