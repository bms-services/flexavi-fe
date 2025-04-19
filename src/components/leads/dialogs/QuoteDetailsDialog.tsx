
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Quote } from "@/types";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/leadStats";
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";

interface QuoteDetailsDialogProps {
  quote: Quote;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuoteDetailsDialog: React.FC<QuoteDetailsDialogProps> = ({
  quote,
  open,
  onOpenChange,
}) => {
  const statusConfig = useQuoteStatusBadge(quote.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Offerte Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Offerte nummer</p>
              <p className="font-medium">{quote.id.replace("quote-", "OF-")}</p>
            </div>
            {statusConfig && <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Datum</p>
            <p className="font-medium">
              {format(new Date(quote.createdAt), "d MMMM yyyy", { locale: nl })}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Bedrag</p>
            <p className="font-semibold text-lg">{formatCurrency(quote.amount)}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Werkomschrijving</p>
            <p className="font-medium">{quote.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
