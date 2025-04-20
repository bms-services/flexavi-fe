
import React from "react";
import { FileText } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuoteStatus } from "@/types";
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";

interface QuotePortalHeaderProps {
  quoteId: string;
  description: string;
  status: QuoteStatus;
}

export const QuotePortalHeader: React.FC<QuotePortalHeaderProps> = ({
  quoteId,
  description,
  status,
}) => {
  const statusBadge = useQuoteStatusBadge(status);

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
      <div>
        <CardTitle className="text-xl md:text-2xl flex items-center gap-2 text-primary">
          <FileText className="h-6 w-6 text-primary shrink-0" />
          <span className="break-all">Offerte {quoteId.replace("quote-", "OF-")}</span>
        </CardTitle>
        <CardDescription className="mt-1 text-gray-600">{description}</CardDescription>
      </div>
      {statusBadge && (
        <Badge variant={statusBadge.variant} className="self-start font-medium">
          {statusBadge.label}
        </Badge>
      )}
    </div>
  );
};
