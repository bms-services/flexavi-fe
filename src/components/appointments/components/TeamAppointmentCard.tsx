
import React from "react";
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
}

export const TeamAppointmentCard: React.FC<TeamAppointmentCardProps> = ({
  team,
  appointments,
  onGeneratePdf,
  isGeneratingPdf,
  onDrop,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <Card 
      className="overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop(e, team.id)}
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
        {appointments.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
            <AlertTriangle className="h-5 w-5 mx-auto mb-2 text-amber-500" />
            <p>Geen afspraken toegewezen aan dit team</p>
            <p className="text-xs mt-1">Sleep afspraken hierheen om toe te wijzen</p>
          </div>
        ) : (
          <TeamAppointmentList appointments={appointments} />
        )}
      </CardContent>
    </Card>
  );
};
