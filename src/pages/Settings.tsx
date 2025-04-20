import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeBlockSettings } from "@/components/settings/appointments/TimeBlockSettings";
import { CalendarColorSettings } from "@/components/settings/appointments/CalendarColorSettings";
import { TeamSettings } from "@/components/settings/teams/TeamSettings";
import { PersonalInfoSettings } from "@/components/settings/account/PersonalInfoSettings";
import { PasswordSettings } from "@/components/settings/account/PasswordSettings";
import { CompanySettings } from "@/components/settings/company/CompanySettings";
import { useToast } from "@/hooks/use-toast";
import { DefaultAttachmentsSettings } from "@/components/settings/attachments/DefaultAttachmentsSettings";
import { EmailTemplatesSettings } from "@/components/settings/email/EmailTemplatesSettings";
import { SignatureSettings } from "@/components/settings/signature/SignatureSettings";
import { SubscriptionSettings } from "@/components/settings/subscription/SubscriptionSettings";
import { PermissionsSettings } from "@/components/settings/permissions/PermissionsSettings";
import { Building2, Calendar, Users2, User, Paperclip, Mail, Pen, CreditCard, Shield } from "lucide-react";
import { EmployeeSettings } from "@/components/settings/employees/EmployeeSettings";

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
      <div className="container py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instellingen</h1>
          <p className="text-muted-foreground">
            Beheer je account- en applicatie-instellingen.
          </p>
        </div>

        <div className="flex mt-6 min-h-[calc(100vh-10rem)]">
          <Tabs defaultValue="company" orientation="vertical" className="flex min-h-full">
            <div className="shrink-0">
              <TabsList className="flex flex-col h-auto space-y-1 min-w-[200px] bg-muted p-2 rounded-l-md">
                <TabsTrigger value="company" className="w-full justify-start">
                  <Building2 className="h-4 w-4 mr-2" />
                  Bedrijf
                </TabsTrigger>
                <TabsTrigger value="appointments" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agenda
                </TabsTrigger>
                <TabsTrigger value="teams" className="w-full justify-start">
                  <Users2 className="h-4 w-4 mr-2" />
                  Teams
                </TabsTrigger>
                <TabsTrigger value="employees" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Medewerkers
                </TabsTrigger>
                <TabsTrigger value="permissions" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Rechten
                </TabsTrigger>
                <TabsTrigger value="account" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="attachments" className="w-full justify-start">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Standaard bijlagen
                </TabsTrigger>
                <TabsTrigger value="email" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email templates
                </TabsTrigger>
                <TabsTrigger value="signature" className="w-full justify-start">
                  <Pen className="h-4 w-4 mr-2" />
                  Handtekening
                </TabsTrigger>
                <TabsTrigger value="subscription" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Betaling/abonnement
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 border-l bg-background ml-4 pl-6">
              <TabsContent value="company" className="mt-0">
                <CompanySettings />
              </TabsContent>
              
              <TabsContent value="appointments" className="mt-0">
                <TimeBlockSettings
                  timeBlocks={timeBlocks}
                  slotSettings={slotSettings}
                  onTimeBlocksChange={setTimeBlocks}
                  onSlotSettingsChange={handleSlotSettingsChange}
                  onSave={handleSaveSlots}
                />
                <CalendarColorSettings
                  colors={colors}
                  onColorsChange={setColors}
                  onSave={handleSaveColors}
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
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
