
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
import { mockInvoices, mockLeads } from "@/data/mockData";
import { format, isPast, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Invoice } from "@/types";
import { useInvoiceStatusBadge } from "@/hooks/useStatusBadge";

const Invoices = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
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

  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getLeadName(invoice.leadId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditInvoice = (invoice: Invoice) => {
    // Will be implemented in the next step
    console.log("Edit invoice:", invoice);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    // Will be implemented in the next step
    console.log("Delete invoice:", invoice);
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Facturen</h1>
            <p className="text-muted-foreground">
              Beheer al je facturen op één plek
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
                  <TableHead>Vervaldatum</TableHead>
                  <TableHead>Bedrag</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const statusConfig = useInvoiceStatusBadge(invoice.status);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditInvoice(invoice)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteInvoice(invoice)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
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
                        {statusConfig && (
                          <Badge variant={statusConfig.variant}>
                            {statusConfig.label}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Invoices;
