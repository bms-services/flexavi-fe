
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Employee } from "@/types/employee-management";
import { EmployeeTable } from "../tables/EmployeeTable";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface EmployeesSectionProps {
  employees: Employee[];
  employeeFilter: string;
  onFilterChange: (value: string) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onDayOff: (id: string) => void;
  pagination: {
    currentPage: number;
    maxPage: number;
    paginatedItems: Employee[];
    nextPage: () => void;
    prevPage: () => void;
    goToPage: (page: number) => void;
  };
}

export const EmployeesSection: React.FC<EmployeesSectionProps> = ({
  employees,
  employeeFilter,
  onFilterChange,
  onEdit,
  onDelete,
  onDayOff,
  pagination
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Button onClick={() => onEdit({} as Employee)}>
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Medewerker
          </Button>
          <Button variant="outline" onClick={() => navigate("/employees/schedule")}>
            <CalendarDays className="h-4 w-4 mr-2" />
            Roosterschema
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <Input
            placeholder="Zoek medewerkers..."
            value={employeeFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <EmployeeTable 
          employees={pagination.paginatedItems}
          onEdit={onEdit}
          onDelete={onDelete}
          onDayOff={onDayOff}
        />
      </div>

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
    </div>
  );
};
