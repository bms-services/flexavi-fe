
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { SettingsLayout } from "@/components/settings/layout/SettingsLayout";
import { SettingsTabContent } from "@/components/settings/tabs/SettingsTabContent";

const Settings = () => {
  const { toast } = useToast();
  const [timeBlocks, setTimeBlocks] = useState([
    { id: 1, start: "09:00", end: "12:00", label: "Ochtend" },
    { id: 2, start: "13:00", end: "17:00", label: "Middag" },
    { id: 3, start: "18:00", end: "21:00", label: "Avond" },
  ]);

  const [slotSettings, setSlotSettings] = useState({
    salesMorningSlots: 3,
    salesAfternoonSlots: 3,
    salesEveningSlots: 2,
    installationMorningSlots: 2,
    installationAfternoonSlots: 2,
    installationEveningSlots: 1,
  });

  const [colors, setColors] = useState({
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
    toast({
      title: "Instellingen opgeslagen",
      description: "De slot instellingen zijn succesvol bijgewerkt.",
    });
  };

  const handleSaveColors = () => {
    toast({
      title: "Kleuren opgeslagen",
      description: "De kleurinstellingen zijn succesvol bijgewerkt.",
    });
  };

  return (
    <Layout>
      <Tabs defaultValue="company" orientation="vertical" className="flex min-h-full">
        <SettingsLayout>
          <SettingsTabContent
            timeBlocks={timeBlocks}
            slotSettings={slotSettings}
            colors={colors}
            onTimeBlocksChange={setTimeBlocks}
            onSlotSettingsChange={handleSlotSettingsChange}
            onSaveSlots={handleSaveSlots}
            onSaveColors={handleSaveColors}
            onColorsChange={setColors}
          />
        </SettingsLayout>
      </Tabs>
    </Layout>
  );
};

export default Settings;
