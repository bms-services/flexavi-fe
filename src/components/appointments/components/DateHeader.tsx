
import React from "react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { DateHeaderProps } from "../types";

export const DateHeader = ({ date, isToday }: DateHeaderProps) => {
  return (
    <div className={cn(
      "p-2 text-center border-l",
      isToday && "bg-primary/5"
    )}>
      <div className="font-medium">
        {format(parseISO(date), "EEE", { locale: nl })}
      </div>
      <div className="text-sm text-muted-foreground">
        {format(parseISO(date), "d MMM", { locale: nl })}
      </div>
    </div>
  );
};
