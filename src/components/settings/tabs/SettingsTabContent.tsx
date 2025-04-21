
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { CompanySettings } from "../company/CompanySettings";
import { DomainSettings } from "../company/DomainSettings";
import { TeamSettings } from "../teams/TeamSettings";
import { EmployeeSettings } from "../employees/EmployeeSettings";
import { PermissionsSettings } from "../permissions/PermissionsSettings";
import { TimeBlockSettings } from "../appointments/TimeBlockSettings";
import { CalendarColorSettings } from "../appointments/CalendarColorSettings";
import { PersonalInfoSettings } from "../account/PersonalInfoSettings";
import { PasswordSettings } from "../account/PasswordSettings";
import { DefaultAttachmentsSettings } from "../attachments/DefaultAttachmentsSettings";
import { EmailTemplatesSettings } from "../email/EmailTemplatesSettings";
import { SignatureSettings } from "../signature/SignatureSettings";
import { SubscriptionSettings } from "../subscription/SubscriptionSettings";
import { WorkAgreementSettingsForm } from "../workagreements/WorkAgreementSettingsForm";
import { IntegrationsSettings } from "../integrations/IntegrationsSettings";

interface SettingsTabContentProps {
  timeBlocks: Array<{ id: number; start: string; end: string; label: string; }>;
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
  onTimeBlocksChange: (blocks: Array<{ id: number; start: string; end: string; label: string; }>) => void;
  onSlotSettingsChange: (settings: Record<string, number>) => void;
  onSaveSlots: () => void;
  onSaveColors: () => void;
  onColorsChange: (colors: { emptyBorder: string; fullBorder: string; }) => void;
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
        <CompanySettings />
        <div className="mt-6">
          <DomainSettings />
        </div>
      </TabsContent>
      
      <TabsContent value="appointments" className="mt-0">
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
      </TabsContent>
      
      <TabsContent value="teams" className="mt-0">
        <TeamSettings />
      </TabsContent>
      
      <TabsContent value="employees" className="mt-0">
        <EmployeeSettings />
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
