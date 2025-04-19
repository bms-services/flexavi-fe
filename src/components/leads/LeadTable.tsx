import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CircleSlash, TrendingUp, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { QuoteStatusBadge } from "./badges/QuoteStatusBadge";
import { InvoiceStatusBadge } from "./badges/InvoiceStatusBadge";
import { Lead, Quote, Invoice } from "@/types";
import { mockQuotes } from "@/data/mockQuotes";
import { mockInvoices } from "@/data/mockInvoices";
import { LeadFilters } from "./LeadFilters";

interface LeadTableProps {
  leads: Lead[];
  searchTerm: string;
}

interface LeadStats {
  quotesValue: number;
  invoicesValue: number;
  latestQuoteStatus?: Quote['status'];
  latestInvoiceStatus?: Invoice['status'];
}

const ITEMS_PER_PAGE = 10;

export const LeadTable: React.FC<LeadTableProps> = ({ leads, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    quoteStatus: "",
    invoiceStatus: "",
    leadStatus: "",
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const getLeadStats = (leadId: string): LeadStats => {
    const leadQuotes = mockQuotes.filter(quote => quote.leadId === leadId);
    const leadInvoices = mockInvoices.filter(invoice => invoice.leadId === leadId);

    const latestQuote = leadQuotes.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];

    const latestInvoice = leadInvoices.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];

    return {
      quotesValue: leadQuotes.reduce((sum, quote) => sum + quote.amount, 0),
      invoicesValue: leadInvoices.reduce((sum, invoice) => sum + invoice.amount, 0),
      latestQuoteStatus: latestQuote?.status,
      latestInvoiceStatus: latestInvoice?.status,
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase());

    const stats = getLeadStats(lead.id);
    const matchesLocation = !filters.location || lead.address.toLowerCase().includes(filters.location.toLowerCase());
    const matchesLeadStatus = !filters.leadStatus || lead.status === filters.leadStatus;
    const matchesQuoteStatus = !filters.quoteStatus || stats.latestQuoteStatus === filters.quoteStatus;
    const matchesInvoiceStatus = !filters.invoiceStatus || stats.latestInvoiceStatus === filters.invoiceStatus;

    return matchesSearch && matchesLocation && matchesLeadStatus && matchesQuoteStatus && matchesInvoiceStatus;
  });

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <LeadFilters onFilterChange={handleFilterChange} filters={filters} />
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-8">Naam</TableHead>
              <TableHead className="h-8 hidden md:table-cell">Email</TableHead>
              <TableHead className="h-8 hidden lg:table-cell">Telefoon</TableHead>
              <TableHead className="h-8">Status</TableHead>
              <TableHead className="h-8">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Waarde</span>
                </div>
              </TableHead>
              <TableHead className="h-8">
                <div className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Status</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                    <CircleSlash className="h-8 w-8 text-gray-400" />
                    <p>Geen leads gevonden</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedLeads.map((lead) => {
                const stats = getLeadStats(lead.id);
                return (
                  <TableRow key={lead.id} className="h-auto">
                    <TableCell className="py-1.5">
                      <Link
                        to={`/leads/${lead.id}`}
                        className="font-medium text-sm text-primary hover:underline"
                      >
                        {lead.name}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell py-1.5 text-sm">
                      {lead.email}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell py-1.5 text-sm">
                      {lead.phone}
                    </TableCell>
                    <TableCell className="py-1.5">
                      {lead.status ? (
                        <LeadStatusBadge status={lead.status} />
                      ) : (
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <CircleSlash className="h-4 w-4" />
                          <span className="text-xs">Geen status</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-1.5">
                      <div className="space-y-0.5">
                        <div className="text-xs text-muted-foreground">Offertes</div>
                        <div className="font-medium text-sm">{formatCurrency(stats.quotesValue)}</div>
                        <div className="text-xs text-muted-foreground">Facturen</div>
                        <div className="font-medium text-sm">{formatCurrency(stats.invoicesValue)}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-1.5">
                      <div className="space-y-0.5">
                        <div className="text-xs text-muted-foreground">Offerte</div>
                        {stats.latestQuoteStatus ? (
                          <QuoteStatusBadge status={stats.latestQuoteStatus} />
                        ) : (
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <CircleSlash className="h-4 w-4" />
                            <span className="text-xs">Geen offerte</span>
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">Factuur</div>
                        {stats.latestInvoiceStatus ? (
                          <InvoiceStatusBadge status={stats.latestInvoiceStatus} />
                        ) : (
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <CircleSlash className="h-4 w-4" />
                            <span className="text-xs">Geen factuur</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
