
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { DayOff } from "../types/employeeList";

interface DaysOffTableProps {
  daysOff: DayOff[];
  onDelete: (id: string) => void;
}

export const DaysOffTable = ({ daysOff, onDelete }: DaysOffTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Medewerker</TableHead>
          <TableHead>Datum</TableHead>
          <TableHead>Reden</TableHead>
          <TableHead className="text-right">Acties</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {daysOff.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
              Geen vrije dagen gepland
            </TableCell>
          </TableRow>
        ) : (
          daysOff.map((dayOff) => (
            <TableRow key={dayOff.id}>
              <TableCell>{dayOff.employeeName}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {format(dayOff.date, 'dd MMMM yyyy', { locale: nl })}
                </Badge>
              </TableCell>
              <TableCell>{dayOff.reason}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDelete(dayOff.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
