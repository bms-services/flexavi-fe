
import React, { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs } from "@/components/ui/tabs";
import { SettingsLayout } from "@/components/settings/layout/SettingsLayout";
import { SettingsTabContent } from "@/components/settings/tabs/SettingsTabContent";
import { useAppointmentSettings } from "@/hooks/useAppointmentSettings";
import { getPackage } from "@/actions/packageAction";
import { useAppDispatch } from "@/hooks/use-redux";

const Settings = () => {
  const dispatch = useAppDispatch();
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

  return (
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
  );
};

export default Settings;
