
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TeamDetails, Appointment } from "@/types";
import { TeamAppointmentList } from "./TeamAppointmentList";

interface TeamAppointmentCardProps {
  team: TeamDetails;
  appointments: Appointment[];
  onGeneratePdf: (teamId: string, teamName: string) => void;
  isGeneratingPdf: boolean;
  onDrop: (e: React.DragEvent, teamId: string) => void;
  onDragStart?: (e: React.DragEvent, appointment: Appointment) => void;
}

export const TeamAppointmentCard: React.FC<TeamAppointmentCardProps> = ({
  team,
  appointments,
  onGeneratePdf,
  isGeneratingPdf,
  onDrop,
  onDragStart
}) => {
  const [localAppointments, setLocalAppointments] = useState(appointments);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleReorder = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const appointmentId = e.dataTransfer.getData("appointmentId");
    const draggedAppointment = localAppointments.find(app => app.id === appointmentId);
    
    if (!draggedAppointment || draggedAppointment.teamId !== team.id) {
      onDrop(e, team.id);
      return;
    }

    const updatedAppointments = [...localAppointments];
    const draggedIndex = updatedAppointments.findIndex(app => app.id === appointmentId);
    
    // Remove the dragged item
    updatedAppointments.splice(draggedIndex, 1);
    // Insert it at the new position
    updatedAppointments.splice(dropIndex, 0, draggedAppointment);
    
    setLocalAppointments(updatedAppointments);
  };

  return (
    <Card 
      className="overflow-hidden"
      onDragOver={handleDragOver}
    >
      <CardHeader className={team.type === "sales" ? "bg-blue-50" : "bg-green-50 pb-3"}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: team.color }} 
            />
            {team.name}
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={() => onGeneratePdf(team.id, team.name)}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              "Genereren..."
            ) : (
              <>
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Werklijst PDF
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        {localAppointments.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
            <AlertTriangle className="h-5 w-5 mx-auto mb-2 text-amber-500" />
            <p>Geen afspraken toegewezen aan dit team</p>
            <p className="text-xs mt-1">Sleep afspraken hierheen om toe te wijzen</p>
          </div>
        ) : (
          <TeamAppointmentList 
            appointments={localAppointments} 
            onDragStart={onDragStart}
            onDrop={handleReorder}
          />
        )}
      </CardContent>
    </Card>
  );
};
