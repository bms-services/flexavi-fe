
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockQuotes, mockLeads } from "@/data/mockData";
import { Quote, QuoteStatus } from "@/types";
import { QuotesFilterBar } from "@/components/quotes/QuotesFilterBar";
import { QuotesTable } from "@/components/quotes/QuotesTable";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const getLeadName = (leadId: string) => {
  const lead = mockLeads.find((l) => l.id === leadId);
  return lead ? lead.name : "Onbekend";
};

export const statusOptions: { value: QuoteStatus; label: string }[] = [
  { value: "draft", label: "Concept" },
  { value: "sent", label: "Verzonden" },
  { value: "accepted", label: "Geaccepteerd" },
  { value: "rejected", label: "Afgewezen" },
  { value: "revised", label: "Herzien" },
];

const itemsPerPageOptions = [10, 25, 100];

const Quotes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    createdRange: [undefined, undefined] as [Date | undefined, Date | undefined],
    expireRange: [undefined, undefined] as [Date | undefined, Date | undefined],
    searchTerm: "",
    status: "",
  });

  const navigate = useNavigate();

  const filteredQuotes = useMemo(() => {
    return mockQuotes.filter((quote) => {
      const createdAt = new Date(quote.createdAt);
      const [createdFrom, createdTo] = filters.createdRange;
      if (createdFrom && createdAt < createdFrom) return false;
      if (createdTo && createdAt > createdTo) return false;

      const [expireFrom, expireTo] = filters.expireRange;
      if (expireFrom || expireTo) {
        const hasPlanned = !!quote.plannedStartDate;
        if (expireFrom && (!hasPlanned || new Date(quote.plannedStartDate!) < expireFrom)) return false;
        if (expireTo && (!hasPlanned || new Date(quote.plannedStartDate!) > expireTo)) return false;
      }

      if (filters.status && filters.status !== "all" && quote.status !== filters.status) return false;

      if (filters.searchTerm) {
        const lower = filters.searchTerm.toLowerCase();
        if (
          !quote.description.toLowerCase().includes(lower) &&
          !getLeadName(quote.leadId).toLowerCase().includes(lower) &&
          !quote.id.toLowerCase().includes(lower)
        ) return false;
      }
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredQuotes.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageQuotes = filteredQuotes.slice(startIndex, startIndex + itemsPerPage);

  const handleChangeFilter = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (currentPage !== 1) setCurrentPage(1);
  };

  const handleCreateQuote = () => navigate("/quotes/create");
  const handleViewQuote = (quote: Quote) => navigate(`/portal/quote/${quote.id}`);
  const handleEditQuote = (quote: Quote) => navigate(`/quotes/edit/${quote.id}`);
  const handleDeleteQuote = (quote: Quote) => console.log("Delete quote:", quote);

  return (
    <Layout>
      <div className="container max-w-full px-2 sm:px-4 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Offertes</h1>
            <p className="text-muted-foreground">Beheer al je offertes op één plek</p>
          </div>
          <Button onClick={handleCreateQuote}>
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Offerte
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Offerteoverzicht</CardTitle>
                <CardDescription>Een lijst van alle offertes</CardDescription>
              </div>
              <div className="relative w-full sm:w-auto sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Zoek offertes..."
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
              totalValue={filteredQuotes.reduce((sum, q) => sum + q.amount, 0)}
            />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 px-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Offertes per pagina:</span>
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

            <QuotesTable
              quotes={pageQuotes}
              onView={handleViewQuote}
              onEdit={handleEditQuote}
              onDelete={handleDeleteQuote}
              getLeadName={getLeadName}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Quotes;
