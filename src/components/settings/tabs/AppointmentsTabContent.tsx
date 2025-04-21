
import React from "react";
import { TimeBlockSettings } from "../appointments/TimeBlockSettings";
import { CalendarColorSettings } from "../appointments/CalendarColorSettings";

interface AppointmentsTabContentProps {
  timeBlocks: Array<{ id: number; start: string; end: string; label: string }>;
  slotSettings: {
    salesMorningSlots: number;
    salesAfternoonSlots: number;
    salesEveningSlots: number;
    installationMorningSlots: number;
    installationAfternoonSlots: number;
    installationEveningSlots: number;
  };
  colors: {
    emptyBorder: string;
    fullBorder: string;
  };
  onTimeBlocksChange: (blocks: Array<{ id: number; start: string; end: string; label: string }>) => void;
  onSlotSettingsChange: (settings: Record<string, number>) => void;
  onSaveSlots: () => void;
  onSaveColors: () => void;
  onColorsChange: (colors: { emptyBorder: string; fullBorder: string }) => void;
}

export const AppointmentsTabContent: React.FC<AppointmentsTabContentProps> = ({
  timeBlocks,
  slotSettings,
  colors,
  onTimeBlocksChange,
  onSlotSettingsChange,
  onSaveSlots,
  onSaveColors,
  onColorsChange,
}) => {
  return (
    <>
      <TimeBlockSettings
        timeBlocks={timeBlocks}
        slotSettings={slotSettings}
        onTimeBlocksChange={onTimeBlocksChange}
        onSlotSettingsChange={onSlotSettingsChange}
        onSave={onSaveSlots}
      />
      <CalendarColorSettings
        colors={colors}
        onColorsChange={onColorsChange}
        onSave={onSaveColors}
      />
    </>
  );
};
