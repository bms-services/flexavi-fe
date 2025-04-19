
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DailyTeamAppointments } from "@/components/appointments/DailyTeamAppointments";
import { mockAppointments } from "@/data/mockData";
import { format } from "date-fns";
import { WorkEnvironment, TeamDetails, TeamType, Appointment } from "@/types";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { AppointmentsHeader } from "@/components/appointments/components/AppointmentsHeader";
import { AppointmentsTabs } from "@/components/appointments/components/AppointmentsTabs";

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

  const [teams, setTeams] = useState<TeamDetails[]>([
    { id: "1", name: "Verkoop Team A", type: "sales" as TeamType, environmentId: "1", color: "#0EA5E9" },
    { id: "2", name: "Verkoop Team B", type: "sales" as TeamType, environmentId: "2", color: "#9b87f5" },
    { id: "3", name: "Uitvoerende Ploeg 1", type: "installation" as TeamType, environmentId: "1", color: "#0EA5E9" },
    { id: "4", name: "Uitvoerende Ploeg 2", type: "installation" as TeamType, environmentId: "3", color: "#7E69AB" },
  ]);

  const [unavailableDates, setUnavailableDates] = useState<Record<string, string[]>>({
    "1": ["2025-04-20", "2025-04-21"],
    "2": ["2025-04-22", "2025-04-23"],
    "3": [],
    "4": ["2025-04-25"],
  });

  const [scheduleSettings, setScheduleSettings] = useState({
    salesMorningSlots: 3,
    salesAfternoonSlots: 3,
    salesEveningSlots: 2,
    installationMorningSlots: 2,
    installationAfternoonSlots: 2,
    installationEveningSlots: 1,
    defaultJobDuration: "medium"
  });

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
    
    const updatedUnavailableDates = { ...unavailableDates };
    delete updatedUnavailableDates[teamId];
    setUnavailableDates(updatedUnavailableDates);
    
    toast({
      title: "Team verwijderd",
      description: "Het team is succesvol verwijderd.",
    });
  };

  const handleTeamNameEdit = (team: TeamDetails) => {
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

  const handleSettingsOpen = () => {
    toast({
      title: "Instellingen",
      description: "Functionaliteit voor instellingen wordt binnenkort beschikbaar.",
    });
  };

  return (
    <Layout>
      <TooltipProvider>
        <div className="container py-6 space-y-6">
          <AppointmentsHeader 
            onNewAppointment={handleNewAppointment}
            onSettingsOpen={handleSettingsOpen}
          />

          {!isDateDetailView ? (
            <AppointmentsTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedDate={selectedDate}
              appointments={appointments}
              teams={teams}
              environments={mockEnvironments}
              scheduleSettings={scheduleSettings}
              unavailableDates={unavailableDates}
              onDateSelect={handleDateSelect}
              onTeamUpdate={handleTeamUpdate}
              onUnavailableDateAdd={handleUnavailableDateAdd}
              onUnavailableDateRemove={handleUnavailableDateRemove}
            />
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
