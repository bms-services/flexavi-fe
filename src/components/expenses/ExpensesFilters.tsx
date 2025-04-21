
import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, SearchIcon, Filter, X } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { ExpenseFilters, ExpenseType, ExpenseStatus } from "@/types/expenses";
import { getTypeLabel } from "./ExpenseTypeIcon";
import { Badge } from "@/components/ui/badge";

interface ExpensesFiltersProps {
  onFiltersChange: (filters: ExpenseFilters) => void;
}

export const ExpensesFilters: React.FC<ExpensesFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  const handleFilterChange = (key: keyof ExpenseFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    
    // If value is empty or undefined, remove the filter
    if (!value) {
      delete newFilters[key];
    }

    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDateRangeChange = (range: [Date | null, Date | null]) => {
    setDateRange(range);
    if (range[0] && range[1]) {
      handleFilterChange('dateRange', range);
      setIsPeriodOpen(false);
    }
  };

  const clearFilters = () => {
    setFilters({});
    setDateRange([null, null]);
    onFiltersChange({});
  };

  const getAppliedFiltersCount = () => {
    return Object.keys(filters).length;
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Zoek op bedrijf, omschrijving of notitie..."
              className="pl-8"
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          
          <Select
            value={filters.status as string || ''}
            onValueChange={(value) => handleFilterChange('status', value || undefined)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Alle statussen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Alle statussen</SelectItem>
              <SelectItem value="draft">Concept</SelectItem>
              <SelectItem value="pending">In behandeling</SelectItem>
              <SelectItem value="approved">Goedgekeurd</SelectItem>
              <SelectItem value="rejected">Afgekeurd</SelectItem>
              <SelectItem value="processed">Verwerkt</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={filters.type as string || ''}
            onValueChange={(value) => handleFilterChange('type', value || undefined)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Alle types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Alle types</SelectItem>
              <SelectItem value="material">{getTypeLabel('material')}</SelectItem>
              <SelectItem value="transport">{getTypeLabel('transport')}</SelectItem>
              <SelectItem value="equipment">{getTypeLabel('equipment')}</SelectItem>
              <SelectItem value="subcontractor">{getTypeLabel('subcontractor')}</SelectItem>
              <SelectItem value="other">{getTypeLabel('other')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover open={isPeriodOpen} onOpenChange={setIsPeriodOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange[0] && dateRange[1] ? (
                  <span>
                    {format(dateRange[0], 'P', { locale: nl })} - {format(dateRange[1], 'P', { locale: nl })}
                  </span>
                ) : (
                  <span>Selecteer periode</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={dateRange[0] || undefined}
                selected={{ from: dateRange[0] || undefined, to: dateRange[1] || undefined }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    handleDateRangeChange([range.from, range.to]);
                  }
                }}
                numberOfMonths={2}
                locale={nl}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex gap-2">
          {getAppliedFiltersCount() > 0 && (
            <Button variant="ghost" onClick={clearFilters} size="sm">
              <X className="mr-2 h-4 w-4" />
              Wis filters
              <Badge variant="secondary" className="ml-2">
                {getAppliedFiltersCount()}
              </Badge>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
