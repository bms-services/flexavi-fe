import React, { useState } from "react";
import { Appointment, TeamDetails } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { AppointmentHeader } from "./components/AppointmentHeader";
import { TeamAppointmentCard } from "./components/TeamAppointmentCard";
import { UnassignedAppointments } from "./UnassignedAppointments";
import { optimizeRoutes as optimizeRoutesUtil } from "./utils/route-optimization";

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
  const [localAppointments, setLocalAppointments] = useState<Appointment[]>(appointments);
  
  const handleDragStart = (e: React.DragEvent, appointment: Appointment) => {
    e.dataTransfer.setData("appointmentId", appointment.id);
    e.dataTransfer.effectAllowed = "move";
  };
  
  const handleDrop = (e: React.DragEvent, teamId: string | null = null) => {
    e.preventDefault();
    const appointmentId = e.dataTransfer.getData("appointmentId");
    if (appointmentId) {
      onAppointmentAssign(appointmentId, teamId || "");
      // Update local appointments state
      setLocalAppointments(localAppointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, teamId: teamId || "" } 
          : appointment
      ));
      
      toast({
        title: teamId ? "Afspraak toegewezen" : "Afspraak teruggezet",
        description: teamId 
          ? "De afspraak is succesvol toegewezen aan het team."
          : "De afspraak is teruggezet naar niet toegewezen afspraken.",
      });
    }
  };
  
  const handleOptimizeRoutes = (type: "all" | "assigned" | "unassigned") => {
    setOptimizingRoute(true);
    
    // Show optimization started toast
    toast({
      title: "Routes optimaliseren",
      description: `Bezig met het optimaliseren van routes op basis van ${
        type === "all" ? "alle" : type === "assigned" ? "ingedeelde" : "niet ingedeelde"
      } afspraken.`,
    });
    
    // Simulate processing time
    setTimeout(() => {
      // Apply optimization logic
      const optimizedAppointments = optimizeRoutesUtil(localAppointments, teams, type);
      
      // Update local state
      setLocalAppointments(optimizedAppointments);
      
      // Update parent state by calling onAppointmentAssign for each changed assignment
      optimizedAppointments.forEach(app => {
        const original = appointments.find(a => a.id === app.id);
        if (original && original.teamId !== app.teamId) {
          onAppointmentAssign(app.id, app.teamId || "");
        }
      });
      
      setOptimizingRoute(false);
      
      // Show success toast
      toast({
        title: "Routes geoptimaliseerd",
        description: `De routes zijn geoptimaliseerd op basis van ${
          type === "all" ? "alle" : type === "assigned" ? "ingedeelde" : "niet ingedeelde"
        } afspraken.`,
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
      // Use the optimizeUnassigned function to auto-assign
      const optimizedAppointments = optimizeRoutesUtil(localAppointments, teams, "unassigned");
      
      // Update local state
      setLocalAppointments(optimizedAppointments);
      
      // Update parent state by calling onAppointmentAssign for each changed assignment
      optimizedAppointments.forEach(app => {
        const original = appointments.find(a => a.id === app.id);
        if (original && original.teamId !== app.teamId) {
          onAppointmentAssign(app.id, app.teamId || "");
        }
      });
      
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
        onOptimizeRoutes={handleOptimizeRoutes}
        onAutoAssign={autoAssignAppointments}
        isOptimizingRoute={optimizingRoute}
      />
      
      <UnassignedAppointments 
        date={date}
        appointments={localAppointments}
        onDragStart={handleDragStart}
        onDrop={(e) => handleDrop(e)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map(team => {
          const teamAppointments = localAppointments.filter(app => app.teamId === team.id);
          return (
            <TeamAppointmentCard
              key={team.id}
              team={team}
              appointments={teamAppointments}
              onDragStart={handleDragStart}
              onGeneratePdf={generateWorklistPdf}
              isGeneratingPdf={generatingPdf === team.id}
              onDrop={e => handleDrop(e, team.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
