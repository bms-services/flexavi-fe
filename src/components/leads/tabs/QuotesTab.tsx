import React, { useState } from "react";
import { Quote } from "@/types";
import { Button } from "@/components/ui/button";
import { LeadTablePagination } from "@/components/leads/LeadTablePagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileText } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface QuotesTabProps {
  quotes: Quote[];
  leadId: string;
}

const getStatusBadge = (status: Quote["status"]) => {
  const statusConfig = {
    draft: { label: "Concept", variant: "outline" as const },
    sent: { label: "Verzonden", variant: "default" as const },
    accepted: { label: "Geaccepteerd", variant: "success" as const },
    rejected: { label: "Afgewezen", variant: "destructive" as const },
    revised: { label: "Herzien", variant: "warning" as const },
  };

  const config = statusConfig[status] || statusConfig.draft;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export const QuotesTab: React.FC<QuotesTabProps> = ({ quotes, leadId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(quotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuotes = quotes
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuwe Offerte
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Offertes</CardTitle>
              <CardDescription>
                Alle offertes voor deze lead
              </CardDescription>
            </div>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          {quotes.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nog geen offertes voor deze lead.
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nummer</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Bedrag</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Beschrijving
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell>
                        <span className="font-medium text-primary">
                          {quote.id.replace("quote-", "OF-")}
                        </span>
                      </TableCell>
                      <TableCell>
                        {format(new Date(quote.createdAt), "d MMMM yyyy", {
                          locale: nl,
                        })}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(quote.amount)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {quote.description}
                      </TableCell>
                      <TableCell>{getStatusBadge(quote.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <LeadTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
