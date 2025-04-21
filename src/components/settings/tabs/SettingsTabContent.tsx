
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { CompanyTabContent } from "./CompanyTabContent";
import { AppointmentsTabContent } from "./AppointmentsTabContent";
import { TeamsTabContent } from "./TeamsTabContent";
import { EmployeesTabContent } from "./EmployeesTabContent";
import { PermissionsSettings } from "../permissions/PermissionsSettings";
import { PersonalInfoSettings } from "../account/PersonalInfoSettings";
import { PasswordSettings } from "../account/PasswordSettings";
import { DefaultAttachmentsSettings } from "../attachments/DefaultAttachmentsSettings";
import { EmailTemplatesSettings } from "../email/EmailTemplatesSettings";
import { SignatureSettings } from "../signature/SignatureSettings";
import { SubscriptionSettings } from "../subscription/SubscriptionSettings";
import { WorkAgreementSettingsForm } from "../workagreements/WorkAgreementSettingsForm";
import { IntegrationsSettings } from "../integrations/IntegrationsSettings";

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
        <PermissionsSettings />
      </TabsContent>
      
      <TabsContent value="account" className="mt-0">
        <PersonalInfoSettings />
        <PasswordSettings />
      </TabsContent>

      <TabsContent value="attachments" className="mt-0">
        <DefaultAttachmentsSettings />
      </TabsContent>

      <TabsContent value="email" className="mt-0">
        <EmailTemplatesSettings />
      </TabsContent>

      <TabsContent value="signature" className="mt-0">
        <SignatureSettings />
      </TabsContent>

      <TabsContent value="subscription" className="mt-0">
        <SubscriptionSettings />
      </TabsContent>

      <TabsContent value="workagreements" className="mt-0">
        <WorkAgreementSettingsForm />
      </TabsContent>

      <TabsContent value="integrations" className="mt-0">
        <IntegrationsSettings />
      </TabsContent>
    </>
  );
};
