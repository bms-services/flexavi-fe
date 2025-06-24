
import { Tabs } from "@/components/ui/tabs";
import { SettingsLayout } from "@/components/settings/layout/SettingsLayout";
import { SettingsTabContent } from "@/components/settings/tabs/SettingsTabContent";

const Settings = () => {
  return (
    <Tabs defaultValue="company" orientation="vertical" className="flex min-h-full">
      <SettingsLayout>
        <SettingsTabContent />
      </SettingsLayout>
    </Tabs>
  );
};

export default Settings;
