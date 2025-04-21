
import { useState } from "react";
import { Employee } from "@/types/employee-management";

export const useEmployeeDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const openDialog = (employee?: Employee) => {
    if (employee) {
      setSelectedEmployee(employee);
    } else {
      setSelectedEmployee(null);
    }
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedEmployee(null);
  };

  return {
    isOpen,
    selectedEmployee,
    openDialog,
    closeDialog,
  };
};
