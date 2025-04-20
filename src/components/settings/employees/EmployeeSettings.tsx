
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Edit, User } from "lucide-react";
import { Employee } from "@/types/employee";
import { AddTeamMemberDialog } from "../teams/AddTeamMemberDialog";

export const EmployeeSettings: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  const roleLabels = {
    sales: "Verkoop",
    installation: "Uitvoering",
    both: "Beide",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Medewerkers
        </CardTitle>
        <CardDescription>
          Beheer alle medewerkers, hun rollen en toegangsrechten binnen het systeem.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={() => setDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Nieuwe medewerker toevoegen
          </Button>

          {employees.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medewerker</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Telefoonnummer</TableHead>
                  <TableHead className="w-[100px]">Acties</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>
                            {employee.firstName[0]}
                            {employee.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {employee.firstName} {employee.lastName}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{roleLabels[employee.role]}</TableCell>
                    <TableCell>{employee.phoneNumber || "-"}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nog geen medewerkers toegevoegd.
            </div>
          )}
        </div>

        <AddTeamMemberDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleAddEmployee}
          teamId="" // Empty string since we're not adding to a specific team here
        />
      </CardContent>
    </Card>
  );
};
