
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Een simpele lijst met kleuren; deze kun je uitbreiden
const COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#84cc16", // lime
  "#10b981", // green
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#0ea5e9", // sky
  "#d946ef", // magenta
  "#a855f7", // purple
  "#ec4899", // pink
  "#F1F0FB", // soft gray
];

interface ColorPopoverProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPopover: React.FC<ColorPopoverProps> = ({ value, onChange }) => (
  <Popover>
    <PopoverTrigger asChild>
      <button
        type="button"
        className="w-6 h-6 rounded-full border-2 border-white shadow cursor-pointer transition ring-2 ring-primary/30 focus:outline-none"
        style={{ backgroundColor: value }}
        aria-label="Kies kolomkleur"
      />
    </PopoverTrigger>
    <PopoverContent className="w-fit p-2">
      <div className="grid grid-cols-7 gap-2">
        {COLORS.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full border-2 focus:outline-none transition
            ${color === value ? "border-primary ring-2 ring-primary" : "border-gray-200"}`}
            style={{ backgroundColor: color }}
            aria-label={`Kies kleur ${color}`}
            onClick={() => onChange(color)}
            type="button"
          />
        ))}
      </div>
    </PopoverContent>
  </Popover>
);

