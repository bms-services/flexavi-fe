
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseType, ExpenseStatus } from "@/types/expenses";
import { getTypeLabel } from "../ExpenseTypeIcon";

interface ExpensesAdvancedFiltersProps {
  filters: {
    minAmount?: number;
    maxAmount?: number;
    company?: string;
    description?: string;
    type?: ExpenseType;
    status?: ExpenseStatus;
  };
  onFilterChange: (name: string, value: any) => void;
}

export const ExpensesAdvancedFilters: React.FC<ExpensesAdvancedFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Bedrijf</label>
        <Input
          placeholder="Filter op bedrijf..."
          value={filters.company || ""}
          onChange={(e) => onFilterChange("company", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Omschrijving</label>
        <Input
          placeholder="Filter op omschrijving..."
          value={filters.description || ""}
          onChange={(e) => onFilterChange("description", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select
          value={filters.type}
          onValueChange={(value) => onFilterChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Alle types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle types</SelectItem>
            <SelectItem value="material">{getTypeLabel("material")}</SelectItem>
            <SelectItem value="transport">{getTypeLabel("transport")}</SelectItem>
            <SelectItem value="equipment">{getTypeLabel("equipment")}</SelectItem>
            <SelectItem value="subcontractor">{getTypeLabel("subcontractor")}</SelectItem>
            <SelectItem value="other">{getTypeLabel("other")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Alle statussen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle statussen</SelectItem>
            <SelectItem value="draft">Concept</SelectItem>
            <SelectItem value="pending">In behandeling</SelectItem>
            <SelectItem value="approved">Goedgekeurd</SelectItem>
            <SelectItem value="rejected">Afgekeurd</SelectItem>
            <SelectItem value="processed">Verwerkt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Minimum bedrag</label>
        <Input
          type="number"
          placeholder="Min bedrag..."
          value={filters.minAmount || ""}
          onChange={(e) => onFilterChange("minAmount", e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Maximum bedrag</label>
        <Input
          type="number"
          placeholder="Max bedrag..."
          value={filters.maxAmount || ""}
          onChange={(e) => onFilterChange("maxAmount", e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>
    </div>
  );
};
