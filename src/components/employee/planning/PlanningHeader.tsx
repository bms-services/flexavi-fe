
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PlanningHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const PlanningHeader: React.FC<PlanningHeaderProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="p-4 border-b flex items-center justify-between gap-4 flex-wrap">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Zoeken in afspraken"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button>Nieuwe Afspraak</Button>
      </div>
    </div>
  );
};
