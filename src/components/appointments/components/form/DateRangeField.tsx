
import React from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/appointments/components/DatePicker";
import { PlusCircle, X, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface DateRange {
  startDate: Date | undefined;
  timeBlock: string | undefined;
}

interface DateRangeFieldProps {
  dateRanges: DateRange[];
  onDateRangesChange: (dateRanges: DateRange[]) => void;
}

export const DateRangeField: React.FC<DateRangeFieldProps> = ({
  dateRanges,
  onDateRangesChange,
}) => {
  const timeBlocks = [
    { value: "morning", label: "Ochtend (9:00 - 12:00)" },
    { value: "afternoon", label: "Middag (13:00 - 17:00)" },
    { value: "evening", label: "Avond (18:00 - 21:00)" },
  ];

  const addDateRange = () => {
    onDateRangesChange([...dateRanges, { startDate: undefined, timeBlock: undefined }]);
  };

  const removeDateRange = (index: number) => {
    const newDateRanges = dateRanges.filter((_, i) => i !== index);
    onDateRangesChange(newDateRanges);
  };

  const updateDateRange = (index: number, field: keyof DateRange, value: any) => {
    const newDateRanges = dateRanges.map((range, i) => {
      if (i === index) {
        return { ...range, [field]: value };
      }
      return range;
    });
    onDateRangesChange(newDateRanges);
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Datums en tijdvakken</label>
      {dateRanges.map((range, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="grid gap-2 flex-1">
            <DatePicker
              date={range.startDate}
              onDateChange={(date) => updateDateRange(index, "startDate", date)}
            />
          </div>
          <div className="grid gap-2 flex-1">
            <Select
              value={range.timeBlock}
              onValueChange={(value) => updateDateRange(index, "timeBlock", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecteer tijdvak">
                  {range.timeBlock ? 
                    timeBlocks.find(block => block.value === range.timeBlock)?.label : 
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Selecteer tijdvak</span>
                    </div>
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {timeBlocks.map((block) => (
                  <SelectItem key={block.value} value={block.value}>
                    {block.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {dateRanges.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeDateRange(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addDateRange}
        className="w-full"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Extra datum toevoegen
      </Button>
    </div>
  );
};
