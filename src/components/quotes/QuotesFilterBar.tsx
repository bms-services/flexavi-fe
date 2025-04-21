
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "./DateRangePicker";
import { statusOptions } from "@/pages/Quotes";
import { formatCurrency } from "@/utils/format";

interface QuotesFilterBarProps {
  filters: any;
  onChange: (field: string, value: any) => void;
  totalValue: number;
}

export const QuotesFilterBar: React.FC<QuotesFilterBarProps> = ({
  filters,
  onChange,
  totalValue,
}) => (
  <div className="bg-muted/40 rounded-lg p-3 flex flex-col md:flex-row md:items-end gap-3 mb-4 overflow-x-auto">
    <DateRangePicker
      value={filters.createdRange}
      onChange={(range) => onChange("createdRange", range)}
      label="Aangemaakt datumbereik"
    />
    <DateRangePicker
      value={filters.expireRange}
      onChange={(range) => onChange("expireRange", range)}
      label="Vervaldatum bereik"
    />
    <div className="flex flex-col gap-1 min-w-[140px] w-full md:w-auto">
      <label className="text-xs font-medium text-muted-foreground">Vrije filter</label>
      <Input
        placeholder="Zoek op nummer, klant, of omschrijving"
        value={filters.searchTerm}
        onChange={(e) => onChange("searchTerm", e.target.value)}
      />
    </div>
    <div className="flex flex-col gap-1 min-w-[100px] w-full md:w-auto">
      <label className="text-xs font-medium text-muted-foreground">Status</label>
      <Select
        value={filters.status}
        onValueChange={(value) => onChange("status", value)}
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
    <div className="min-w-[200px] bg-white/80 rounded px-3 py-2 flex flex-col justify-end">
      <span className="text-xs font-medium text-muted-foreground mb-1">Totale waarde (filter):</span>
      <span className="text-base font-bold">{formatCurrency(totalValue)}</span>
    </div>
  </div>
);
