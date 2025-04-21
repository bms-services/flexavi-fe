
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { EmployeeScheduleView } from "@/components/employees/EmployeeScheduleView";
import { Employee } from "@/types/employee-management";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Temporary mock data - will be replaced with real data later
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

export default function EmployeeSchedule() {
  const [employees] = useState<Employee[]>(mockEmployees);
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Medewerkers Rooster</h1>
          </div>
          <Button onClick={() => navigate("/employees")}>
            Terug naar medewerkers overzicht
          </Button>
        </div>

        <EmployeeScheduleView employees={employees} />
      </div>
    </Layout>
  );
}
