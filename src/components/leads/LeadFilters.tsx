
import React from "react";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeadFiltersProps {
  onFilterChange: (type: string, value: string) => void;
  filters: {
    location: string;
    quoteStatus: string;
    invoiceStatus: string;
    leadStatus: string;
  };
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const LeadFilters = ({ onFilterChange, filters, searchTerm, onSearchChange }: LeadFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span>Filters:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Input
          type="search"
          placeholder="Zoek leads..."
          className="h-8 w-[150px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        
        <Input
          type="search"
          placeholder="Filter op locatie..."
          className="h-8 w-[150px]"
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
        />

        <Select value={filters.leadStatus} onValueChange={(value) => onFilterChange("leadStatus", value)}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Lead status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle statussen</SelectItem>
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
            <SelectItem value="all">Alle offertes</SelectItem>
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
            <SelectItem value="all">Alle facturen</SelectItem>
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
