
import { useState } from "react";


interface TimeBlock {
  id: number;
  start: string;
  end: string;
  label: string;
}

interface SlotSettings {
  salesMorningSlots: number;
  salesAfternoonSlots: number;
  salesEveningSlots: number;
  installationMorningSlots: number;
  installationAfternoonSlots: number;
  installationEveningSlots: number;
}

interface ColorSettings {
  emptyBorder: string;
  fullBorder: string;
}

export const useAppointmentSettings = () => {
  
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([
    { id: 1, start: "09:00", end: "12:00", label: "Ochtend" },
    { id: 2, start: "13:00", end: "17:00", label: "Middag" },
    { id: 3, start: "18:00", end: "21:00", label: "Avond" },
  ]);

  const [slotSettings, setSlotSettings] = useState<SlotSettings>({
    salesMorningSlots: 3,
    salesAfternoonSlots: 3,
    salesEveningSlots: 2,
    installationMorningSlots: 2,
    installationAfternoonSlots: 2,
    installationEveningSlots: 1,
  });

  const [colors, setColors] = useState<ColorSettings>({
    emptyBorder: "#E5DEFF",
    fullBorder: "#F97316",
  });

  const handleSlotSettingsChange = (newSettings: Record<string, number>) => {
    setSlotSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  const handleSaveSlots = () => {
  
  };

  const handleSaveColors = () => {
    
  };

  return {
    timeBlocks,
    slotSettings,
    colors,
    setTimeBlocks,
    handleSlotSettingsChange,
    handleSaveSlots,
    handleSaveColors,
    setColors,
  };
};
