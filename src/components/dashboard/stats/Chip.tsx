
import React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps {
  label: string;
  value: string;
  change?: number;
}

export const Chip: React.FC<ChipProps> = ({ label, value, change }) => {
  return (
    <div className="inline-flex flex-col bg-muted/50 rounded-md px-2 py-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        {change !== undefined && (
          <span className={cn(
            "ml-2 text-xs",
            change > 0 ? "text-emerald-500" : "text-red-500"
          )}>
            {change > 0 ? "+" : ""}{change}%
          </span>
        )}
      </div>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
};
