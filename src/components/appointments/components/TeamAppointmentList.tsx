
import React from "react";
import { Appointment } from "@/types";
import { Clock, MapPin, User, GripVertical, Info, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { mockLeads } from "@/data/mockData";

interface TeamAppointmentListProps {
  appointments: Appointment[];
  onDragStart?: (e: React.DragEvent, appointment: Appointment) => void;
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

export const TeamAppointmentList: React.FC<TeamAppointmentListProps> = ({
  appointments,
  onDragStart
}) => {
  const sortedAppointments = [...appointments].sort((a, b) => 
    a.startTime.localeCompare(b.startTime)
  );

  const getLeadInfo = (leadId: string) => {
    return mockLeads.find(lead => lead.id === leadId);
  };

  return (
    <div className="space-y-2">
      {sortedAppointments.map((appointment) => {
        const leadInfo = getLeadInfo(appointment.leadId);
        
        return (
          <div 
            key={appointment.id}
            className={cn(
              "p-2 rounded-lg border shadow-sm",
              appointment.teamType === "sales" 
                ? "bg-blue-50 border-blue-200" 
                : "bg-green-50 border-green-200",
              onDragStart ? "cursor-move hover:shadow-md transition-shadow" : ""
            )}
            draggable={!!onDragStart}
            onDragStart={(e) => onDragStart && onDragStart(e, appointment)}
          >
            <div className="flex items-start gap-2">
              {onDragStart && (
                <GripVertical className="h-3.5 w-3.5 text-muted-foreground mt-1 flex-shrink-0 cursor-move" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className="font-medium text-sm truncate">{appointment.title}</p>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {appointmentTypeLabels[appointment.status]}
                  </Badge>
                </div>

                {appointment.description && (
                  <div className="flex items-start gap-1 mb-1.5 text-xs text-muted-foreground">
                    <FileText className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <p className="line-clamp-2">{appointment.description}</p>
                  </div>
                )}

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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
