
import React, { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockInvoices } from "@/data/mockData";
import { mockLeads } from "@/data/mockLeads";
import { QuotesFilterBar } from "@/components/quotes/QuotesFilterBar";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/utils/format";
import { Invoice } from "@/types";
import { useToast } from "@/hooks/use-toast";

import { InvoicesHeader } from "@/components/invoices/InvoicesHeader";
import { InvoicesTable } from "@/components/invoices/InvoicesTable";
import { InvoicesPagination } from "@/components/invoices/InvoicesPagination";
import { CreditInvoiceDialog } from "@/components/invoices/CreditInvoiceDialog";

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
  const [creditDialogOpen, setCreditDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();
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

  const handleCreditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setCreditDialogOpen(true);
  };

  const createCreditInvoice = () => {
    if (!selectedInvoice) return;
    toast({
      title: "Creditfactuur aangemaakt",
      description: `Creditfactuur voor ${selectedInvoice.id.replace("inv-", "FACT-")} is aangemaakt.`,
    });
    setCreditDialogOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <InvoicesHeader onCreateNewInvoice={handleCreateNewInvoice} />
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
              <InvoicesPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <InvoicesTable
              invoices={pageInvoices}
              getLeadName={getLeadName}
              onView={handleViewInvoice}
              onEdit={handleEditInvoice}
              onDelete={handleDeleteInvoice}
              onCredit={handleCreditInvoice}
            />
          </CardContent>
        </Card>
      </div>
      <CreditInvoiceDialog
        open={creditDialogOpen}
        onOpenChange={setCreditDialogOpen}
        selectedInvoice={selectedInvoice}
        onCredit={createCreditInvoice}
      />
    </Layout>
  );
};

export default Invoices;
