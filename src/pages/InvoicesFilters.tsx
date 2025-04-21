
import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { InvoicesPagination } from "@/components/invoices/InvoicesPagination";
import { DateRangePicker } from "@/components/quotes/DateRangePicker";
import { Button } from "@/components/ui/button";
import { Filter, FileText, File } from "lucide-react";  // replaced FilePdf with File
import { statusOptions } from "./InvoicesMain";
import { exportInvoicesCSV, exportInvoicesPDF } from "@/utils/exportInvoices";
import { Invoice } from "@/types";

interface InvoicesFiltersProps {
  filters: any;
  onChange: (field: string, value: any) => void;
  totalValue: number;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  itemsPerPageOptions: number[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filteredInvoices?: Invoice[]; // nodig voor export
}

export const InvoicesFilters: React.FC<InvoicesFiltersProps> = ({
  filters,
  onChange,
  totalValue,
  itemsPerPage,
  setItemsPerPage,
  itemsPerPageOptions,
  currentPage,
  totalPages,
  setCurrentPage,
  filteredInvoices = [],
}) => (
  <>
    {/* Filters */}
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <span className="font-medium text-muted-foreground flex items-center gap-1">
        <Filter size={16} /> Filters:
      </span>
      <Select
        value={filters.status || ""}
        onValueChange={(val) => onChange("status", val)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Alle statussen" />
        </SelectTrigger>
        <SelectContent className="z-50">
          <SelectItem value="">Alle statussen</SelectItem>
          {statusOptions.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DateRangePicker
        label="Aangemaakt"
        value={filters.createdRange}
        onChange={val => onChange("createdRange", val)}
      />
      <DateRangePicker
        label="Vervaldatum"
        value={filters.expireRange}
        onChange={val => onChange("expireRange", val)}
      />
      <Button
        variant="outline"
        size="sm"
        className="ml-2"
        onClick={() => exportInvoicesCSV(filteredInvoices)}
        title="Exporteer naar CSV"
      >
        <FileText className="mr-1 w-4 h-4" /> CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => exportInvoicesPDF(filteredInvoices)}
        title="Exporteer naar PDF"
      >
        <File className="mr-1 w-4 h-4" /> PDF
      </Button>
    </div>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 px-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Facturen per pagina:</span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(val) => {
            setItemsPerPage(Number(val));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="z-50">
            {itemsPerPageOptions.map((opt) => (
              <SelectItem key={opt} value={opt.toString()}>
                {opt}
              </SelectItem>
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
  </>
);

