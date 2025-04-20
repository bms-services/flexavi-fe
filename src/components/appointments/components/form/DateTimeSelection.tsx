
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Clock } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DateRangeInput } from "./DateRangeInput";

// These time blocks would come from settings in a real app
const timeBlocks = [
  { id: "morning", label: "Ochtend", times: ["08:00", "09:00", "10:00", "11:00"] },
  { id: "afternoon", label: "Middag", times: ["12:00", "13:00", "14:00", "15:00"] },
  { id: "evening", label: "Avond", times: ["16:00", "17:00", "18:00", "19:00"] }
];

interface DateTimeSelectionProps {
  form: UseFormReturn<any>;
}

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ form }) => {
  const [additionalDateRanges, setAdditionalDateRanges] = useState<{ id: string }[]>([]);

  const addAdditionalDateRange = () => {
    const newRange = {
      id: `range-${Date.now()}`,
    };
    setAdditionalDateRanges([...additionalDateRanges, newRange]);
  };

  return (
    <ScrollArea className="max-h-[500px] overflow-y-auto pr-4">
      <div className="space-y-6">
        <div className="space-y-4">
          <DateRangeInput
            form={form}
            startFieldName="startDate"
            endFieldName="endDate"
            label="Datum"
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tijdstip</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecteer een tijdstip">
                        {field.value && (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {field.value}
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-background z-50">
                    {timeBlocks.map((block) => (
                      <React.Fragment key={block.id}>
                        <SelectItem value={block.id} disabled className="font-semibold">
                          {block.label}
                        </SelectItem>
                        {block.times.map((time) => (
                          <SelectItem key={time} value={time} className="pl-6">
                            {time}
                          </SelectItem>
                        ))}
                      </React.Fragment>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {additionalDateRanges.map((range, index) => (
          <div key={range.id} className="pt-4 border-t">
            <h4 className="font-medium mb-4">Extra datum bereik {index + 1}</h4>
            <div className="space-y-4">
              <DateRangeInput
                form={form}
                startFieldName={`additionalRanges.${index}.startDate`}
                endFieldName={`additionalRanges.${index}.endDate`}
              />
              <FormField
                control={form.control}
                name={`additionalRanges.${index}.time`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tijdstip</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecteer een tijdstip">
                            {field.value && (
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                {field.value}
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background z-50">
                        {timeBlocks.map((block) => (
                          <React.Fragment key={block.id}>
                            <SelectItem value={block.id} disabled className="font-semibold">
                              {block.label}
                            </SelectItem>
                            {block.times.map((time) => (
                              <SelectItem key={time} value={time} className="pl-6">
                                {time}
                              </SelectItem>
                            ))}
                          </React.Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="outline" 
          onClick={addAdditionalDateRange} 
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Voeg extra datum bereik toe
        </Button>
      </div>
    </ScrollArea>
  );
};
