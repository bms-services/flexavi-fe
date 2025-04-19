
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Quote } from "@/types";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/leadStats";
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";
import { Separator } from "@/components/ui/separator";

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
  const createdDate = format(new Date(quote.createdAt), "d MMMM yyyy", { locale: nl });
  const formattedAmount = formatCurrency(quote.amount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Offerte Details</DialogTitle>
          <DialogDescription>
            Volledige informatie over offerte {quote.id.replace("quote-", "OF-")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header sectie met basis informatie */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Offerte nummer</p>
              <p className="font-medium">{quote.id.replace("quote-", "OF-")}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              {statusConfig && (
                <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aangemaakt op</p>
              <p className="font-medium">{createdDate}</p>
            </div>
          </div>

          <Separator />

          {/* Financiële details */}
          <div>
            <h3 className="font-semibold mb-3">Financiële Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Subtotaal</p>
                <p className="font-medium">{formatCurrency(quote.amount * 0.79)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">BTW (21%)</p>
                <p className="font-medium">{formatCurrency(quote.amount * 0.21)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Totaalbedrag</p>
                <p className="font-semibold text-lg text-primary">{formattedAmount}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Project details */}
          <div>
            <h3 className="font-semibold mb-3">Project Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Werkomschrijving</p>
                <p className="font-medium">{quote.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Locatie</p>
                <p className="font-medium">{quote.location || "Niet gespecificeerd"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Geplande startdatum</p>
                <p className="font-medium">
                  {quote.plannedStartDate
                    ? format(new Date(quote.plannedStartDate), "d MMMM yyyy", {
                        locale: nl,
                      })
                    : "Nog niet gepland"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Voorwaarden en notities */}
          <div>
            <h3 className="font-semibold mb-3">Voorwaarden & Notities</h3>
            <div className="space-y-4 text-sm">
              <p>
                • Deze offerte is geldig tot{" "}
                {format(
                  new Date(new Date(quote.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000),
                  "d MMMM yyyy",
                  { locale: nl }
                )}
              </p>
              <p>• Alle genoemde bedragen zijn inclusief 21% BTW</p>
              <p>• Betaling binnen 14 dagen na factuurdatum</p>
              {quote.notes && (
                <div className="mt-4">
                  <p className="text-muted-foreground">Aanvullende notities:</p>
                  <p className="mt-1">{quote.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
