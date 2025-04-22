
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SupportTicketFiltersProps {
  className?: string;
  onFilterChange?: (filters: Record<string, any>) => void;
}

export function SupportTicketFilters({ className, onFilterChange }: SupportTicketFiltersProps) {
  const [filters, setFilters] = React.useState({
    search: "",
    status: "",
    priority: "",
    category: "",
    assignedTo: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      search: "",
      status: "",
      priority: "",
      category: "",
      assignedTo: "",
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-5 gap-3", className)}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Zoeken op titel of inhoud..."
          className="pl-8"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>
      
      <Select 
        value={filters.status}
        onValueChange={(value) => handleFilterChange("status", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Alle statussen</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="in-progress">In behandeling</SelectItem>
          <SelectItem value="waiting-for-customer">Wachtend op klant</SelectItem>
          <SelectItem value="waiting-for-staff">Wachtend op medewerker</SelectItem>
          <SelectItem value="resolved">Opgelost</SelectItem>
          <SelectItem value="closed">Gesloten</SelectItem>
        </SelectContent>
      </Select>
      
      <Select 
        value={filters.priority}
        onValueChange={(value) => handleFilterChange("priority", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Prioriteit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Alle prioriteiten</SelectItem>
          <SelectItem value="low">Laag</SelectItem>
          <SelectItem value="medium">Gemiddeld</SelectItem>
          <SelectItem value="high">Hoog</SelectItem>
          <SelectItem value="urgent">Urgent</SelectItem>
        </SelectContent>
      </Select>
      
      <Select 
        value={filters.category}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Categorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Alle categorieën</SelectItem>
          <SelectItem value="technical">Technisch</SelectItem>
          <SelectItem value="billing">Facturatie</SelectItem>
          <SelectItem value="feature-request">Feature verzoek</SelectItem>
          <SelectItem value="account">Account</SelectItem>
          <SelectItem value="general">Algemeen</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={resetFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
