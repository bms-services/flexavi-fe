
import React, { useState } from "react";
import { Employee } from "@/types/employee-management";
import { EmployeeDialog } from "./EmployeeDialog";
import { DayOffDialog } from "./DayOffDialog";
import { useEmployeeDialog } from "./useEmployeeDialog";
import { usePagination } from "./hooks/usePagination";
import { useEmployeeData } from "./hooks/useEmployeeData";
import { useSearchFilter } from "./hooks/useSearchFilter";
import { EmployeesSection } from "./sections/EmployeesSection";
import { DaysOffSection } from "./sections/DaysOffSection";

const ITEMS_PER_PAGE = 5;

export const EmployeeList = () => {
  const { 
    employees, 
    setEmployees, 
    daysOff, 
    handleDelete, 
    handleDayOff, 
    handleDeleteDayOff 
  } = useEmployeeData();

  const {
    employeeFilter,
    setEmployeeFilter,
    daysOffFilter,
    setDaysOffFilter,
    filteredEmployees,
    filteredDaysOff
  } = useSearchFilter(employees, daysOff);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [dayOffDialogOpen, setDayOffDialogOpen] = useState(false);
  
  const { isOpen, selectedEmployee, openDialog, closeDialog } = useEmployeeDialog();
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

  const handleDayOffDialogOpen = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setDayOffDialogOpen(true);
  };

  const handleDayOffSubmit = (date: Date, reason: string) => {
    handleDayOff(selectedEmployeeId, date, reason);
    setDayOffDialogOpen(false);
  };

  return (
    <div className="space-y-8 w-full max-w-full overflow-hidden">
      <EmployeesSection
        employees={filteredEmployees}
        employeeFilter={employeeFilter}
        onFilterChange={setEmployeeFilter}
        onEdit={openDialog}
        onDelete={handleDelete}
        onDayOff={handleDayOffDialogOpen}
        pagination={employeePagination}
      />

      <DaysOffSection
        daysOff={filteredDaysOff}
        daysOffFilter={daysOffFilter}
        onFilterChange={setDaysOffFilter}
        onDelete={handleDeleteDayOff}
        pagination={daysOffPagination}
      />

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
