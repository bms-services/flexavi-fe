
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useEmployeeDialog } from "@/components/employees/useEmployeeDialog";
import { EmployeeCalendarView } from "@/components/employees/EmployeeCalendarView";
import { Employee, WorkDay } from "@/types/employee-management";
import { useToast } from "@/hooks/use-toast";

// Mock workdays data - replace with actual data later
const mockWorkDays: WorkDay[] = [];

export default function EmployeeManagement() {
  const { openDialog } = useEmployeeDialog();
  const [employees, setEmployees] = useState<Employee[]>([]);
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Medewerkers</h1>
          </div>
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Medewerker
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmployeeList />
          <EmployeeCalendarView 
            employees={employees}
            workDays={workDays}
            onAddDayOff={handleAddDayOff}
          />
        </div>
      </div>
    </Layout>
  );
}
