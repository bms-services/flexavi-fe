
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface LeadSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const LeadSearch: React.FC<LeadSearchProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="relative w-full sm:w-auto sm:max-w-xs">
      <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Zoek leads..."
        className="pl-8 h-8"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
