
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkAgreementStatus } from "@/types";

interface WorkAgreementFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: WorkAgreementStatus | "all") => void;
}

export const WorkAgreementFilters: React.FC<WorkAgreementFiltersProps> = ({
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Zoek op naam klant of adres..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value as WorkAgreementStatus | "all")}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter op status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle statussen</SelectItem>
          <SelectItem value="draft">Concept</SelectItem>
          <SelectItem value="sent">Verstuurd</SelectItem>
          <SelectItem value="in_review">In revisie</SelectItem>
          <SelectItem value="signed">Ondertekend</SelectItem>
          <SelectItem value="rejected">Geweigerd</SelectItem>
          <SelectItem value="expired">Verlopen</SelectItem>
          <SelectItem value="completed">Afgerond</SelectItem>
          <SelectItem value="cancelled">Geannuleerd</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
