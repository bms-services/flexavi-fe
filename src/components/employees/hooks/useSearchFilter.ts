
import { useState } from "react";
import { Employee } from "@/types/employee-management";
import { DayOff } from "../types/employeeList";

export const useSearchFilter = (employees: Employee[], daysOff: DayOff[]) => {
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [daysOffFilter, setDaysOffFilter] = useState("");

  const filteredEmployees = employees.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(employeeFilter.toLowerCase()) ||
    emp.email.toLowerCase().includes(employeeFilter.toLowerCase())
  );

  const filteredDaysOff = daysOff.filter(day => 
    day.employeeName.toLowerCase().includes(daysOffFilter.toLowerCase()) ||
    day.reason.toLowerCase().includes(daysOffFilter.toLowerCase())
  );

  return {
    employeeFilter,
    setEmployeeFilter,
    daysOffFilter,
    setDaysOffFilter,
    filteredEmployees,
    filteredDaysOff
  };
};
