
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";
import { DailyAppointments } from "@/components/appointments/DailyAppointments";
import { TeamAvailabilityOverview } from "@/components/appointments/TeamAvailabilityOverview";
import { Button } from "@/components/ui/button";
import { PlusCircle, CalendarDays, Settings } from "lucide-react";
import { mockAppointments } from "@/data/mockData";
import { format } from "date-fns";
import { WorkEnvironment, TeamDetails, TeamType } from "@/types";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TeamAvailabilitySettings } from "@/components/appointments/TeamAvailabilitySettings";

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

  const appointmentsForSelectedDate = mockAppointments.filter(
    (a) => a.date === selectedDate
  );

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
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
    // Open a dialog or another UI for editing
    toast({
      title: "Team bewerken",
      description: `Je kunt het team "${team.name}" bewerken in de instellingen.`,
    });
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    <Settings className="mr-2 h-4 w-4" />
                    Planning Instellingen
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Planning Instellingen</DialogTitle>
                    <DialogDescription>
                      Beheer de planning instellingen, teams en beschikbaarheid.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <TeamAvailabilitySettings 
                    teams={teams}
                    environments={mockEnvironments}
                    unavailableDates={unavailableDates}
                    onTeamUpdate={handleTeamUpdate}
                    onUnavailableDateAdd={handleUnavailableDateAdd}
                    onUnavailableDateRemove={handleUnavailableDateRemove}
                    onTeamDelete={handleTeamDelete}
                    onSlotUpdate={handleSlotUpdate}
                    slotsConfiguration={scheduleSettings}
                  />
                </DialogContent>
              </Dialog>
              
              <Button className="bg-primary hover:bg-primary/90" onClick={handleNewAppointment}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nieuwe Afspraak
              </Button>
            </div>
          </div>

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
                appointments={mockAppointments}
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
                  appointments={mockAppointments}
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
        </div>
      </TooltipProvider>
    </Layout>
  );
};

export default Appointments;
