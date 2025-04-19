
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Settings, Users, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CapacityTab } from "./settings/CapacityTab";
import { TeamManagement } from "./settings/TeamManagement";
import { AvailabilityManagement } from "./settings/AvailabilityManagement";

const settingsSchema = z.object({
  salesMorningSlots: z.coerce.number().min(0).max(20),
  salesAfternoonSlots: z.coerce.number().min(0).max(20),
  salesEveningSlots: z.coerce.number().min(0).max(20),
  installationMorningSlots: z.coerce.number().min(0).max(20),
  installationAfternoonSlots: z.coerce.number().min(0).max(20),
  installationEveningSlots: z.coerce.number().min(0).max(20),
  defaultJobDuration: z.enum(["small", "medium", "large"]),
});

export type ScheduleSettings = z.infer<typeof settingsSchema>;

interface AppointmentSettingsProps {
  settings: ScheduleSettings;
  onSettingsChange: (settings: ScheduleSettings) => void;
}

export const AppointmentSettings: React.FC<AppointmentSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const { toast } = useToast();

  const handleSubmit = (data: ScheduleSettings) => {
    onSettingsChange(data);
    toast({
      title: "Instellingen bijgewerkt",
      description: "De planning instellingen zijn succesvol bijgewerkt.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white">
          <Settings className="mr-2 h-4 w-4" />
          Planning Instellingen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Afspraken Planning Instellingen</DialogTitle>
          <DialogDescription>
            Beheer de planning instellingen, teams en beschikbaarheid.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="capaciteit" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="capaciteit" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Capaciteit</span>
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Teams</span>
            </TabsTrigger>
            <TabsTrigger value="beschikbaarheid" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Beschikbaarheid</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="capaciteit" className="space-y-4 py-4">
            <CapacityTab settings={settings} onSubmit={handleSubmit} />
          </TabsContent>
          
          <TabsContent value="teams" className="space-y-6 py-4">
            <TeamManagement />
          </TabsContent>
          
          <TabsContent value="beschikbaarheid" className="space-y-6 py-4">
            <AvailabilityManagement />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
