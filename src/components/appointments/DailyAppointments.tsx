
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Appointment } from "@/types";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { mockLeads } from "@/data/mockData";
import { Clock, User, MapPin, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DailyAppointmentsProps {
  date: string;
  appointments: Appointment[];
}

export const DailyAppointments: React.FC<DailyAppointmentsProps> = ({
  date,
  appointments,
}) => {
  const getLeadName = (leadId: string) => {
    const lead = mockLeads.find((l) => l.id === leadId);
    return lead ? lead.name : "Onbekend";
  };

  const getLeadAddress = (leadId: string) => {
    const lead = mockLeads.find((l) => l.id === leadId);
    return lead ? lead.address : "Onbekend adres";
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "EEEE d MMMM yyyy", { locale: nl });
  };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Afspraken voor {formatDate(date)}</CardTitle>
        <CardDescription>
          {appointments.length} afspraken gepland voor deze dag
        </CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Geen afspraken gepland voor deze dag.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start md:items-center gap-4 flex-col md:flex-row md:justify-between mb-3">
                  <h3 className="font-medium text-lg">{appointment.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="inline mr-1 h-4 w-4" />
                      {appointment.startTime} - {appointment.endTime}
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                </div>
                <p className="mb-4">{appointment.description}</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <User className="inline mr-2 h-4 w-4" />
                    {getLeadName(appointment.leadId)}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="inline mr-2 h-4 w-4" />
                    {getLeadAddress(appointment.leadId)}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="inline mr-2 h-4 w-4" />
                    {appointment.teamType === "sales" ? "Verkoop" : 
                     appointment.teamType === "installation" ? "Installatie" :
                     appointment.teamType === "repair" ? "Reparatie" : "Onderhoud"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
