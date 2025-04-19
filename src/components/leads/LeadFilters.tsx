
import React from "react";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lead } from "@/types";

interface LeadFiltersProps {
  onFilterChange: (type: string, value: string) => void;
  filters: {
    location: string;
    quoteStatus: string;
    invoiceStatus: string;
    leadStatus: string;
  };
}

export const LeadFilters = ({ onFilterChange, filters }: LeadFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span>Filters:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={filters.location} onValueChange={(value) => onFilterChange("location", value)}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Locatie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Alle locaties</SelectItem>
            <SelectItem value="amsterdam">Amsterdam</SelectItem>
            <SelectItem value="rotterdam">Rotterdam</SelectItem>
            <SelectItem value="den-haag">Den Haag</SelectItem>
            <SelectItem value="utrecht">Utrecht</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.leadStatus} onValueChange={(value) => onFilterChange("leadStatus", value)}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Lead status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Alle statussen</SelectItem>
            <SelectItem value="new">Nieuw</SelectItem>
            <SelectItem value="in-progress">In behandeling</SelectItem>
            <SelectItem value="completed">Afgerond</SelectItem>
            <SelectItem value="cancelled">Geannuleerd</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.quoteStatus} onValueChange={(value) => onFilterChange("quoteStatus", value)}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Offerte status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Alle offertes</SelectItem>
            <SelectItem value="draft">Concept</SelectItem>
            <SelectItem value="sent">Verstuurd</SelectItem>
            <SelectItem value="accepted">Geaccepteerd</SelectItem>
            <SelectItem value="rejected">Afgewezen</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.invoiceStatus} onValueChange={(value) => onFilterChange("invoiceStatus", value)}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Factuur status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Alle facturen</SelectItem>
            <SelectItem value="draft">Concept</SelectItem>
            <SelectItem value="sent">Verstuurd</SelectItem>
            <SelectItem value="paid">Betaald</SelectItem>
            <SelectItem value="overdue">Te laat</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
