
import React, { useState } from "react";
import { EmployeeWorklist } from "./EmployeeWorklist";
import { Appointment } from "@/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Filter } from "lucide-react";

interface DayTab {
  label: string;
  offset: number;
}

interface EmployeePlanningTabsProps {
  days: DayTab[];
  getAppointmentsForDay: (offset: number) => Appointment[];
}

export const EmployeePlanningTabs: React.FC<EmployeePlanningTabsProps> = ({
  days,
  getAppointmentsForDay,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const currentAppointments = getAppointmentsForDay(days[activeTab].offset);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      {/* Header with search and filters */}
      <div className="p-4 border-b flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search for appointments"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">Last Appointment Date</Button>
          <Button>Add to Table</Button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {format(new Date(appointment.date), "HH:mm")}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(appointment.date), "dd.MM.yyyy")}
                  </div>
                </TableCell>
                <TableCell>{appointment.title}</TableCell>
                <TableCell>
                  <div className="font-medium">{appointment.description}</div>
                </TableCell>
                <TableCell>{appointment.startTime} - {appointment.endTime}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8" />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing 10 out of {currentAppointments.length} Appointments
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">1</Button>
          {/* Changed from "primary" to "default" to fix the TypeScript error */}
          <Button variant="default" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};
