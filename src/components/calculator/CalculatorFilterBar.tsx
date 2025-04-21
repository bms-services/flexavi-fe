
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export interface CalculatorFilterValues {
  search: string;
  roofType: string;
  minArea: string;
  maxArea: string;
}

interface CalculatorFilterBarProps {
  filters: CalculatorFilterValues;
  onChange: (key: keyof CalculatorFilterValues, value: string) => void;
  onReset: () => void;
  onSearch: () => void;
}

export const CalculatorFilterBar: React.FC<CalculatorFilterBarProps> = ({
  filters,
  onChange,
  onReset,
  onSearch,
}) => (
  <div className="bg-muted/50 rounded-lg flex flex-col md:flex-row justify-between items-center gap-3 p-3 mb-4">
    <div className="flex-1 flex flex-col sm:flex-row gap-2 w-full">
      <Input
        placeholder="Zoek op naam of omschrijving..."
        value={filters.search}
        onChange={e => onChange("search", e.target.value)}
        className="w-full sm:w-[210px]"
      />
      <Select
        value={filters.roofType}
        onValueChange={v => onChange("roofType", v)}
      >
        <SelectTrigger className="sm:w-[160px] w-full">
          <SelectValue placeholder="Type dak..." />
        </SelectTrigger>
        <SelectContent className="z-50">
          <SelectItem value="all">Alle typen</SelectItem>
          <SelectItem value="plat">Plat dak</SelectItem>
          <SelectItem value="schuin">Schuin dak</SelectItem>
          <SelectItem value="anders">Anders</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Min. oppervlakte (m²)"
        type="number"
        value={filters.minArea}
        onChange={e => onChange("minArea", e.target.value)}
        className="w-[140px]"
        min={0}
      />
      <Input
        placeholder="Max. oppervlakte (m²)"
        type="number"
        value={filters.maxArea}
        onChange={e => onChange("maxArea", e.target.value)}
        className="w-[140px]"
        min={0}
      />
    </div>
    <div className="flex gap-2 mt-2 md:mt-0">
      <Button onClick={onSearch} variant="default">
        <Search className="h-4 w-4 mr-2" />
        Zoeken
      </Button>
      <Button onClick={onReset} variant="outline">Reset</Button>
    </div>
  </div>
);
