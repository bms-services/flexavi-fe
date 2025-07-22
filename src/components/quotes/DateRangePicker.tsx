import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DateRangePickerProps {
  value: [Date | undefined, Date | undefined];
  onChange: (range: [Date | undefined, Date | undefined]) => void;
  label: string;
}

export function DateRangePicker({ value, onChange, label }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const displayValue = () => {
    if (value[0] && value[1]) {
      return `${format(value[0], "dd-MM-yyyy")} tot ${format(value[1], "dd-MM-yyyy")}`;
    } else if (value[0]) {
      return `Vanaf ${format(value[0], "dd-MM-yyyy")}`;
    } else if (value[1]) {
      return `Tot ${format(value[1], "dd-MM-yyyy")}`;
    }
    return "Selecteer datumbereik";
  };

  return (
    <div className="flex flex-col gap-1 min-w-[220px] w-full md:w-auto">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start w-full">
            {displayValue()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50" align="start">
          <div className="flex gap-2 p-3">
            <div>
              <div className="mb-2 text-xs font-medium">Van</div>
              <Calendar
                mode="single"
                selected={value[0]}
                onSelect={(date) => onChange([date, value[1]])}
                className="rounded border shadow pointer-events-auto"
                disabled={(date) => value[1] ? date > value[1] : false}
              />
            </div>
            <div>
              <div className="mb-2 text-xs font-medium">Tot</div>
              <Calendar
                mode="single"
                selected={value[1]}
                onSelect={(date) => onChange([value[0], date])}
                className="rounded border shadow pointer-events-auto"
                disabled={(date) => value[0] ? date < value[0] : false}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 p-3 pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onChange([undefined, undefined]);
                setOpen(false);
              }}
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => setOpen(false)}
            >
              Toepassen
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
