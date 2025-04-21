
import React from "react";
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
import { Edit, Trash2 } from "lucide-react";
import { useEmployeeDialog } from "./useEmployeeDialog";

const mockEmployees: Employee[] = []; // Will be replaced with real data later

export const EmployeeList = () => {
  const { openDialog } = useEmployeeDialog();

  const roleLabels = {
    sales: "Verkoper",
    roofer: "Dakdekker",
    office: "Kantoor",
    driver: "Chauffeur",
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>Functie</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefoonnummer</TableHead>
            <TableHead>Dagtarief</TableHead>
            <TableHead>Uurtarief</TableHead>
            <TableHead className="text-right">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                {employee.firstName} {employee.lastName}
              </TableCell>
              <TableCell>{roleLabels[employee.role]}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phoneNumber || "-"}</TableCell>
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
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
