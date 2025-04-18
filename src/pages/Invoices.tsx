
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
import { mockInvoices, mockLeads } from "@/data/mockData";
import { format, isPast, parseISO } from "date-fns";
import { nl } from "date-fns/locale";

const Invoices = () => {
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

  const getStatusBadge = (status: string, dueDate: string) => {
    // If invoice is sent and past due date, mark as overdue
    if (status === "sent" && isPast(parseISO(dueDate))) {
      status = "overdue";
    }

    const statusConfig: Record<string, { label: string; variant: "default" | "outline" | "secondary" | "destructive" | "success" | "warning" }> = {
      draft: { label: "Concept", variant: "outline" },
      sent: { label: "Verzonden", variant: "default" },
      paid: { label: "Betaald", variant: "success" },
      overdue: { label: "Te laat", variant: "destructive" },
      canceled: { label: "Geannuleerd", variant: "secondary" },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Facturen</h1>
            <p className="text-muted-foreground">
              Beheer al je facturen op één plek.
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nieuwe Factuur
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Factuuroverzicht</CardTitle>
                <CardDescription>
                  Een lijst van alle facturen
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-auto sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Zoek facturen..."
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
                  <TableHead>Uitgiftedatum</TableHead>
                  <TableHead>Vervaldatum</TableHead>
                  <TableHead>Bedrag</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.id.replace("inv-", "FACT-")}
                    </TableCell>
                    <TableCell>{getLeadName(invoice.leadId)}</TableCell>
                    <TableCell>
                      {format(new Date(invoice.createdAt), "dd-MM-yyyy", {
                        locale: nl,
                      })}
                    </TableCell>
                    <TableCell>
                      {format(new Date(invoice.dueDate), "dd-MM-yyyy", {
                        locale: nl,
                      })}
                    </TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>
                      {getStatusBadge(invoice.status, invoice.dueDate)}
                    </TableCell>
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

export default Invoices;
