
import { useState } from "react";
import { Employee } from "@/types/employee-management";
import { DayOff } from "../types/employeeList";


export const useEmployeeData = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [daysOff, setDaysOff] = useState<DayOff[]>([]);

  const handleDelete = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleDayOff = (employeeId: string, date: Date, reason: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      const newDayOff: DayOff = {
        id: crypto.randomUUID(),
        employeeId,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        date,
        reason
      };
      
      setDaysOff([...daysOff, newDayOff]);
    
    }
  };

  const handleDeleteDayOff = (id: string) => {
    setDaysOff(daysOff.filter(day => day.id !== id));
    
  };

  return {
    employees,
    setEmployees,
    daysOff,
    setDaysOff,
    handleDelete,
    handleDayOff,
    handleDeleteDayOff,
  };
};
