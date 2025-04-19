
import React from "react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { DateHeaderProps } from "../types";
import { Button } from "@/components/ui/button";

export const DateHeader = ({ date, isToday, onDateClick }: DateHeaderProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full h-full p-2 flex flex-col items-center hover:bg-muted",
        isToday && "bg-primary/5"
      )}
      onClick={() => onDateClick?.(date)}
    >
      <div className="font-medium">
        {format(parseISO(date), "EEE", { locale: nl })}
      </div>
      <div className="text-sm text-muted-foreground">
        {format(parseISO(date), "d MMM", { locale: nl })}
      </div>
    </Button>
  );
};
