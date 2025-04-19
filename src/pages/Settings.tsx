
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
import { CreditCard } from "lucide-react";

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
      <div className="container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instellingen</h1>
          <p className="text-muted-foreground">
            Beheer je account- en applicatie-instellingen.
          </p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="bg-background border-b w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger value="company" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Bedrijf
            </TabsTrigger>
            <TabsTrigger value="appointments" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Agenda
            </TabsTrigger>
            <TabsTrigger value="teams" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Teams
            </TabsTrigger>
            <TabsTrigger value="account" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Account
            </TabsTrigger>
            <TabsTrigger value="attachments" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Standaard bijlagen
            </TabsTrigger>
            <TabsTrigger value="email" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Email templates
            </TabsTrigger>
            <TabsTrigger value="signature" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Handtekening
            </TabsTrigger>
            <TabsTrigger value="subscription" className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Betaling/abonnement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <CompanySettings />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
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

          <TabsContent value="teams" className="space-y-6">
            <TeamSettings />
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <PersonalInfoSettings />
            <PasswordSettings />
          </TabsContent>

          <TabsContent value="attachments" className="space-y-6">
            <DefaultAttachmentsSettings />
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <EmailTemplatesSettings />
          </TabsContent>

          <TabsContent value="signature" className="space-y-6">
            <SignatureSettings />
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <SubscriptionSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
