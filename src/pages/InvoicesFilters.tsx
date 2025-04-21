
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { InvoicesPagination } from "@/components/invoices/InvoicesPagination";
import { DateRangePicker } from "@/components/quotes/DateRangePicker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, FileText, File, Download } from "lucide-react";
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
    {/* Filters, netter uitgelijnd */}
    <div className="mb-3 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
      <div className="flex items-center gap-2 mb-1 md:mb-0">
        <span className="font-medium text-muted-foreground flex items-center gap-1">
          <Filter size={16} /> Filters:
        </span>
        <Select
          value={filters.status || "all"}
          onValueChange={(val) => onChange("status", val)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Alle statussen" />
          </SelectTrigger>
          <SelectContent className="z-50">
            <SelectItem value="all">Alle statussen</SelectItem>
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <DateRangePicker
          label="Aangemaakt"
          value={filters.createdRange}
          onChange={(val) => onChange("createdRange", val)}
        />
        <DateRangePicker
          label="Vervaldatum"
          value={filters.expireRange}
          onChange={(val) => onChange("expireRange", val)}
        />
        {/* Exporteren dropdown! */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              title="Facturen exporteren"
            >
              <Download className="mr-1 w-4 h-4" /> Exporteren
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40 z-50">
            <DropdownMenuItem
              onClick={() => exportInvoicesCSV(filteredInvoices)}
              className="cursor-pointer"
            >
              <FileText className="mr-2 w-4 h-4" /> CSV
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => exportInvoicesPDF(filteredInvoices)}
              className="cursor-pointer"
            >
              <File className="mr-2 w-4 h-4" /> PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 px-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Facturen per pagina:
        </span>
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
