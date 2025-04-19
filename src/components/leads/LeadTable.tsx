
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, FileText } from "lucide-react";
import { Lead } from "@/types";
import { LeadFilters } from "./LeadFilters";
import { LeadTableContent } from "./LeadTableContent";
import { LeadTablePagination } from "./LeadTablePagination";
import { getLeadStats, formatCurrency } from "@/utils/leadStats";

interface LeadTableProps {
  leads: Lead[];
  searchTerm: string;
}

const ITEMS_PER_PAGE = 10;

export const LeadTable: React.FC<LeadTableProps> = ({ leads, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    quoteStatus: "all",
    invoiceStatus: "all",
    leadStatus: "all",
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase());

    const stats = getLeadStats(lead.id);
    const matchesLocation = !filters.location || lead.address.toLowerCase().includes(filters.location.toLowerCase());
    const matchesLeadStatus = filters.leadStatus === "all" || lead.status === filters.leadStatus;
    const matchesQuoteStatus = filters.quoteStatus === "all" || stats.latestQuoteStatus === filters.quoteStatus;
    const matchesInvoiceStatus = filters.invoiceStatus === "all" || stats.latestInvoiceStatus === filters.invoiceStatus;

    return matchesSearch && matchesLocation && matchesLeadStatus && matchesQuoteStatus && matchesInvoiceStatus;
  });

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <LeadFilters 
        onFilterChange={handleFilterChange} 
        filters={filters}
        searchTerm={searchTerm}
        onSearchChange={() => {}} // This is handled by the parent component
      />
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-8">Naam</TableHead>
              <TableHead className="h-8 hidden md:table-cell">Email</TableHead>
              <TableHead className="h-8 hidden lg:table-cell">Telefoon</TableHead>
              <TableHead className="h-8 hidden md:table-cell">Adres</TableHead>
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
            <LeadTableContent 
              leads={paginatedLeads} 
              getLeadStats={getLeadStats}
              formatCurrency={formatCurrency}
            />
          </TableBody>
        </Table>
      </div>

      <LeadTablePagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
