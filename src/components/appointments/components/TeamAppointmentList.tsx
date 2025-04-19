
import React from "react";
import { Appointment } from "@/types";
import { Clock, MapPin, User, GripVertical, FileText, CalendarClock, Info } from "lucide-react";
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
    <div className="space-y-3">
      {sortedAppointments.map((appointment) => {
        const leadInfo = getLeadInfo(appointment.leadId);
        
        return (
          <div 
            key={appointment.id}
            className={cn(
              "p-3 rounded-lg border shadow-sm",
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
                <GripVertical className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              )}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm">{appointment.title}</h3>
                  <Badge variant="secondary" className="flex-shrink-0">
                    {appointmentTypeLabels[appointment.status]}
                  </Badge>
                </div>

                <div className="grid gap-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    {appointment.startTime} - {appointment.endTime}
                  </div>

                  {leadInfo && (
                    <>
                      <div className="flex items-center text-muted-foreground">
                        <User className="h-3.5 w-3.5 mr-1.5" />
                        {leadInfo.name}
                      </div>
                      {leadInfo.phone && (
                        <div className="flex items-center text-muted-foreground">
                          <Info className="h-3.5 w-3.5 mr-1.5" />
                          {leadInfo.phone}
                        </div>
                      )}
                    </>
                  )}

                  {appointment.location && (
                    <div className="flex items-start text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5" />
                      <span className="flex-1">{appointment.location}</span>
                    </div>
                  )}

                  {appointment.description && (
                    <div className="flex items-start text-muted-foreground">
                      <FileText className="h-3.5 w-3.5 mr-1.5 mt-0.5" />
                      <span className="flex-1">{appointment.description}</span>
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

