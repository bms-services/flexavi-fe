
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";
import { Quote } from "@/types";
import { formatCurrency } from "@/utils/format";

interface QuotesTableProps {
  quotes: Quote[];
  onView: (quote: Quote) => void;
  onEdit: (quote: Quote) => void;
  onDelete: (quote: Quote) => void;
  getLeadName: (leadId: string) => string;
}

export const QuotesTable: React.FC<QuotesTableProps> = ({
  quotes,
  onView,
  onEdit,
  onDelete,
  getLeadName,
}) => (
  <div className="overflow-x-auto rounded">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Acties</TableHead>
          <TableHead>Nummer</TableHead>
          <TableHead>Klant</TableHead>
          <TableHead>Datum</TableHead>
          <TableHead>Bedrag</TableHead>
          <TableHead className="hidden md:table-cell">Omschrijving</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
              Geen offertes gevonden.
            </TableCell>
          </TableRow>
        ) : (
          quotes.map((quote) => {
            const statusConfig = useQuoteStatusBadge(quote.status);
            return (
              <TableRow key={quote.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(quote)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(quote)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(quote)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {quote.id.replace("quote-", "OF-")}
                </TableCell>
                <TableCell>{getLeadName(quote.leadId)}</TableCell>
                <TableCell>
                  {format(new Date(quote.createdAt), "dd-MM-yyyy", { locale: nl })}
                </TableCell>
                <TableCell>{formatCurrency(quote.amount)}</TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">{quote.description}</TableCell>
                <TableCell>
                  {statusConfig && (
                    <Badge variant={statusConfig.variant}>
                      {statusConfig.label}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  </div>
);
