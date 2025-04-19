
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
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  // Add null check for lineItems
  const lineItems = quote.lineItems || [];
  const subtotal = lineItems.reduce((acc, item) => acc + item.total, 0);
  const vat = subtotal * 0.21;
  const total = subtotal + vat;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Offerte Details</DialogTitle>
          <DialogDescription>
            Volledige informatie over offerte {quote.id.replace("quote-", "OF-")}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="space-y-6 px-6 pb-6">
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

            {/* Werk specificatie */}
            <div>
              <h3 className="font-semibold mb-3">Werk Specificatie</h3>
              <div className="rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40%]">Omschrijving</TableHead>
                        <TableHead className="text-right">Aantal</TableHead>
                        <TableHead className="text-right">Eenheid</TableHead>
                        <TableHead className="text-right">Prijs per eenheid</TableHead>
                        <TableHead className="text-right">Totaal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="align-top">{item.description}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{item.unit}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.pricePerUnit)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-medium">
                          Subtotaal
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(subtotal)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-medium">
                          BTW (21%)
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(vat)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-bold">
                          Totaalbedrag
                        </TableCell>
                        <TableCell className="text-right font-bold text-lg">
                          {formatCurrency(total)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
