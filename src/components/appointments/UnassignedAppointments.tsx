
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
      <CardContent>
        {unassignedAppointments.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p>Alle afspraken zijn toegewezen aan teams</p>
          </div>
        ) : (
          <div className="space-y-3">
            {unassignedAppointments.map((appointment) => {
              const leadInfo = getLeadInfo(appointment.leadId);
              
              return (
                <div 
                  key={appointment.id}
                  className="p-3 bg-white rounded-lg border border-orange-200 shadow-sm cursor-move hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={(e) => onDragStart(e, appointment)}
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium">{appointment.title}</h3>
                        <Badge variant={appointment.teamType === "sales" ? "default" : "secondary"}>
                          {appointment.teamType === "sales" ? "Verkoop" : "Installatie"}
                        </Badge>
                      </div>
                      
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="inline mr-1.5 h-3.5 w-3.5" />
                          {appointment.startTime} - {appointment.endTime}
                        </div>

                        {leadInfo && (
                          <>
                            <div className="flex items-center text-muted-foreground">
                              <User className="inline mr-1.5 h-3.5 w-3.5" />
                              {leadInfo.name}
                            </div>
                            {leadInfo.phone && (
                              <div className="flex items-center text-muted-foreground">
                                <Info className="inline mr-1.5 h-3.5 w-3.5" />
                                {leadInfo.phone}
                              </div>
                            )}
                          </>
                        )}

                        {appointment.location && (
                          <div className="flex items-start text-muted-foreground">
                            <MapPin className="inline mr-1.5 h-3.5 w-3.5 mt-0.5" />
                            <span className="flex-1">{appointment.location}</span>
                          </div>
                        )}

                        {appointment.description && (
                          <div className="flex items-start text-muted-foreground">
                            <FileText className="inline mr-1.5 h-3.5 w-3.5 mt-0.5" />
                            <span className="flex-1">
                              {appointment.description.length > 100 
                                ? `${appointment.description.substring(0, 100)}...` 
                                : appointment.description}
                            </span>
                          </div>
                        )}

                        <Badge variant="outline" className="w-fit">
                          {appointmentTypeLabels[appointment.status]}
                        </Badge>
                      </div>
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

