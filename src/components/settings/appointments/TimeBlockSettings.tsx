
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { TimeBlockCard } from "./TimeBlockCard";

interface TimeBlock {
  id: number;
  start: string;
  end: string;
  label: string;
}

interface SlotSettings {
  salesMorningSlots: number;
  salesAfternoonSlots: number;
  salesEveningSlots: number;
  installationMorningSlots: number;
  installationAfternoonSlots: number;
  installationEveningSlots: number;
}

interface TimeBlockSettingsProps {
  timeBlocks: TimeBlock[];
  slotSettings: SlotSettings;
  onTimeBlocksChange: (blocks: TimeBlock[]) => void;
  onSlotSettingsChange: (settings: Record<string, number>) => void;
  onSave: () => void;
}

export const TimeBlockSettings: React.FC<TimeBlockSettingsProps> = ({
  timeBlocks,
  slotSettings,
  onTimeBlocksChange,
  onSlotSettingsChange,
  onSave,
}) => {
  const handleAddTimeBlock = () => {
    const newBlock = {
      id: timeBlocks.length + 1,
      start: "09:00",
      end: "17:00",
      label: "Nieuw blok",
    };
    onTimeBlocksChange([...timeBlocks, newBlock]);
  };

  const handleRemoveTimeBlock = (id: number) => {
    onTimeBlocksChange(timeBlocks.filter(block => block.id !== id));
  };

  const handleSlotChange = (blockLabel: string, teamType: string, value: number) => {
    const key = `${teamType}${blockLabel}Slots`;
    onSlotSettingsChange({ [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aantal afspraken per dagdeel</CardTitle>
        <CardDescription>
          Beheer het maximum aantal afspraken per dagdeel voor verschillende type teams.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timeBlocks.map((block) => (
            <TimeBlockCard
              key={block.id}
              block={block}
              slotSettings={slotSettings}
              onRemove={handleRemoveTimeBlock}
              onSlotChange={handleSlotChange}
            />
          ))}
        </div>
        <Button onClick={handleAddTimeBlock} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Voeg tijdblok toe
        </Button>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} className="ml-auto">
          Instellingen opslaan
        </Button>
      </CardFooter>
    </Card>
  );
};
