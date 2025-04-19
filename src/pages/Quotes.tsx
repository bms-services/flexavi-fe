
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
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
import { Button } from "@/components/ui/button";
import { Eye, PlusCircle, Search, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockQuotes, mockLeads } from "@/data/mockData";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { QuoteDetailsDialog } from "@/components/leads/dialogs/QuoteDetailsDialog";
import { Quote } from "@/types";
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";

const Quotes = () => {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getLeadName = (leadId: string) => {
    const lead = mockLeads.find((l) => l.id === leadId);
    return lead ? lead.name : "Onbekend";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const filteredQuotes = mockQuotes.filter(
    (quote) =>
      quote.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getLeadName(quote.leadId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditQuote = (quote: Quote) => {
    // Will be implemented in the next step
    console.log("Edit quote:", quote);
  };

  const handleDeleteQuote = (quote: Quote) => {
    // Will be implemented in the next step
    console.log("Delete quote:", quote);
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Offertes</h1>
            <p className="text-muted-foreground">
              Beheer al je offertes op één plek
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nieuwe Offerte
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Offerteoverzicht</CardTitle>
                <CardDescription>
                  Een lijst van alle offertes
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-auto sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Zoek offertes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Acties</TableHead>
                  <TableHead>Nummer</TableHead>
                  <TableHead>Klant</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Bedrag</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Omschrijving
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => {
                  const statusConfig = useQuoteStatusBadge(quote.status);
                  return (
                    <TableRow key={quote.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedQuote(quote)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditQuote(quote)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteQuote(quote)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {quote.id.replace("quote-", "OF-")}
                      </TableCell>
                      <TableCell>{getLeadName(quote.leadId)}</TableCell>
                      <TableCell>
                        {format(new Date(quote.createdAt), "dd-MM-yyyy", {
                          locale: nl,
                        })}
                      </TableCell>
                      <TableCell>{formatCurrency(quote.amount)}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {quote.description}
                      </TableCell>
                      <TableCell>
                        {statusConfig && (
                          <Badge variant={statusConfig.variant}>
                            {statusConfig.label}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {selectedQuote && (
        <QuoteDetailsDialog
          quote={selectedQuote}
          open={Boolean(selectedQuote)}
          onOpenChange={(open) => !open && setSelectedQuote(null)}
        />
      )}
    </Layout>
  );
};

export default Quotes;
