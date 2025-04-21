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
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ 
  leads, 
  searchTerm,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange = () => {} 
}) => {
  const [filters, setFilters] = useState({
    location: "",
    quoteStatus: "all",
    invoiceStatus: "all",
    leadStatus: "all",
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    onPageChange(1); // Reset to first page when filters change
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

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <LeadFilters 
        onFilterChange={handleFilterChange} 
        filters={filters}
        searchTerm={searchTerm}
        onSearchChange={() => {}}
      />
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="hidden sm:table-header-group">
            <TableRow>
              <TableHead>Naam</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefoon</TableHead>
              <TableHead>Adres</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Waarde</span>
                </div>
              </TableHead>
              <TableHead>
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
        setCurrentPage={onPageChange}
      />
    </div>
  );
};
