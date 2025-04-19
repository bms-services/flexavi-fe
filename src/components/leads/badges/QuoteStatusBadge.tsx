
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Quote } from "@/types";
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";

interface QuoteStatusBadgeProps {
  status?: Quote['status'];
}

export const QuoteStatusBadge: React.FC<QuoteStatusBadgeProps> = ({ status }) => {
  const statusConfig = useQuoteStatusBadge(status);
  if (!statusConfig) return null;
  
  return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
};
