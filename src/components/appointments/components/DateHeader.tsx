
import React from "react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { cn } from "@/utils/format";
import { DateHeaderProps } from "../types";
import { Button } from "@/components/ui/button";

export const DateHeader = ({ date, isToday, onDateClick, isMobile }: DateHeaderProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full h-full p-1 md:p-2 flex flex-col items-center hover:bg-muted text-xs md:text-sm",
        isToday && "bg-primary/5"
      )}
      onClick={() => onDateClick?.(date)}
    >
      <div className="font-medium truncate">
        {isMobile
          ? format(parseISO(date), "E", { locale: nl })
          : format(parseISO(date), "EEE", { locale: nl })}
      </div>
      <div className="text-muted-foreground text-[10px] md:text-xs">
        {format(parseISO(date), "d MMM", { locale: nl })}
      </div>
    </Button>
  );
};
