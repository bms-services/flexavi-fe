
import React from "react";
import { TimeBlockSettings } from "../appointments/TimeBlockSettings";
import { CalendarColorSettings } from "../appointments/CalendarColorSettings";
import { useGetMyAgendaSettings } from "@/zustand/hooks/useSetting";


export const AppointmentsTabContent: React.FC = () => {
  const getMyAgendaSettingsZ = useGetMyAgendaSettings({
    page: 1,
    per_page: 10,
    search: "",
  });

  return (
    <div className="space-y-6">
      <TimeBlockSettings
        getMyAgendaSettingsZ={getMyAgendaSettingsZ}
      />
      <CalendarColorSettings />
    </div>
  );
};
