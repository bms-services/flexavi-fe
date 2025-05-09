
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeHeader } from "@/components/employees/EmployeeHeader";
import { Employee, WorkDay } from "@/types/employee-management";

import { mockEmployees } from "@/data/mockEmployees";
import { mockWorkDays } from "@/data/mockWorkDays";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [workDays, setWorkDays] = useState<WorkDay[]>(mockWorkDays);
  

  const handleAddDayOff = (employeeId: string, date: Date) => {
    const newWorkDay: WorkDay = {
      id: crypto.randomUUID(),
      employeeId,
      date: date.toISOString().split('T')[0],
      hours: 0,
      type: "vacation"
    };

    setWorkDays([...workDays, newWorkDay]);
  
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 py-6 sm:py-8 min-h-[calc(100vh-4rem)]">
        <EmployeeHeader />
        <div className="grid grid-cols-1 gap-6 mt-6">
          <EmployeeList />
        </div>
      </div>
    </Layout>
  );
}
