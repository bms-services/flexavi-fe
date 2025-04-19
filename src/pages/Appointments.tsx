
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";
import { DailyAppointments } from "@/components/appointments/DailyAppointments";
import { TeamAvailabilityOverview } from "@/components/appointments/TeamAvailabilityOverview";
import { DailyTeamAppointments } from "@/components/appointments/DailyTeamAppointments";
import { Button } from "@/components/ui/button";
import { PlusCircle, CalendarDays, Settings, FileText } from "lucide-react";
import { mockAppointments } from "@/data/mockData";
import { format } from "date-fns";
import { WorkEnvironment, TeamDetails, TeamType, Appointment } from "@/types";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// Voorbeeld data voor teams en werkgebieden
const mockEnvironments: WorkEnvironment[] = [
  { id: "1", name: "Rotterdam", region: "Zuid-Holland", color: "#0EA5E9" },
  { id: "2", name: "Amsterdam", region: "Noord-Holland", color: "#9b87f5" },
  { id: "3", name: "Utrecht", region: "Utrecht", color: "#7E69AB" },
];

const Appointments = () => {
  const { toast } = useToast();
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);
  const [activeTab, setActiveTab] = useState("planning");
  const [isDateDetailView, setIsDateDetailView] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  // Team state with useState hook
  const [teams, setTeams] = useState<TeamDetails[]>([
    { id: "1", name: "Verkoop Team A", type: "sales" as TeamType, environmentId: "1", color: "#0EA5E9" },
    { id: "2", name: "Verkoop Team B", type: "sales" as TeamType, environmentId: "2", color: "#9b87f5" },
    { id: "3", name: "Uitvoerende Ploeg 1", type: "installation" as TeamType, environmentId: "1", color: "#0EA5E9" },
    { id: "4", name: "Uitvoerende Ploeg 2", type: "installation" as TeamType, environmentId: "3", color: "#7E69AB" },
  ]);

  // Unavailable dates state
  const [unavailableDates, setUnavailableDates] = useState<Record<string, string[]>>({
    "1": ["2025-04-20", "2025-04-21"],
    "2": ["2025-04-22", "2025-04-23"],
    "3": [],
    "4": ["2025-04-25"],
  });

  // Schedule settings state
  const [scheduleSettings, setScheduleSettings] = useState({
    salesMorningSlots: 3,
    salesAfternoonSlots: 3,
    salesEveningSlots: 2,
    installationMorningSlots: 2,
    installationAfternoonSlots: 2,
    installationEveningSlots: 1,
    defaultJobDuration: "medium"
  });

  const appointmentsForSelectedDate = appointments.filter(
    (a) => a.date === selectedDate
  );

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsDateDetailView(true);
    setActiveTab("daily");
  };

  const handleNewAppointment = () => {
    toast({
      title: "Nieuwe afspraak",
      description: "Functionaliteit voor het toevoegen van een nieuwe afspraak komt binnenkort beschikbaar.",
    });
  };

  const handleTeamUpdate = (updatedTeam: TeamDetails) => {
    setTeams(teams.map(team => 
      team.id === updatedTeam.id ? updatedTeam : team
    ));
  };

  const handleUnavailableDateAdd = (teamId: string, date: string) => {
    setUnavailableDates(prev => ({
      ...prev,
      [teamId]: [...(prev[teamId] || []), date]
    }));
  };

  const handleUnavailableDateRemove = (teamId: string, date: string) => {
    setUnavailableDates(prev => ({
      ...prev,
      [teamId]: prev[teamId].filter(d => d !== date)
    }));
  };

  const handleTeamDelete = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
    
    // Also clean up unavailable dates for this team
    const updatedUnavailableDates = { ...unavailableDates };
    delete updatedUnavailableDates[teamId];
    setUnavailableDates(updatedUnavailableDates);
    
    toast({
      title: "Team verwijderd",
      description: "Het team is succesvol verwijderd.",
    });
  };

  const handleSlotUpdate = (timeOfDay: string, teamType: string, value: number) => {
    const settingsKey = `${teamType}${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}Slots`;
    setScheduleSettings({
      ...scheduleSettings,
      [settingsKey]: value
    });
    
    toast({
      title: "Instellingen bijgewerkt",
      description: `Aantal slots voor ${teamType} ${timeOfDay} is bijgewerkt naar ${value}.`,
    });
  };

  const handleTeamNameEdit = (team: TeamDetails) => {
    // Prompt for new name (in a real app, use a modal)
    const newName = prompt("Voer een nieuwe naam in voor het team:", team.name);
    if (newName && newName.trim() && newName !== team.name) {
      const updatedTeam = { ...team, name: newName.trim() };
      handleTeamUpdate(updatedTeam);
      toast({
        title: "Team naam bijgewerkt",
        description: `Team naam is bijgewerkt naar "${newName}".`,
      });
    }
  };

  const handleAppointmentAssign = (appointmentId: string, teamId: string) => {
    setAppointments(appointments.map(app => 
      app.id === appointmentId ? { ...app, teamId } : app
    ));
  };

  const handleBackToOverview = () => {
    setIsDateDetailView(false);
  };

  return (
    <Layout>
      <TooltipProvider>
        <div className="container py-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Afspraken</h1>
              <p className="text-muted-foreground">
                Planning & beschikbaarheid overzicht
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary/90" onClick={handleNewAppointment}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nieuwe Afspraak
              </Button>
            </div>
          </div>

          {!isDateDetailView ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="planning" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Planningsoverzicht</span>
                </TabsTrigger>
                <TabsTrigger value="daily" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Dagplanning</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="planning" className="space-y-6">
                <TeamAvailabilityOverview
                  startDate={selectedDate}
                  appointments={appointments}
                  teams={teams}
                  environments={mockEnvironments}
                  scheduleSettings={scheduleSettings}
                  unavailableDates={unavailableDates}
                  onTeamUpdate={handleTeamUpdate}
                  onUnavailableDateAdd={handleUnavailableDateAdd}
                  onUnavailableDateRemove={handleUnavailableDateRemove}
                />
              </TabsContent>
              
              <TabsContent value="daily" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <AppointmentCalendar
                    appointments={appointments}
                    onDateSelect={handleDateSelect}
                    selectedDate={selectedDate}
                  />
                  <DailyAppointments
                    date={selectedDate}
                    appointments={appointmentsForSelectedDate}
                  />
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <DailyTeamAppointments
              date={selectedDate}
              appointments={appointments}
              teams={teams}
              onBackToOverview={handleBackToOverview}
              onAppointmentAssign={handleAppointmentAssign}
            />
          )}
        </div>
      </TooltipProvider>
    </Layout>
  );
};

export default Appointments;
