
import React, { useState } from "react";
import { TimeBlockSettings } from "../appointments/TimeBlockSettings";
import { CalendarColorSettings } from "../appointments/CalendarColorSettings";
import { useAppointmentSettings } from "@/hooks/useAppointmentSettings";
import { useGetMyAgendaSettings } from "@/zustand/hooks/useSetting";
import { ParamGlobal } from "@/zustand/types/apiT";


export const AppointmentsTabContent: React.FC = () => {
  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
  });

  const getMyAgendaSettingsZ = useGetMyAgendaSettings(params);


  const {
    timeBlocks,
    slotSettings,
    colors,
    setTimeBlocks,
    handleSlotSettingsChange,
    handleSaveSlots,
    handleSaveColors,
    setColors,
  } = useAppointmentSettings();

  const onTimeBlocksChange = (newTimeBlocks: any) => {
    setTimeBlocks(newTimeBlocks);
  };

  const onSlotSettingsChange = (newSettings: any) => {
    handleSlotSettingsChange(newSettings);
  };

  const onSaveSlots = async () => {
    try {
      await handleSaveSlots();
    } catch (error) {
      console.error("Failed to save time blocks:", error);
    }
  };

  const onColorsChange = (newColors: any) => {
    setColors(newColors);
  };

  const onSaveColors = async () => {
    try {
      await handleSaveColors();
    } catch (error) {
      console.error("Failed to save colors:", error);
    }
  };


  return (
    <>
      <TimeBlockSettings
        getMyAgendaSettingsZ={getMyAgendaSettingsZ}
      />
      {/* TODO: Add if backend Ready */}
      <CalendarColorSettings
        colors={colors}
        onColorsChange={onColorsChange}
        onSave={onSaveColors}
      />
    </>
  );
};
