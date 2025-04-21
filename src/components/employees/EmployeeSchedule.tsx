
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Employee, WorkDay } from "@/types/employee-management";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

interface EmployeeScheduleProps {
  employee: Employee;
  workDays: WorkDay[];
  onDaySelect: (date: Date) => void;
}

export const EmployeeSchedule = ({ employee, workDays, onDaySelect }: EmployeeScheduleProps) => {
  const workingDays = Object.entries(employee.workingDays)
    .filter(([_, isWorking]) => isWorking)
    .map(([day]) => day);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Planning voor {employee.firstName} {employee.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Werkdagen:</h3>
          <p className="text-sm text-muted-foreground">
            {workingDays.length > 0
              ? workingDays.map((day) => day.charAt(0).toUpperCase() + day.slice(1)).join(", ")
              : "Geen werkdagen ingesteld"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Werktijden: {employee.workingHours.start} - {employee.workingHours.end}
          </p>
        </div>
        
        <Calendar
          mode="single"
          className="rounded-md border"
          onSelect={(date) => date && onDaySelect(date)}
          modifiers={{
            booked: workDays.map(day => new Date(day.date)),
          }}
          modifiersStyles={{
            booked: { backgroundColor: "var(--primary)", color: "white" }
          }}
        />
      </CardContent>
    </Card>
  );
};
