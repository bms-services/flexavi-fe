
import React from "react";
import { TeamAvailabilityOverview } from "../TeamAvailabilityOverview";
import { AppointmentCalendar } from "../AppointmentCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Appointment, TeamDetails, WorkEnvironment } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppointmentsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
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
  onAppointmentAssign: (appointmentId: string, teamId: string) => void;
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
  onAppointmentAssign,
}) => {
  const isMobile = useIsMobile();
  const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");

  return (
    <Tabs defaultValue="planning" className="space-y-6">
      <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'w-[400px] grid-cols-3'}`}>
        <TabsTrigger value="planning">Team Planning</TabsTrigger>
        <TabsTrigger value="calendar">Agenda</TabsTrigger>
        {!isMobile && <TabsTrigger value="routeplanning">Route Planning</TabsTrigger>}
      </TabsList>
      
      <TabsContent value="planning" className="space-y-6">
        <TeamAvailabilityOverview
          startDate={formattedDate}
          appointments={appointments}
          teams={teams}
          environments={environments}
          scheduleSettings={scheduleSettings}
          unavailableDates={unavailableDates}
          onTeamUpdate={onTeamUpdate}
          onUnavailableDateAdd={onUnavailableDateAdd}
          onUnavailableDateRemove={onUnavailableDateRemove}
          onDateClick={onDateSelect}
        />
      </TabsContent>
      
      <TabsContent value="calendar">
        <AppointmentCalendar
          selectedDate={selectedDate}
          appointments={appointments}
          teams={teams}
          onDateSelect={onDateSelect}
          onAppointmentAssign={onAppointmentAssign}
          isMobile={isMobile}
        />
      </TabsContent>
      
      {!isMobile && (
        <TabsContent value="routeplanning">
          <div className="rounded-lg border p-8 text-center">
            <h3 className="text-lg font-medium mb-2">Route Planning</h3>
            <p className="text-muted-foreground">
              Functionaliteit voor route planning komt binnenkort beschikbaar.
            </p>
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
};
