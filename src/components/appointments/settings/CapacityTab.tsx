
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScheduleSettings } from "../AppointmentSettings";

const settingsSchema = z.object({
  salesMorningSlots: z.coerce.number().min(0).max(20),
  salesAfternoonSlots: z.coerce.number().min(0).max(20),
  salesEveningSlots: z.coerce.number().min(0).max(20),
  installationMorningSlots: z.coerce.number().min(0).max(20),
  installationAfternoonSlots: z.coerce.number().min(0).max(20),
  installationEveningSlots: z.coerce.number().min(0).max(20),
  defaultJobDuration: z.enum(["small", "medium", "large"]),
});

interface CapacityTabProps {
  settings: ScheduleSettings;
  onSubmit: (data: ScheduleSettings) => void;
}

export const CapacityTab: React.FC<CapacityTabProps> = ({ settings, onSubmit }) => {
  const form = useForm<ScheduleSettings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4 border p-4 rounded-lg bg-blue-50/50">
            <h3 className="font-medium text-blue-700">Verkoop Team Capaciteit</h3>
            
            <FormField
              control={form.control}
              name="salesMorningSlots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ochtend Slots (9:00-12:00)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="salesAfternoonSlots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middag Slots (12:00-17:00)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="salesEveningSlots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avond Slots (17:00-21:00)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4 border p-4 rounded-lg bg-green-50/50">
            <h3 className="font-medium text-green-700">Uitvoerende Ploeg Capaciteit</h3>
            
            <FormField
              control={form.control}
              name="installationMorningSlots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ochtend Slots (9:00-12:00)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="installationAfternoonSlots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middag Slots (12:00-17:00)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="installationEveningSlots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avond Slots (17:00-21:00)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="defaultJobDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Standaard Klus Grootte</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer klus grootte" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="small">Klein (1-2 dagen)</SelectItem>
                  <SelectItem value="medium">Gemiddeld (3-5 dagen)</SelectItem>
                  <SelectItem value="large">Groot (5+ dagen)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Hiermee wordt de standaard duur van een klus ingesteld voor planning doeleinden
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DialogFooter>
          <Button type="submit">Instellingen Opslaan</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
