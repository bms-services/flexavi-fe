
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee } from "@/types/employee-management";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, CalendarDays } from "lucide-react";
import { useEmployeeDialog } from "./useEmployeeDialog";
import { EmployeeDialog } from "./EmployeeDialog";
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

export const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const { isOpen, selectedEmployee, openDialog, closeDialog } = useEmployeeDialog();
  const navigate = useNavigate();

  const handleSubmit = (data: Employee) => {
    if (selectedEmployee) {
      setEmployees(employees.map(emp => emp.id === data.id ? data : emp));
    } else {
      setEmployees([...employees, data]);
    }
    closeDialog();
  };

  const handleDelete = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const roleLabels = {
    sales: "Verkoper",
    roofer: "Dakdekker",
    office: "Kantoor",
    driver: "Chauffeur",
  };

  const teamLabels = {
    sales: "Verkoop team",
    installation: "Uitvoerend team",
    management: "Management team",
    administration: "Administratie team"
  };

  const goToCalendarView = () => {
    navigate("/employees/schedule");
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Medewerker
          </Button>
          <Button variant="outline" onClick={goToCalendarView}>
            <CalendarDays className="h-4 w-4 mr-2" />
            Roosterschema
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naam</TableHead>
              <TableHead>Functie</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefoonnummer</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead>Dagtarief</TableHead>
              <TableHead>Uurtarief</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  {employee.firstName} {employee.lastName}
                </TableCell>
                <TableCell>{roleLabels[employee.role]}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phoneNumber || "-"}</TableCell>
                <TableCell>
                  {employee.teamIds?.map(teamId => teamLabels[teamId as keyof typeof teamLabels]).join(", ") || "-"}
                </TableCell>
                <TableCell>€{employee.rates.dailyRate}</TableCell>
                <TableCell>€{employee.rates.hourlyRate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDialog(employee)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(employee.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EmployeeDialog 
        isOpen={isOpen}
        onClose={closeDialog}
        employee={selectedEmployee}
        onSubmit={handleSubmit}
      />
    </>
  );
};
