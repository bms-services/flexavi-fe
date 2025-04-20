
import React from "react";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { QuoteStatus } from "@/types";
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";

interface QuotePortalHeaderProps {
  quoteId: string;
  description: string;
  status: QuoteStatus;
}

export const QuotePortalHeader = ({ quoteId, description, status }: QuotePortalHeaderProps) => {
  const statusBadge = useQuoteStatusBadge(status);

  return (
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Offerte {quoteId.replace("quote-", "OF-")}
        </h2>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {statusBadge && (
        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
      )}
    </div>
  );
};
