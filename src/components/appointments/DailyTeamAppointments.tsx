import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Appointment, TeamDetails } from "@/types";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { 
  Clock, MapPin, User, Calendar, FileText, ChevronLeft, 
  Route, Truck, AlertTriangle, ArrowLeft, Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UnassignedAppointments } from "./UnassignedAppointments";
import { useToast } from "@/hooks/use-toast";

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
  
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "EEEE d MMMM yyyy", { locale: nl });
  };
  
  const appointmentsForDate = appointments.filter(app => app.date === date);
  
  const handleDragStart = (e: React.DragEvent, appointment: Appointment) => {
    e.dataTransfer.setData("appointmentId", appointment.id);
    e.dataTransfer.effectAllowed = "move";
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
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
    // In a real application, this would call an API to optimize routes
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
    // In a real application, this would generate a PDF
    setTimeout(() => {
      setGeneratingPdf(null);
      toast({
        title: "Werklijst gegenereerd",
        description: `De werklijst voor ${teamName} is gegenereerd en kan worden gedownload.`,
      });
    }, 1500);
  };
  
  const autoAssignAppointments = () => {
    // In a real application, this would use AI to assign appointments
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
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBackToOverview}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Terug naar overzicht
          </Button>
          <h2 className="text-2xl font-bold">
            Afspraken voor {formatDate(date)}
          </h2>
          <p className="text-muted-foreground">
            Beheer en wijs afspraken toe aan teams
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={autoAssignAppointments}>
            <Check className="h-4 w-4 mr-1.5" />
            AI Toewijzing
          </Button>
          <Button 
            variant="outline" 
            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-800"
            onClick={optimizeRoutes}
            disabled={optimizingRoute}
          >
            {optimizingRoute ? (
              <>Optimaliseren...</>
            ) : (
              <>
                <Route className="h-4 w-4 mr-1.5" />
                Routes Optimaliseren
              </>
            )}
          </Button>
        </div>
      </div>
      
      <UnassignedAppointments 
        date={date}
        appointments={appointmentsForDate}
        onDragStart={handleDragStart}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map(team => {
          const teamAppointments = appointmentsForDate.filter(app => app.teamId === team.id);
          
          return (
            <Card 
              key={team.id}
              className="overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, team.id)}
            >
              <CardHeader 
                className={cn(
                  "pb-3",
                  team.type === "sales" ? "bg-blue-50" : "bg-green-50"
                )}
              >
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
                    onClick={() => generateWorklistPdf(team.id, team.name)}
                    disabled={generatingPdf === team.id}
                  >
                    {generatingPdf === team.id ? (
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
                {teamAppointments.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                    <AlertTriangle className="h-5 w-5 mx-auto mb-2 text-amber-500" />
                    <p>Geen afspraken toegewezen aan dit team</p>
                    <p className="text-xs mt-1">Sleep afspraken hierheen om toe te wijzen</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teamAppointments.map((appointment) => (
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
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
