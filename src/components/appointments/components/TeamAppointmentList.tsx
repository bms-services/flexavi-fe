
import React from "react";
import { Appointment } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";

interface TeamAppointmentListProps {
  appointments: Appointment[];
}

export const TeamAppointmentList: React.FC<TeamAppointmentListProps> = ({ appointments }) => {
  return (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <div 
          key={appointment.id}
          className="p-3 bg-white rounded-lg border shadow-sm" 
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{appointment.title}</h3>
            <Badge variant={appointment.teamType === "sales" ? "default" : "secondary"}>
              {appointment.teamType === "sales" ? "Verkoop" : "Installatie"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-3 text-sm">
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
        </div>
      ))}
    </div>
  );
};
