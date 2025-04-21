
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { Employee } from "@/types/employee-management";
import { roleLabels, teamLabels } from "../types/employeeList";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onDayOff: (id: string) => void;
}

export const EmployeeTable = ({ employees, onEdit, onDelete, onDayOff }: EmployeeTableProps) => {
  return (
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
                  onClick={() => onDayOff(employee.id)}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(employee)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDelete(employee.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
