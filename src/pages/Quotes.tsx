
import React from "react";
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
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockQuotes, mockLeads } from "@/data/mockData";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const Quotes = () => {
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "outline" | "secondary" | "destructive" | "success" | "warning" }> = {
      draft: { label: "Concept", variant: "outline" },
      sent: { label: "Verzonden", variant: "default" },
      accepted: { label: "Geaccepteerd", variant: "success" },
      rejected: { label: "Afgewezen", variant: "destructive" },
      revised: { label: "Herzien", variant: "warning" },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Offertes</h1>
            <p className="text-muted-foreground">
              Beheer al je offertes op één plek.
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
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
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
                {mockQuotes.map((quote) => (
                  <TableRow key={quote.id}>
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
                    <TableCell>{getStatusBadge(quote.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Quotes;
