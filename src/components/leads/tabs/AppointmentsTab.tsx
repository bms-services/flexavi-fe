import React, { useState } from "react";
import { Appointment } from "@/types";
import { Button } from "@/components/ui/button";
import { LeadTablePagination } from "@/components/leads/LeadTablePagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";

interface AppointmentsTabProps {
  appointments: Appointment[];
  leadId: string;
}

const getStatusBadge = (status: Appointment["status"]) => {
  const statusConfig = {
    scheduled: { label: "Gepland", variant: "default" as const },
    completed: { label: "Voltooid", variant: "success" as const },
    canceled: { label: "Geannuleerd", variant: "destructive" as const },
    rescheduled: { label: "Verzet", variant: "warning" as const },
    quote_request: { label: "Offerte aanvraag", variant: "primary" as const },
    warranty: { label: "Garantie", variant: "secondary" as const },
    new_assignment: { label: "Nieuwe opdracht", variant: "success" as const },
    extra_assignment: { label: "Extra opdracht", variant: "warning" as const }
  };

  const config = statusConfig[status] || statusConfig.scheduled;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export const AppointmentsTab: React.FC<AppointmentsTabProps> = ({
  appointments,
  leadId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = appointments
    .sort((a, b) => new Date(`${b.date}T${b.startTime}`).getTime() - new Date(`${a.date}T${a.startTime}`).getTime())
    .slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuwe Afspraak
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Afspraken</CardTitle>
              <CardDescription>
                Alle afspraken voor deze lead
              </CardDescription>
            </div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nog geen afspraken voor deze lead.
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Tijd</TableHead>
                    <TableHead>Titel</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Beschrijving
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Team</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        {format(parseISO(appointment.date), "EEEE d MMMM yyyy", {
                          locale: nl,
                        })}
                      </TableCell>
                      <TableCell>
                        {appointment.startTime} - {appointment.endTime}
                      </TableCell>
                      <TableCell>{appointment.title}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {appointment.description}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                      <TableCell>
                        {appointment.teamType === "sales" ? "Verkoop" : "Uitvoering"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <LeadTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
