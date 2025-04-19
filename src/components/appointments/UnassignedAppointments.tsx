import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment } from "@/types";
import { Clock, MapPin, User, Calendar, FileText, GripVertical, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockLeads } from "@/data/mockData";

interface UnassignedAppointmentsProps {
  date: string;
  appointments: Appointment[];
  onDragStart: (e: React.DragEvent, appointment: Appointment) => void;
  onDrop?: (e: React.DragEvent) => void;
}

const appointmentTypeLabels = {
  quote_request: "Offerte aanvraag",
  warranty: "Garantie",
  new_assignment: "Nieuwe opdracht",
  extra_assignment: "Extra opdracht",
  scheduled: "Ingepland",
  completed: "Afgerond",
  canceled: "Geannuleerd",
  rescheduled: "Verzet",
};

export const UnassignedAppointments: React.FC<UnassignedAppointmentsProps> = ({
  date,
  appointments,
  onDragStart,
  onDrop
}) => {
  const unassignedAppointments = appointments.filter(app => 
    app.date === date && !app.teamId
  );

  const getLeadInfo = (leadId: string) => {
    return mockLeads.find(lead => lead.id === leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <Card 
      className="border-dashed border-orange-300 bg-orange-50"
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-orange-500" />
          Niet toegewezen afspraken
          <Badge variant="outline" className="ml-2">
            {unassignedAppointments.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {unassignedAppointments.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p>Alle afspraken zijn toegewezen aan teams</p>
          </div>
        ) : (
          <div className="space-y-2">
            {unassignedAppointments.map((appointment) => {
              const leadInfo = getLeadInfo(appointment.leadId);
              
              return (
                <div 
                  key={appointment.id}
                  className="p-2 bg-white rounded-lg border border-orange-200 shadow-sm cursor-move hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={(e) => onDragStart(e, appointment)}
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="h-3.5 w-3.5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <p className="font-medium text-sm truncate">{appointment.title}</p>
                        <Badge variant={appointment.teamType === "sales" ? "default" : "secondary"} className="text-xs flex-shrink-0">
                          {appointment.teamType === "sales" ? "Verkoop" : "Installatie"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="truncate">{appointment.startTime} - {appointment.endTime}</span>
                        </div>

                        {leadInfo && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span className="truncate">{leadInfo.name}</span>
                          </div>
                        )}

                        {appointment.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{appointment.location}</span>
                          </div>
                        )}

                        {leadInfo?.phone && (
                          <div className="flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            <span className="truncate">{leadInfo.phone}</span>
                          </div>
                        )}
                      </div>

                      <Badge variant="outline" className="w-fit mt-1 text-xs">
                        {appointmentTypeLabels[appointment.status]}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
