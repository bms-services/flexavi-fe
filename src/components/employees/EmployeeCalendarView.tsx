
import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Employee, WorkDay } from "@/types/employee-management";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
      // Clear selection after adding
      setSelectedDate(undefined);
    }
  };

  const employee = employees.find(emp => emp.id === selectedEmployee);
  
  // Get all days off for the selected employee
  const employeeDaysOff = workDays
    .filter(day => day.employeeId === selectedEmployee && day.type === "vacation")
    .map(day => parseISO(day.date));

  // Get working days for the selected employee
  const getWorkingDaysForEmployee = () => {
    if (!employee) return [];
    
    const workingDays: string[] = [];
    Object.entries(employee.workingDays).forEach(([day, isWorking]) => {
      if (isWorking) {
        workingDays.push(day);
      }
    });
    
    return workingDays;
  };

  const workingDays = getWorkingDaysForEmployee();
  
  // Format working days for display
  const formatWorkingDays = (days: string[]) => {
    return days.map(day => {
      const capitalized = day.charAt(0).toUpperCase() + day.slice(1);
      return capitalized;
    }).join(", ");
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Personeelsplanning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-full">
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
              <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{employee.firstName} {employee.lastName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Werkt: {formatWorkingDays(workingDays)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Werktijden: {employee.workingHours.start} - {employee.workingHours.end}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-md border p-3">
                <div className="mb-2 text-sm text-muted-foreground">
                  Selecteer een datum om een vrije dag in te plannen
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                  locale={nl}
                  modifiers={{
                    vacation: employeeDaysOff,
                  }}
                  modifiersStyles={{
                    vacation: { 
                      backgroundColor: "var(--destructive)", 
                      color: "white",
                      fontWeight: "bold" 
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Geplande vrije dagen</h4>
                <div className="flex flex-wrap gap-2">
                  {employeeDaysOff.length > 0 ? (
                    employeeDaysOff.map((day, i) => (
                      <Badge key={i} variant="outline" className="bg-destructive/10">
                        {format(day, "d MMMM yyyy", { locale: nl })}
                      </Badge>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">Geen vrije dagen gepland</div>
                  )}
                </div>
              </div>

              <Button 
                onClick={handleDayOff}
                disabled={!selectedDate}
                className="w-full"
              >
                Vrij geven op {selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: nl }) : "geselecteerde datum"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
