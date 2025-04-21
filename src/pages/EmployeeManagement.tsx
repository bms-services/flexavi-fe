import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useEmployeeDialog } from "@/components/employees/useEmployeeDialog";
import { Employee, WorkDay } from "@/types/employee-management";
import { useToast } from "@/hooks/use-toast";

// Mock workdays data - replace with actual data later
const mockWorkDays: WorkDay[] = [];

// Mock employee data - this should come from a data source in real app
const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "sales",
    startDate: "2024-01-01",
    rates: {
      hourlyRate: 25,
      dailyRate: 200
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    workingHours: {
      start: "09:00",
      end: "17:00"
    },
    availableDays: ["1", "2", "3", "4", "5"],
    active: true,
    phoneNumber: "0612345678",
    teamIds: ["sales"]
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    role: "roofer",
    startDate: "2024-02-01",
    rates: {
      hourlyRate: 30,
      dailyRate: 240
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    workingHours: {
      start: "08:00",
      end: "16:00"
    },
    availableDays: ["1", "2", "3", "4", "5"],
    active: true,
    teamIds: ["installation"]
  },
  {
    id: "3",
    firstName: "Piet",
    lastName: "Janssen",
    email: "piet@example.com",
    role: "driver",
    startDate: "2024-03-01",
    rates: {
      hourlyRate: 22,
      dailyRate: 180
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: false,
      sunday: false
    },
    workingHours: {
      start: "07:30",
      end: "16:30"
    },
    availableDays: ["1", "2", "3", "5"],
    active: true,
    phoneNumber: "0623456789",
    teamIds: ["installation"]
  }
];

export default function EmployeeManagement() {
  const { openDialog } = useEmployeeDialog();
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

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <EmployeeList />
        </div>
      </div>
    </Layout>
  );
}
