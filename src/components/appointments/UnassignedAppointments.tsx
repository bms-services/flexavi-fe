
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment, TeamDetails } from "@/types";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Clock, MapPin, User, Calendar, FileText, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UnassignedAppointmentsProps {
  date: string;
  appointments: Appointment[];
  onDragStart: (e: React.DragEvent, appointment: Appointment) => void;
}

export const UnassignedAppointments: React.FC<UnassignedAppointmentsProps> = ({
  date,
  appointments,
  onDragStart
}) => {
  const unassignedAppointments = appointments.filter(app => 
    app.date === date && !app.teamId
  );

  return (
    <Card className="border-dashed border-orange-300 bg-orange-50">
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
            {unassignedAppointments.map((appointment) => (
              <div 
                key={appointment.id}
                className="p-3 bg-white rounded-lg border border-orange-200 shadow-sm cursor-move hover:shadow-md transition-shadow"
                draggable
                onDragStart={(e) => onDragStart(e, appointment)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    <h3 className="font-medium">{appointment.title}</h3>
                  </div>
                  <Badge variant={appointment.teamType === "sales" ? "default" : "secondary"}>
                    {appointment.teamType === "sales" ? "Verkoop" : "Installatie"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-3 text-sm mb-2">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="inline mr-1.5 h-3.5 w-3.5" />
                    {appointment.startTime} - {appointment.endTime}
                  </div>
                  {appointment.location && (
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="inline mr-1.5 h-3.5 w-3.5" />
                      {appointment.location}
                    </div>
                  )}
                  {appointment.leadId && (
                    <div className="flex items-center text-muted-foreground">
                      <User className="inline mr-1.5 h-3.5 w-3.5" />
                      Lead: {appointment.leadId}
                    </div>
                  )}
                </div>
                
                {appointment.description && (
                  <div className="text-xs text-muted-foreground">
                    <FileText className="inline mr-1.5 h-3.5 w-3.5" />
                    {appointment.description.length > 60 
                      ? `${appointment.description.substring(0, 60)}...` 
                      : appointment.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
