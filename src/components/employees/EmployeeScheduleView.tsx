
import React, { useState } from "react";
import { format, addDays, startOfWeek, getDay } from "date-fns";
import { nl } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Employee } from "@/types/employee-management";

interface EmployeeScheduleViewProps {
  employees: Employee[];
}

export const EmployeeScheduleView = ({ employees }: EmployeeScheduleViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(weekStart, i);
    return {
      date: day,
      name: format(day, "EEEE", { locale: nl }),
      shortName: format(day, "EEE", { locale: nl }),
      dayNumber: format(day, "d"),
      monthName: format(day, "MMMM", { locale: nl })
    };
  });

  const goToPreviousWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, -7));
  };

  const goToNextWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, 7));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Helper to determine if an employee works on a specific day of the week
  const isWorkingDay = (employee: Employee, dayIndex: number) => {
    const dayMap: Record<number, keyof typeof employee.workingDays> = {
      0: "monday",
      1: "tuesday",
      2: "wednesday",
      3: "thursday",
      4: "friday",
      5: "saturday",
      6: "sunday"
    };
    
    // Adjust index because our week starts with Monday (1) but dayMap starts with 0
    const day = dayMap[(dayIndex) % 7];
    return employee.workingDays[day];
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Roosterschema Medewerkers</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Vandaag
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {format(weekStart, "MMMM yyyy", { locale: nl })}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Calendar header with day names */}
            <div className="grid grid-cols-8 border-b mb-2">
              <div className="p-2 font-medium text-left">Medewerker</div>
              {daysOfWeek.map((day, index) => (
                <div key={index} className="p-2 text-center font-medium">
                  <div>{day.shortName}</div>
                  <div className="text-xs text-muted-foreground">{day.dayNumber}</div>
                </div>
              ))}
            </div>

            {/* Employee rows */}
            {employees.map((employee) => (
              <div key={employee.id} className="grid grid-cols-8 border-b py-2 hover:bg-muted/50">
                <div className="p-2 font-medium flex items-center">
                  {employee.firstName} {employee.lastName}
                </div>
                {daysOfWeek.map((day, index) => {
                  const isWorking = isWorkingDay(employee, index);
                  
                  return (
                    <div 
                      key={index} 
                      className={`p-2 text-center ${isWorking 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-400'}`}
                    >
                      {isWorking ? (
                        <div className="text-xs">
                          {employee.workingHours.start} - {employee.workingHours.end}
                        </div>
                      ) : "Vrij"}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
