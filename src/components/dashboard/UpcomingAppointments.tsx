
import React from "react";
import { Appointment } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { mockLeads } from "@/data/mockData";
import { CalendarCheck } from "lucide-react";

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

export const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
  appointments,
}) => {
  const getLeadName = (leadId: string) => {
    const lead = mockLeads.find((l) => l.id === leadId);
    return lead ? lead.name : "Onbekend";
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Aankomende Afspraken</CardTitle>
          <CardDescription>Geplande afspraken voor de komende week</CardDescription>
        </div>
        <CalendarCheck className="h-5 w-5 text-roof-500" />
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <p className="text-muted-foreground py-4 text-center">
            Geen aankomende afspraken gevonden.
          </p>
        ) : (
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-start border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="flex flex-col items-center mr-4 mt-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {format(parseISO(appointment.date), "MMM", { locale: nl })}
                  </span>
                  <span className="text-xl font-bold">
                    {format(parseISO(appointment.date), "dd")}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{appointment.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {appointment.startTime} - {appointment.endTime} | {getLeadName(appointment.leadId)}
                  </p>
                  <p className="text-sm">{appointment.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
