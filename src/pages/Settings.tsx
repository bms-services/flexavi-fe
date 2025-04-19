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
import { DefaultAttachmentsSettings } from "@/components/settings/workagreements/DefaultAttachmentsSettings";
import { QuoteAttachmentsSettings } from "@/components/settings/quotes/QuoteAttachmentsSettings";
import { InvoiceAttachmentsSettings } from "@/components/settings/invoices/InvoiceAttachmentsSettings";

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

        <Tabs defaultValue="appointments">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="appointments">Agenda</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="company">Bedrijf</TabsTrigger>
            <TabsTrigger value="workagreements">Werkovereenkomsten</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6 mt-6">
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

          <TabsContent value="teams" className="space-y-6 mt-6">
            <TeamSettings />
          </TabsContent>

          <TabsContent value="account" className="space-y-6 mt-6">
            <PersonalInfoSettings />
            <PasswordSettings />
          </TabsContent>

          <TabsContent value="company" className="space-y-6 mt-6">
            <CompanySettings />
          </TabsContent>

          <TabsContent value="workagreements" className="space-y-6 mt-6">
            <DefaultAttachmentsSettings />
            <QuoteAttachmentsSettings />
            <InvoiceAttachmentsSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
