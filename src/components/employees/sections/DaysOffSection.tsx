
import React from "react";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DayOff } from "../types/employeeList";
import { DaysOffTable } from "../tables/DaysOffTable";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface DaysOffSectionProps {
  daysOff: DayOff[];
  daysOffFilter: string;
  onFilterChange: (value: string) => void;
  onDelete: (id: string) => void;
  pagination: {
    currentPage: number;
    maxPage: number;
    paginatedItems: DayOff[];
    nextPage: () => void;
    prevPage: () => void;
    goToPage: (page: number) => void;
  };
}

export const DaysOffSection: React.FC<DaysOffSectionProps> = ({
  daysOff,
  daysOffFilter,
  onFilterChange,
  onDelete,
  pagination
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Geplande Vrije Dagen</h2>
      
      <div className="flex justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          Totaal: {daysOff.length} vrije {daysOff.length === 1 ? "dag" : "dagen"}
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <Input
            placeholder="Filter vrije dagen..."
            value={daysOffFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <DaysOffTable 
          daysOff={pagination.paginatedItems}
          onDelete={onDelete}
        />
      </div>

      {daysOff.length > 0 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={pagination.prevPage} 
                className={pagination.currentPage <= 1 ? "pointer-events-none opacity-50" : ""} 
              />
            </PaginationItem>
            
            {[...Array(pagination.maxPage)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  isActive={pagination.currentPage === i + 1}
                  onClick={() => pagination.goToPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={pagination.nextPage} 
                className={pagination.currentPage >= pagination.maxPage ? "pointer-events-none opacity-50" : ""} 
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
