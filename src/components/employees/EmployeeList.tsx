
import React, { useState } from "react";
import { Filter, Plus, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Employee } from "@/types/employee-management";
import { EmployeeDialog } from "./EmployeeDialog";
import { DayOffDialog } from "./DayOffDialog";
import { useEmployeeDialog } from "./useEmployeeDialog";
import { DayOff } from "./types/employeeList";
import { EmployeeTable } from "./tables/EmployeeTable";
import { DaysOffTable } from "./tables/DaysOffTable";
import { usePagination } from "./hooks/usePagination";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 5;

export const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [daysOff, setDaysOff] = useState<DayOff[]>([]);
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [daysOffFilter, setDaysOffFilter] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [dayOffDialogOpen, setDayOffDialogOpen] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isOpen, selectedEmployee, openDialog, closeDialog } = useEmployeeDialog();

  // Filter employees and days off
  const filteredEmployees = employees.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(employeeFilter.toLowerCase()) ||
    emp.email.toLowerCase().includes(employeeFilter.toLowerCase())
  );

  const filteredDaysOff = daysOff.filter(day => 
    day.employeeName.toLowerCase().includes(daysOffFilter.toLowerCase()) ||
    day.reason.toLowerCase().includes(daysOffFilter.toLowerCase())
  );

  // Pagination
  const employeePagination = usePagination(filteredEmployees, ITEMS_PER_PAGE);
  const daysOffPagination = usePagination(filteredDaysOff, ITEMS_PER_PAGE);

  const handleSubmit = (data: Employee) => {
    if (selectedEmployee) {
      setEmployees(employees.map(emp => emp.id === data.id ? data : emp));
    } else {
      setEmployees([...employees, data]);
    }
    closeDialog();
  };

  const handleDelete = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleDayOff = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setDayOffDialogOpen(true);
  };

  const handleDayOffSubmit = (date: Date, reason: string) => {
    const employee = employees.find(emp => emp.id === selectedEmployeeId);
    if (employee) {
      const newDayOff: DayOff = {
        id: crypto.randomUUID(),
        employeeId: selectedEmployeeId,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        date,
        reason
      };
      
      setDaysOff([...daysOff, newDayOff]);
      toast({
        title: "Vrije dag toegevoegd",
        description: `Vrije dag is toegevoegd voor ${employee.firstName} ${employee.lastName}`
      });
    }
  };

  const handleDeleteDayOff = (id: string) => {
    setDaysOff(daysOff.filter(day => day.id !== id));
    toast({
      title: "Vrije dag verwijderd",
      description: "De vrije dag is succesvol verwijderd."
    });
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* Employees section */}
      <div>
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Button onClick={() => openDialog()}>
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
              onChange={(e) => setEmployeeFilter(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <EmployeeTable 
            employees={employeePagination.paginatedItems}
            onEdit={openDialog}
            onDelete={handleDelete}
            onDayOff={handleDayOff}
          />
        </div>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={employeePagination.prevPage} className={employeePagination.currentPage <= 1 ? "pointer-events-none opacity-50" : ""} />
            </PaginationItem>
            
            {[...Array(employeePagination.maxPage)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  isActive={employeePagination.currentPage === i + 1}
                  onClick={() => employeePagination.goToPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext onClick={employeePagination.nextPage} className={employeePagination.currentPage >= employeePagination.maxPage ? "pointer-events-none opacity-50" : ""} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Days off section */}
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
              onChange={(e) => setDaysOffFilter(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <DaysOffTable 
            daysOff={daysOffPagination.paginatedItems}
            onDelete={handleDeleteDayOff}
          />
        </div>

        {daysOff.length > 0 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={daysOffPagination.prevPage} className={daysOffPagination.currentPage <= 1 ? "pointer-events-none opacity-50" : ""} />
              </PaginationItem>
              
              {[...Array(daysOffPagination.maxPage)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    isActive={daysOffPagination.currentPage === i + 1}
                    onClick={() => daysOffPagination.goToPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext onClick={daysOffPagination.nextPage} className={daysOffPagination.currentPage >= daysOffPagination.maxPage ? "pointer-events-none opacity-50" : ""} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <EmployeeDialog 
        isOpen={isOpen}
        onClose={closeDialog}
        employee={selectedEmployee}
        onSubmit={handleSubmit}
      />

      <DayOffDialog
        isOpen={dayOffDialogOpen}
        onClose={() => setDayOffDialogOpen(false)}
        onSubmit={handleDayOffSubmit}
        employeeId={selectedEmployeeId}
      />
    </div>
  );
};
