
import React, { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Employee, WorkDay } from "@/types/employee-management";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmployeeCalendarViewProps {
  employees: Employee[];
  workDays: WorkDay[];
  onAddDayOff: (employeeId: string, date: Date) => void;
}

export const EmployeeCalendarView = ({
  employees,
  workDays,
  onAddDayOff
}: EmployeeCalendarViewProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDayOff = () => {
    if (selectedEmployee && selectedDate) {
      onAddDayOff(selectedEmployee, selectedDate);
    }
  };

  const employee = employees.find(emp => emp.id === selectedEmployee);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Personeelsplanning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer medewerker" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((emp) => (
                <SelectItem key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {employee && (
            <div className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  booked: workDays
                    .filter(day => day.employeeId === selectedEmployee)
                    .map(day => new Date(day.date)),
                }}
                modifiersStyles={{
                  booked: { backgroundColor: "var(--primary)", color: "white" }
                }}
              />

              <Button 
                onClick={handleDayOff}
                disabled={!selectedDate}
                className="w-full"
              >
                Vrij geven op {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "geselecteerde datum"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
