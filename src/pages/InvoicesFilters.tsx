
import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { InvoicesPagination } from "@/components/invoices/InvoicesPagination";

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
}) => (
  <>
    {/* Filter Bar - Existing QuotesFilterBar is used here */}
    {/* It can be reused or replaced with a dedicated InvoicesFilterBar component if needed */}
    <div className="mb-4">
      {/* Placeholder for any additional filter UI if needed */}
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

