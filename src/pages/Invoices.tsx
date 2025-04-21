import React, { useState, useMemo } from "react";
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
import { Eye, PlusCircle, Search, Edit2, Trash2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockInvoices } from "@/data/mockData";
import { mockLeads } from "@/data/mockLeads";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Invoice } from "@/types";
import { useInvoiceStatusBadge } from "@/hooks/useStatusBadge";
import { useNavigate } from "react-router-dom";
import { QuotesFilterBar } from "@/components/quotes/QuotesFilterBar";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/utils/format";

export const statusOptions = [
  { value: "draft", label: "Concept" },
  { value: "sent", label: "Verzonden" },
  { value: "paid", label: "Betaald" },
  { value: "overdue", label: "Te laat" },
  { value: "canceled", label: "Geannuleerd" },
  { value: "collection", label: "Incasso" },
  { value: "legal", label: "Juridisch" },
];

const itemsPerPageOptions = [10, 25, 100];

const Invoices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    createdRange: [undefined, undefined] as [Date | undefined, Date | undefined],
    expireRange: [undefined, undefined] as [Date | undefined, Date | undefined],
    searchTerm: "",
    status: "",
  });
  const navigate = useNavigate();

  const getLeadName = (leadId: string) => {
    const lead = mockLeads.find((l) => l.id === leadId);
    return lead ? lead.name : "Onbekend";
  };

  const filteredInvoices = useMemo(() => {
    return mockInvoices.filter((invoice) => {
      const createdAt = new Date(invoice.createdAt);
      const [createdFrom, createdTo] = filters.createdRange;
      if (createdFrom && createdAt < createdFrom) return false;
      if (createdTo && createdAt > createdTo) return false;

      const [expireFrom, expireTo] = filters.expireRange;
      if (expireFrom || expireTo) {
        const dueDate = new Date(invoice.dueDate);
        if (expireFrom && dueDate < expireFrom) return false;
        if (expireTo && dueDate > expireTo) return false;
      }

      if (filters.status && filters.status !== "all" && invoice.status !== filters.status) return false;

      if (filters.searchTerm) {
        const lower = filters.searchTerm.toLowerCase();
        if (
          !invoice.description.toLowerCase().includes(lower) &&
          !getLeadName(invoice.leadId).toLowerCase().includes(lower) &&
          !invoice.id.toLowerCase().includes(lower)
        )
          return false;
      }
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  const handleChangeFilter = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (currentPage !== 1) setCurrentPage(1);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    navigate(`/portal/invoice/${invoice.id}`);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    navigate(`/invoices/edit/${invoice.id}`);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    console.log("Delete invoice:", invoice);
  };

  const handleCreateNewInvoice = () => {
    navigate('/invoices/create');
  };

  const handleViewCustomerDashboard = (leadId: string) => {
    navigate(`/portal/dashboard/${leadId}`);
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
          <Button onClick={handleCreateNewInvoice}>
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
                  value={filters.searchTerm}
                  onChange={(e) => handleChangeFilter("searchTerm", e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <QuotesFilterBar
              filters={filters}
              onChange={handleChangeFilter}
              totalValue={filteredInvoices.reduce((sum, q) => sum + q.amount, 0)}
            />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 px-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Facturen per pagina:</span>
                <Select value={itemsPerPage.toString()} onValueChange={val => { setItemsPerPage(Number(val)); setCurrentPage(1); }}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    {itemsPerPageOptions.map(opt => (
                      <SelectItem key={opt} value={opt.toString()}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                  <span className="sr-only">Vorige</span>
                  <svg width="20" height="20" viewBox="0 0 20 20"><path d="M13 16l-4-4 4-4" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                </Button>
                <span className="text-xs mx-2">{currentPage} / {totalPages}</span>
                <Button size="icon" variant="ghost" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                  <span className="sr-only">Volgende</span>
                  <svg width="20" height="20" viewBox="0 0 20 20"><path d="M7 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                </Button>
              </div>
            </div>
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
                {pageInvoices.map((invoice) => {
                  const statusConfig = useInvoiceStatusBadge(invoice.status);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewInvoice(invoice)}
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
