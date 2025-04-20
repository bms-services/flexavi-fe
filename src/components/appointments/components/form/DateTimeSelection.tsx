
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
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, Plus, Trash } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [additionalDateRanges, setAdditionalDateRanges] = useState<{ id: string; startDate?: Date; endDate?: Date }[]>([]);

  // Add an additional date range
  const addAdditionalDateRange = () => {
    const newRange = {
      id: `range-${Date.now()}`,
      startDate: undefined,
      endDate: undefined
    };
    setAdditionalDateRanges([...additionalDateRanges, newRange]);
    
    // Also update form values
    const currentRanges = form.getValues("additionalDateRanges") || [];
    form.setValue("additionalDateRanges", [...currentRanges, newRange]);
  };

  // Remove an additional date range
  const removeAdditionalDateRange = (id: string) => {
    const newRanges = additionalDateRanges.filter(range => range.id !== id);
    setAdditionalDateRanges(newRanges);
    
    // Also update form values
    const currentRanges = form.getValues("additionalDateRanges") || [];
    form.setValue("additionalDateRanges", currentRanges.filter((range: any) => range.id !== id));
  };

  return (
    <ScrollArea className="max-h-[500px] overflow-y-auto pr-4">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      locale={nl}
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
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
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
                  <SelectContent className="bg-background">
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

        {/* Additional date ranges for multiple day planning */}
        {additionalDateRanges.length > 0 && (
          <Accordion type="single" collapsible className="w-full border rounded-md px-4">
            <AccordionItem value="additional-dates">
              <AccordionTrigger>Extra datums ({additionalDateRanges.length})</AccordionTrigger>
              <AccordionContent>
                {additionalDateRanges.map((range, index) => (
                  <div key={range.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t mt-4 first:mt-0 first:border-t-0 first:pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Extra datum {index + 1}</h4>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeAdditionalDateRange(range.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`additionalDateRanges.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Van</FormLabel>
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
                                  locale={nl}
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`additionalDateRanges.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tot</FormLabel>
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
                                  locale={nl}
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name={`additionalDateRanges.${index}.time`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tijdstip</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
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
                            <SelectContent className="bg-background">
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
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

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
