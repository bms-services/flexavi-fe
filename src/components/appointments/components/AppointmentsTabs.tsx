
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarDays } from "lucide-react";
import { TeamAvailabilityOverview } from "../TeamAvailabilityOverview";
import { AppointmentCalendar } from "../AppointmentCalendar";
import { DailyAppointments } from "../DailyAppointments";
import { Appointment, TeamDetails, WorkEnvironment } from "@/types";

interface AppointmentsTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  selectedDate: string;
  appointments: Appointment[];
  teams: TeamDetails[];
  environments: WorkEnvironment[];
  scheduleSettings: any;
  unavailableDates: Record<string, string[]>;
  onDateSelect: (date: string) => void;
  onTeamUpdate: (team: TeamDetails) => void;
  onUnavailableDateAdd: (teamId: string, date: string) => void;
  onUnavailableDateRemove: (teamId: string, date: string) => void;
}

export const AppointmentsTabs: React.FC<AppointmentsTabsProps> = ({
  activeTab,
  setActiveTab,
  selectedDate,
  appointments,
  teams,
  environments,
  scheduleSettings,
  unavailableDates,
  onDateSelect,
  onTeamUpdate,
  onUnavailableDateAdd,
  onUnavailableDateRemove,
}) => {
  const appointmentsForSelectedDate = appointments.filter(
    (a) => a.date === selectedDate
  );

  return (
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
          environments={environments}
          scheduleSettings={scheduleSettings}
          unavailableDates={unavailableDates}
          onTeamUpdate={onTeamUpdate}
          onUnavailableDateAdd={onUnavailableDateAdd}
          onUnavailableDateRemove={onUnavailableDateRemove}
        />
      </TabsContent>
      
      <TabsContent value="daily" className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <AppointmentCalendar
            appointments={appointments}
            onDateSelect={onDateSelect}
            selectedDate={selectedDate}
          />
          <DailyAppointments
            date={selectedDate}
            appointments={appointmentsForSelectedDate}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};
