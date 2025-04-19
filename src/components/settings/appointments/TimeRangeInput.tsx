
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeRangeInputProps {
  startTime: string;
  endTime: string;
  onStartTimeChange?: (time: string) => void;
  onEndTimeChange?: (time: string) => void;
}

export const TimeRangeInput: React.FC<TimeRangeInputProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Label>Start tijd</Label>
        <Input 
          type="time" 
          value={startTime}
          onChange={(e) => onStartTimeChange?.(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <Label>Eind tijd</Label>
        <Input 
          type="time" 
          value={endTime}
          onChange={(e) => onEndTimeChange?.(e.target.value)}
        />
      </div>
    </div>
  );
};
