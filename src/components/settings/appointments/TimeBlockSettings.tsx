
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimeBlock {
  id: number;
  start: string;
  end: string;
  label: string;
}

interface TimeBlockSettingsProps {
  timeBlocks: TimeBlock[];
  slotSettings: Record<string, number>;
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
          {timeBlocks.map((block, index) => (
            <div key={block.id} className="space-y-4 border p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{block.label}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTimeBlock(block.id)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label>Start tijd</Label>
                    <Input type="time" value={block.start} />
                  </div>
                  <div className="flex-1">
                    <Label>Eind tijd</Label>
                    <Input type="time" value={block.end} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Verkoop afspraken</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={slotSettings[`salesMorning${index + 1}Slots`] || 3}
                    onChange={(e) =>
                      onSlotSettingsChange({
                        ...slotSettings,
                        [`sales${block.label}Slots`]: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Uitvoering afspraken</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={slotSettings[`installationMorning${index + 1}Slots`] || 2}
                    onChange={(e) =>
                      onSlotSettingsChange({
                        ...slotSettings,
                        [`installation${block.label}Slots`]: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
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
