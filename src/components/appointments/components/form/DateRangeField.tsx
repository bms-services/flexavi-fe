
import React from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/appointments/components/DatePicker";
import { PlusCircle, X } from "lucide-react";

export interface DateRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

interface DateRangeFieldProps {
  dateRanges: DateRange[];
  onDateRangesChange: (dateRanges: DateRange[]) => void;
}

export const DateRangeField: React.FC<DateRangeFieldProps> = ({
  dateRanges,
  onDateRangesChange,
}) => {
  const addDateRange = () => {
    onDateRangesChange([...dateRanges, { startDate: undefined, endDate: undefined }]);
  };

  const removeDateRange = (index: number) => {
    const newDateRanges = dateRanges.filter((_, i) => i !== index);
    onDateRangesChange(newDateRanges);
  };

  const updateDateRange = (index: number, field: keyof DateRange, value: Date | undefined) => {
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
      <label className="text-sm font-medium">Datumbereik(en)</label>
      {dateRanges.map((range, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="grid gap-2">
            <DatePicker
              date={range.startDate}
              onDateChange={(date) => updateDateRange(index, "startDate", date)}
            />
          </div>
          <div className="grid gap-2">
            <DatePicker
              date={range.endDate}
              onDateChange={(date) => updateDateRange(index, "endDate", date)}
            />
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
        Datumbereik toevoegen
      </Button>
    </div>
  );
};
