
import React from "react";
import { Appointment } from "@/types";
import { Clock, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamAppointmentListProps {
  appointments: Appointment[];
}

export const TeamAppointmentList: React.FC<TeamAppointmentListProps> = ({
  appointments
}) => {
  const sortedAppointments = [...appointments].sort((a, b) => 
    a.startTime.localeCompare(b.startTime)
  );

  return (
    <div className="space-y-2">
      {sortedAppointments.map((appointment) => (
        <div 
          key={appointment.id}
          className={cn(
            "p-2 rounded-md border",
            appointment.teamType === "sales" 
              ? "bg-blue-50 border-blue-200" 
              : "bg-green-50 border-green-200"
          )}
        >
          <div className="font-medium text-sm mb-1">{appointment.title}</div>
          <div className="grid grid-cols-1 text-xs gap-1 text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1.5" />
              {appointment.startTime} - {appointment.endTime}
            </div>
            {appointment.location && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1.5" />
                {appointment.location}
              </div>
            )}
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1.5" />
              Lead: {appointment.leadId}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
