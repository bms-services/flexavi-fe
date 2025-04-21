
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeHeader } from "@/components/employees/EmployeeHeader";
import { Employee, WorkDay } from "@/types/employee-management";
import { useToast } from "@/hooks/use-toast";
import { mockEmployees, mockWorkDays } from "@/data/mockEmployees";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [workDays, setWorkDays] = useState<WorkDay[]>(mockWorkDays);
  const { toast } = useToast();

  const handleAddDayOff = (employeeId: string, date: Date) => {
    const newWorkDay: WorkDay = {
      id: crypto.randomUUID(),
      employeeId,
      date: date.toISOString(),
      hours: 0,
      type: "vacation"
    };

    setWorkDays([...workDays, newWorkDay]);
    toast({
      title: "Vrije dag toegevoegd",
      description: "De medewerker is succesvol vrij gegeven op de geselecteerde datum."
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <EmployeeHeader />
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <EmployeeList />
        </div>
      </div>
    </Layout>
  );
}
