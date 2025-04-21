
import { useState, useMemo } from "react";
import { Invoice } from "@/types";
import { mockInvoices } from "@/data/mockData";
import { mockLeads } from "@/data/mockLeads";

interface FilterState {
  createdRange: [Date | undefined, Date | undefined];
  expireRange: [Date | undefined, Date | undefined];
  searchTerm: string;
  status: string;
}

export const useInvoiceFilters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterState>({
    createdRange: [undefined, undefined],
    expireRange: [undefined, undefined],
    searchTerm: "",
    status: "all",
  });

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

  const handleChangeFilter = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (currentPage !== 1) setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  return {
    filters,
    currentPage,
    itemsPerPage,
    totalPages,
    filteredInvoices,
    pageInvoices,
    getLeadName,
    setCurrentPage,
    setItemsPerPage,
    handleChangeFilter,
  };
};
