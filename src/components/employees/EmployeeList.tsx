
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Employee } from "@/types/employee-management";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, Plus, CalendarDays, Filter, Save } from "lucide-react";
import { useEmployeeDialog } from "./useEmployeeDialog";
import { EmployeeDialog } from "./EmployeeDialog";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { DayOffDialog } from "./DayOffDialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

// Bestaande mock werknemers
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

// Interface voor vrije dagen
interface DayOff {
  id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  reason: string;
}

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

export const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const { isOpen, selectedEmployee, openDialog, closeDialog } = useEmployeeDialog();
  const [dayOffDialogOpen, setDayOffDialogOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State voor vrije dagen
  const [daysOff, setDaysOff] = useState<DayOff[]>([]);
  
  // State voor filtering en paginering
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [daysOffFilter, setDaysOffFilter] = useState("");
  const [employeesPage, setEmployeesPage] = useState(1);
  const [daysOffPage, setDaysOffPage] = useState(1);
  const itemsPerPage = 5;
  
  // Gefilterde werknemers
  const filteredEmployees = employees.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(employeeFilter.toLowerCase()) ||
    emp.email.toLowerCase().includes(employeeFilter.toLowerCase()) ||
    (roleLabels[emp.role] && roleLabels[emp.role].toLowerCase().includes(employeeFilter.toLowerCase()))
  );
  
  const paginatedEmployees = filteredEmployees.slice(
    (employeesPage - 1) * itemsPerPage, 
    employeesPage * itemsPerPage
  );
  
  const employeeMaxPage = Math.ceil(filteredEmployees.length / itemsPerPage);
  
  // Gefilterde vrije dagen
  const filteredDaysOff = daysOff.filter(day => 
    day.employeeName.toLowerCase().includes(daysOffFilter.toLowerCase()) ||
    day.reason.toLowerCase().includes(daysOffFilter.toLowerCase())
  );
  
  const paginatedDaysOff = filteredDaysOff.slice(
    (daysOffPage - 1) * itemsPerPage, 
    daysOffPage * itemsPerPage
  );
  
  const daysOffMaxPage = Math.ceil(filteredDaysOff.length / itemsPerPage);

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

  const handleDayOff = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setDayOffDialogOpen(true);
  };

  const handleDayOffSubmit = (date: Date, reason: string) => {
    const employee = employees.find(emp => emp.id === selectedEmployeeId);
    if (employee) {
      const newDayOff: DayOff = {
        id: crypto.randomUUID(),
        employeeId: selectedEmployeeId,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        date: date,
        reason: reason
      };
      
      setDaysOff([...daysOff, newDayOff]);
      
      toast({
        title: "Vrije dag toegevoegd",
        description: `${employee.firstName} ${employee.lastName} is vrij gegeven op ${format(date, 'dd MMMM yyyy', { locale: nl })}.`
      });
    }
  };

  const handleDeleteDayOff = (id: string) => {
    setDaysOff(daysOff.filter(day => day.id !== id));
    toast({
      title: "Vrije dag verwijderd",
      description: "De vrije dag is succesvol verwijderd."
    });
  };

  const goToCalendarView = () => {
    navigate("/employees/schedule");
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        {/* Werknemers tabel sectie */}
        <div>
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
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Input
                placeholder="Zoek medewerkers..."
                value={employeeFilter}
                onChange={(e) => setEmployeeFilter(e.target.value)}
                className="max-w-xs"
              />
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
                {paginatedEmployees.map((employee) => (
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
                          onClick={() => handleDayOff(employee.id)}
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
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
          
          {/* Paginering voor werknemers */}
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setEmployeesPage(p => Math.max(1, p - 1))}
                  className={employeesPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {[...Array(employeeMaxPage)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    isActive={employeesPage === i + 1}
                    onClick={() => setEmployeesPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setEmployeesPage(p => Math.min(employeeMaxPage, p + 1))}
                  className={employeesPage >= employeeMaxPage ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        
        {/* Vrije dagen tabel sectie */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Geplande Vrije Dagen</h2>
          
          <div className="flex justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              Totaal: {daysOff.length} vrije {daysOff.length === 1 ? "dag" : "dagen"}
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Input
                placeholder="Filter vrije dagen..."
                value={daysOffFilter}
                onChange={(e) => setDaysOffFilter(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </div>
          
          <div className="rounded-md border">
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
                {paginatedDaysOff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Geen vrije dagen gepland
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedDaysOff.map((dayOff) => (
                    <TableRow key={dayOff.id}>
                      <TableCell>
                        {dayOff.employeeName}
                      </TableCell>
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
                          onClick={() => handleDeleteDayOff(dayOff.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Paginering voor vrije dagen */}
          {daysOff.length > 0 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setDaysOffPage(p => Math.max(1, p - 1))}
                    className={daysOffPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(daysOffMaxPage)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      isActive={daysOffPage === i + 1}
                      onClick={() => setDaysOffPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setDaysOffPage(p => Math.min(daysOffMaxPage, p + 1))}
                    className={daysOffPage >= daysOffMaxPage ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>

      <EmployeeDialog 
        isOpen={isOpen}
        onClose={closeDialog}
        employee={selectedEmployee}
        onSubmit={handleSubmit}
      />

      <DayOffDialog
        isOpen={dayOffDialogOpen}
        onClose={() => setDayOffDialogOpen(false)}
        onSubmit={handleDayOffSubmit}
        employeeId={selectedEmployeeId}
      />
    </>
  );
};
