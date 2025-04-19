
import React, { useState } from "react";
import { Appointment, TeamDetails } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { AppointmentHeader } from "./components/AppointmentHeader";
import { TeamAppointmentCard } from "./components/TeamAppointmentCard";
import { UnassignedAppointments } from "./UnassignedAppointments";

interface DailyTeamAppointmentsProps {
  date: string;
  appointments: Appointment[];
  teams: TeamDetails[];
  onBackToOverview: () => void;
  onAppointmentAssign: (appointmentId: string, teamId: string) => void;
}

export const DailyTeamAppointments: React.FC<DailyTeamAppointmentsProps> = ({
  date,
  appointments,
  teams,
  onBackToOverview,
  onAppointmentAssign
}) => {
  const { toast } = useToast();
  const [optimizingRoute, setOptimizingRoute] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState<string | null>(null);
  
  const handleDragStart = (e: React.DragEvent, appointment: Appointment) => {
    e.dataTransfer.setData("appointmentId", appointment.id);
    e.dataTransfer.effectAllowed = "move";
  };
  
  const handleDrop = (e: React.DragEvent, teamId: string) => {
    e.preventDefault();
    const appointmentId = e.dataTransfer.getData("appointmentId");
    if (appointmentId) {
      onAppointmentAssign(appointmentId, teamId);
      toast({
        title: "Afspraak toegewezen",
        description: "De afspraak is succesvol toegewezen aan het team.",
      });
    }
  };
  
  const optimizeRoutes = () => {
    setOptimizingRoute(true);
    setTimeout(() => {
      setOptimizingRoute(false);
      toast({
        title: "Routes geoptimaliseerd",
        description: "De routes zijn geoptimaliseerd voor alle teams.",
      });
    }, 2000);
  };
  
  const generateWorklistPdf = (teamId: string, teamName: string) => {
    setGeneratingPdf(teamId);
    setTimeout(() => {
      setGeneratingPdf(null);
      toast({
        title: "Werklijst gegenereerd",
        description: `De werklijst voor ${teamName} is gegenereerd en kan worden gedownload.`,
      });
    }, 1500);
  };
  
  const autoAssignAppointments = () => {
    toast({
      title: "Auto-toewijzing gestart",
      description: "AI verdeelt de afspraken over de beschikbare teams...",
    });
    
    setTimeout(() => {
      toast({
        title: "Afspraken toegewezen",
        description: "AI heeft de afspraken over de teams verdeeld op basis van locatie en werklast.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <AppointmentHeader
        date={date}
        onBackToOverview={onBackToOverview}
        onOptimizeRoutes={optimizeRoutes}
        onAutoAssign={autoAssignAppointments}
        isOptimizingRoute={optimizingRoute}
      />
      
      <UnassignedAppointments 
        date={date}
        appointments={appointments}
        onDragStart={handleDragStart}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map(team => {
          const teamAppointments = appointments.filter(app => app.teamId === team.id);
          return (
            <TeamAppointmentCard
              key={team.id}
              team={team}
              appointments={teamAppointments}
              onGeneratePdf={generateWorklistPdf}
              isGeneratingPdf={generatingPdf === team.id}
              onDrop={handleDrop}
            />
          );
        })}
      </div>
    </div>
  );
};
