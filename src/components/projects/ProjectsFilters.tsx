
import React from "react";
import { Search, Filter, Calendar, MapPin, CircleDollarSign, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectStatus } from "@/types/project";

interface ProjectsFiltersProps {
  filters: {
    search: string;
    location: string;
    status: ProjectStatus | "all";
    startDateFrom: string;
    startDateTo: string;
    budgetMin: string;
    budgetMax: string;
  };
  onFilterChange: (name: string, value: string) => void;
  onReset: () => void;
}

export const ProjectsFilters: React.FC<ProjectsFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-md border p-4 mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium flex items-center">
            <ListFilter className="h-4 w-4 mr-2" />
            Filters
          </h3>
          <Button variant="ghost" size="sm" onClick={onReset} className="ml-auto">
            Reset
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search filter */}
          <div className="flex flex-col gap-2">
            <label htmlFor="search" className="text-sm font-medium flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Zoeken
            </label>
            <Input
              id="search"
              placeholder="Zoek op naam..."
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
            />
          </div>
          
          {/* Location filter */}
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-sm font-medium flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Locatie
            </label>
            <Input
              id="location"
              placeholder="Locatie..."
              value={filters.location}
              onChange={(e) => onFilterChange("location", e.target.value)}
            />
          </div>
          
          {/* Status filter */}
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-sm font-medium flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Status
            </label>
            <Select
              value={filters.status}
              onValueChange={(value) => onFilterChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Alle statussen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle statussen</SelectItem>
                <SelectItem value="active">Actief</SelectItem>
                <SelectItem value="completed">Afgerond</SelectItem>
                <SelectItem value="on-hold">On hold</SelectItem>
                <SelectItem value="cancelled">Geannuleerd</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Budget range */}
          <div className="flex flex-col gap-2">
            <label htmlFor="budget" className="text-sm font-medium flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-2" />
              Budget
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="budgetMin"
                placeholder="Min"
                type="number"
                value={filters.budgetMin}
                onChange={(e) => onFilterChange("budgetMin", e.target.value)}
                className="w-1/2"
              />
              <span>-</span>
              <Input
                id="budgetMax"
                placeholder="Max"
                type="number"
                value={filters.budgetMax}
                onChange={(e) => onFilterChange("budgetMax", e.target.value)}
                className="w-1/2"
              />
            </div>
          </div>
          
          {/* Date range */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="startDate" className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Startdatum
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="startDateFrom"
                type="date"
                value={filters.startDateFrom}
                onChange={(e) => onFilterChange("startDateFrom", e.target.value)}
                className="w-1/2"
              />
              <span>-</span>
              <Input
                id="startDateTo"
                type="date"
                value={filters.startDateTo}
                onChange={(e) => onFilterChange("startDateTo", e.target.value)}
                className="w-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
