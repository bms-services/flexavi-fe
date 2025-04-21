
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { CompanyTabContent } from "./CompanyTabContent";
import { AppointmentsTabContent } from "./AppointmentsTabContent";
import { TeamsTabContent } from "./TeamsTabContent";
import { EmployeesTabContent } from "./EmployeesTabContent";
import { AttachmentsTabContent } from "./AttachmentsTabContent";
import { EmailTemplatesTabContent } from "./EmailTemplatesTabContent";
import { SignatureTabContent } from "./SignatureTabContent";
import { SubscriptionTabContent } from "./SubscriptionTabContent";
import { WorkAgreementsTabContent } from "./WorkAgreementsTabContent";
import { IntegrationsTabContent } from "./IntegrationsTabContent";
import { AccountTabContent } from "./AccountTabContent";
import { PermissionsTabContent } from "./PermissionsTabContent";

interface SettingsTabContentProps {
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

export const SettingsTabContent: React.FC<SettingsTabContentProps> = ({
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
      <TabsContent value="company" className="mt-0">
        <CompanyTabContent />
      </TabsContent>
      
      <TabsContent value="appointments" className="mt-0">
        <AppointmentsTabContent
          timeBlocks={timeBlocks}
          slotSettings={slotSettings}
          colors={colors}
          onTimeBlocksChange={onTimeBlocksChange}
          onSlotSettingsChange={onSlotSettingsChange}
          onSaveSlots={onSaveSlots}
          onSaveColors={onSaveColors}
          onColorsChange={onColorsChange}
        />
      </TabsContent>
      
      <TabsContent value="teams" className="mt-0">
        <TeamsTabContent />
      </TabsContent>
      
      <TabsContent value="employees" className="mt-0">
        <EmployeesTabContent />
      </TabsContent>
      
      <TabsContent value="permissions" className="mt-0">
        <PermissionsTabContent />
      </TabsContent>
      
      <TabsContent value="account" className="mt-0">
        <AccountTabContent />
      </TabsContent>

      <TabsContent value="attachments" className="mt-0">
        <AttachmentsTabContent />
      </TabsContent>

      <TabsContent value="email" className="mt-0">
        <EmailTemplatesTabContent />
      </TabsContent>

      <TabsContent value="signature" className="mt-0">
        <SignatureTabContent />
      </TabsContent>

      <TabsContent value="subscription" className="mt-0">
        <SubscriptionTabContent />
      </TabsContent>

      <TabsContent value="workagreements" className="mt-0">
        <WorkAgreementsTabContent />
      </TabsContent>

      <TabsContent value="integrations" className="mt-0">
        <IntegrationsTabContent />
      </TabsContent>
    </>
  );
};
