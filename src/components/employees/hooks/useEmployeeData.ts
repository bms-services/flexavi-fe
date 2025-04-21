
import { useState } from "react";
import { Employee } from "@/types/employee-management";
import { DayOff } from "../types/employeeList";
import { useToast } from "@/hooks/use-toast";

export const useEmployeeData = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [daysOff, setDaysOff] = useState<DayOff[]>([]);
  const { toast } = useToast();

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
