
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";
import { DailyAppointments } from "@/components/appointments/DailyAppointments";
import { TeamAvailabilityOverview } from "@/components/appointments/TeamAvailabilityOverview";
import { Button } from "@/components/ui/button";
import { PlusCircle, CalendarDays, Settings2 } from "lucide-react";
import { mockAppointments } from "@/data/mockData";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { AppointmentSettings, ScheduleSettings } from "@/components/appointments/AppointmentSettings";
import { WorkEnvironment, TeamDetails, TeamType } from "@/types";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";

// Voorbeeld data voor teams en werkgebieden
const mockEnvironments: WorkEnvironment[] = [
  { id: "1", name: "Rotterdam", region: "Zuid-Holland", color: "#0EA5E9" },
  { id: "2", name: "Amsterdam", region: "Noord-Holland", color: "#9b87f5" },
  { id: "3", name: "Utrecht", region: "Utrecht", color: "#7E69AB" },
];

const mockTeams: TeamDetails[] = [
  { id: "1", name: "Verkoop Team A", type: "sales" as TeamType, environmentId: "1", color: "#0EA5E9" },
  { id: "2", name: "Verkoop Team B", type: "sales" as TeamType, environmentId: "2", color: "#9b87f5" },
  { id: "3", name: "Uitvoerende Ploeg 1", type: "installation" as TeamType, environmentId: "1", color: "#0EA5E9" },
  { id: "4", name: "Uitvoerende Ploeg 2", type: "installation" as TeamType, environmentId: "3", color: "#7E69AB" },
];

const Appointments = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);
  const [activeTab, setActiveTab] = useState("planning");

  const [scheduleSettings, setScheduleSettings] = useState<ScheduleSettings>({
    salesMorningSlots: 3,
    salesAfternoonSlots: 3,
    installationMorningSlots: 2,
    installationAfternoonSlots: 2,
    defaultJobDuration: "medium"
  });

  const appointmentsForSelectedDate = mockAppointments.filter(
    (a) => a.date === selectedDate
  );

  const handleSettingsChange = (newSettings: ScheduleSettings) => {
    setScheduleSettings(newSettings);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setActiveTab("daily");
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
              <AppointmentSettings 
                settings={scheduleSettings} 
                onSettingsChange={handleSettingsChange} 
              />
              <Button className="bg-primary hover:bg-primary/90">
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
                teams={mockTeams}
                environments={mockEnvironments}
                scheduleSettings={scheduleSettings}
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
