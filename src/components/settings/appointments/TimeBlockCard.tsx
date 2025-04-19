import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus } from "lucide-react";
import { TimeRangeInput } from "./TimeRangeInput";

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

interface TimeBlockCardProps {
  block: TimeBlock;
  slotSettings: SlotSettings;
  onRemove: (id: number) => void;
  onSlotChange: (blockLabel: string, teamType: string, value: number) => void;
  onTimeChange?: (id: number, start: string, end: string) => void;
}

export const TimeBlockCard: React.FC<TimeBlockCardProps> = ({
  block,
  slotSettings,
  onRemove,
  onSlotChange,
  onTimeChange,
}) => {
  const handleStartTimeChange = (time: string) => {
    onTimeChange?.(block.id, time, block.end);
  };

  const handleEndTimeChange = (time: string) => {
    onTimeChange?.(block.id, block.start, time);
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{block.label}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(block.id)}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4">
        <TimeRangeInput
          startTime={block.start}
          endTime={block.end}
          onStartTimeChange={handleStartTimeChange}
          onEndTimeChange={handleEndTimeChange}
        />
        <div className="space-y-2">
          <Label>Verkoop afspraken</Label>
          <Input
            type="number"
            min="0"
            max="10"
            value={slotSettings[`sales${block.label}Slots` as keyof SlotSettings] || 3}
            onChange={(e) => 
              onSlotChange(block.label, "sales", parseInt(e.target.value))
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Uitvoering afspraken</Label>
          <Input
            type="number"
            min="0"
            max="10"
            value={slotSettings[`installation${block.label}Slots` as keyof SlotSettings] || 2}
            onChange={(e) =>
              onSlotChange(block.label, "installation", parseInt(e.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
};
