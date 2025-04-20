
import React, { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Clock, Plus, Trash } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

// These time slots could come from settings in a real app
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
];

interface DateTimeSelectionProps {
  form: UseFormReturn<any>;
}

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ form }) => {
  const [additionalDates, setAdditionalDates] = useState<Date[]>([]);

  // Add an additional date for planning multiple days
  const addAdditionalDate = () => {
    setAdditionalDates([...additionalDates, new Date()]);
    // Update the form value to include additional dates
    const currentDates = form.getValues("additionalDates") || [];
    form.setValue("additionalDates", [...currentDates, new Date()]);
  };

  // Remove an additional date
  const removeAdditionalDate = (index: number) => {
    const newDates = [...additionalDates];
    newDates.splice(index, 1);
    setAdditionalDates(newDates);
    
    // Update the form value
    const currentDates = form.getValues("additionalDates") || [];
    const updatedDates = [...currentDates];
    updatedDates.splice(index, 1);
    form.setValue("additionalDates", updatedDates);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Datum</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: nl })
                      ) : (
                        <span>Kies een datum</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tijdstip</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecteer een tijdstip">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {field.value}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background">
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Additional dates for multiple day planning */}
      {additionalDates.map((date, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 pt-4 border-t">
          <FormField
            control={form.control}
            name={`additionalDates[${index}]`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Extra datum {index + 1}</FormLabel>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeAdditionalDate(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: nl })
                        ) : (
                          <span>Kies een datum</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`additionalTimes[${index}]`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tijdstip</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecteer een tijdstip">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {field.value}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-background">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}

      <Button 
        type="button" 
        variant="outline" 
        onClick={addAdditionalDate} 
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Voeg extra datum toe
      </Button>
    </div>
  );
};
