import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { Eye, PlusCircle, Search, Edit2, Trash2, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockQuotes, mockLeads } from "@/data/mockData";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { QuoteDetailsDialog } from "@/components/leads/dialogs/QuoteDetailsDialog";
import { Quote, QuoteStatus } from "@/types";
import { useQuoteStatusBadge } from "@/hooks/useStatusBadge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// Helper: Formatteer valuta
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(amount);
};

// Helper: Klantnaam ophalen
const getLeadName = (leadId: string) => {
  const lead = mockLeads.find((l) => l.id === leadId);
  return lead ? lead.name : "Onbekend";
};

const statusOptions: { value: QuoteStatus, label: string }[] = [
  { value: "draft", label: "Concept" },
  { value: "sent", label: "Verzonden" },
  { value: "accepted", label: "Geaccepteerd" },
  { value: "rejected", label: "Afgewezen" },
  { value: "revised", label: "Herzien" },
];

const itemsPerPageOptions = [10, 25, 100];

const Quotes = () => {
  // Paginering
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter state (gecombineerde datumbereiken)
  const [filters, setFilters] = useState({
    createdRange: [undefined, undefined] as [Date | undefined, Date | undefined],
    expireRange: [undefined, undefined] as [Date | undefined, Date | undefined],
    quoteNumber: "",
    klant: "",
    minBedrag: "",
    maxBedrag: "",
    status: "",
    searchTerm: "",
  });

  const navigate = useNavigate();

  // Filter
  const filteredQuotes = useMemo(() => {
    return mockQuotes.filter((quote) => {
      // Aangemaakt datum range filter
      const createdAt = new Date(quote.createdAt);
      const [createdFrom, createdTo] = filters.createdRange;
      if (createdFrom && createdAt < createdFrom) return false;
      if (createdTo && createdAt > createdTo) return false;

      // Expiratiedatum range filter (plannedStartDate)
      const [expireFrom, expireTo] = filters.expireRange;
      if (expireFrom || expireTo) {
        const hasPlanned = !!quote.plannedStartDate;
        if (expireFrom && (!hasPlanned || new Date(quote.plannedStartDate!) < expireFrom)) return false;
        if (expireTo && (!hasPlanned || new Date(quote.plannedStartDate!) > expireTo)) return false;
      }

      // Quote nummer zoeken (vrij veld)
      if (filters.quoteNumber && !quote.id.replace("quote-", "OF-").toLowerCase().includes(filters.quoteNumber.toLowerCase())) return false;

      // Klant
      if (filters.klant && !getLeadName(quote.leadId).toLowerCase().includes(filters.klant.toLowerCase())) return false;

      // Min/max bedrag
      if (filters.minBedrag && quote.amount < Number(filters.minBedrag)) return false;
      if (filters.maxBedrag && quote.amount > Number(filters.maxBedrag)) return false;

      // Status
      if (filters.status && filters.status !== "all" && quote.status !== filters.status) return false;

      // Losse zoekterm (op description, klant, nummer)
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

  // Paginering berekenen
  const totalPages = Math.max(1, Math.ceil(filteredQuotes.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageQuotes = filteredQuotes.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handleChangeFilter = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (currentPage !== 1) setCurrentPage(1); // reset naar eerste pagina bij filteren
  };

  const handleCreateQuote = () => navigate("/quotes/create");
  const handleViewQuote = (quote: Quote) => navigate(`/portal/quote/${quote.id}`);
  const handleEditQuote = (quote: Quote) => navigate(`/quotes/edit/${quote.id}`);
  const handleDeleteQuote = (quote: Quote) => console.log("Delete quote:", quote);

  // Eigen datumrange picker component (simple, binnen Quotes zelf)
  function DateRangeFilter({
    value,
    onChange,
    label,
  }: {
    value: [Date | undefined, Date | undefined];
    onChange: (range: [Date | undefined, Date | undefined]) => void;
    label: string;
  }) {
    return (
      <div className="flex flex-col gap-1 min-w-[220px] w-full md:w-auto">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start w-full md:w-[110px]">
                {value[0] ? format(value[0], "dd-MM-yyyy") : <span>Vanaf</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                mode="single"
                selected={value[0]}
                onSelect={(date) => onChange([date, value[1]])}
                className="p-3 pointer-events-auto"
                initialFocus
                disabled={(date) => value[1] ? date > value[1] : false}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start w-full md:w-[110px]">
                {value[1] ? format(value[1], "dd-MM-yyyy") : <span>Tot</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                mode="single"
                selected={value[1]}
                onSelect={(date) => onChange([value[0], date])}
                className="p-3 pointer-events-auto"
                initialFocus
                disabled={(date) => value[0] ? date < value[0] : false}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container max-w-full px-2 sm:px-4 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Offertes</h1>
            <p className="text-muted-foreground">Beheer al je offertes op één plek</p>
          </div>
          <Button onClick={handleCreateQuote}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nieuwe Offerte
          </Button>
        </div>

        {/* Filters */}
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
            {/* Filterbalk, vernieuwd */}
            <div className="bg-muted/40 rounded-lg p-3 flex flex-col md:flex-row md:items-end gap-3 mb-4 overflow-x-auto">
              {/* Aangemaakt datum-bereik */}
              <DateRangeFilter
                value={filters.createdRange}
                onChange={(range) => handleChangeFilter("createdRange", range)}
                label="Aangemaakt van/tot"
              />
              {/* Vervaldatum datum-bereik */}
              <DateRangeFilter
                value={filters.expireRange}
                onChange={(range) => handleChangeFilter("expireRange", range)}
                label="Vervaldatum van/tot"
              />
              {/* Offertenummer, nu vrij tekstveld */}
              <div className="flex flex-col gap-1 min-w-[140px] w-full md:w-auto">
                <label className="text-xs font-medium text-muted-foreground">Offertenummer</label>
                <Input
                  placeholder="Zoek op nummer"
                  value={filters.quoteNumber}
                  onChange={(e) => handleChangeFilter("quoteNumber", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 min-w-[120px] w-full md:w-auto">
                <label className="text-xs font-medium text-muted-foreground">Klant</label>
                <Input
                  placeholder="Klantnaam"
                  value={filters.klant}
                  onChange={(e) => handleChangeFilter("klant", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 min-w-[90px] w-full md:w-auto">
                <label className="text-xs font-medium text-muted-foreground">Min. bedrag</label>
                <Input
                  type="number"
                  placeholder="Min"
                  min={0}
                  value={filters.minBedrag}
                  onChange={(e) => handleChangeFilter("minBedrag", e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-[90px] w-full md:w-auto">
                <label className="text-xs font-medium text-muted-foreground">Max. bedrag</label>
                <Input
                  type="number"
                  placeholder="Max"
                  min={0}
                  value={filters.maxBedrag}
                  onChange={(e) => handleChangeFilter("maxBedrag", e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-[100px] w-full md:w-auto">
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleChangeFilter("status", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status..." />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="all">Alle</SelectItem>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Items-per-page en paginering */}
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
            {/* Tabel */}
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
                  {pageQuotes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                        Geen offertes gevonden.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pageQuotes.map((quote) => {
                      const statusConfig = useQuoteStatusBadge(quote.status);
                      return (
                        <TableRow key={quote.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewQuote(quote)}
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Quotes;
