
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { EmployeeReq } from "@/zustand/types/employee";


const memberSchema = z.object({
  firstName: z.string().min(1, "Voornaam is verplicht"),
  lastName: z.string().min(1, "Achternaam is verplicht"),
  email: z.string().email("Ongeldig e-mailadres").min(1, "E-mailadres is verplicht"),
  phoneNumber: z.string().optional(),
  role: z.enum(["sales", "installation", "both"], {
    errorMap: () => ({ message: "Selecteer een rol" }),
  }),
  workingDays: z.object({
    monday: z.boolean().default(false),
    tuesday: z.boolean().default(false),
    wednesday: z.boolean().default(false),
    thursday: z.boolean().default(false),
    friday: z.boolean().default(false),
    saturday: z.boolean().default(false),
    sunday: z.boolean().default(false),
  }),
  workingHours: z.object({
    start: z.string().min(1, "Starttijd is verplicht"),
    end: z.string().min(1, "Eindtijd is verplicht"),
  }),
  availableDays: z.array(z.string()).min(1, "Selecteer ten minste één beschikbare dag"),
  active: z.boolean().default(true),
  team_ids: z.array(z.string()).min(1, "Selecteer ten minste één team"),
});

interface AddTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (employee: EmployeeReq) => void;
  teamId: string;
}

export const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  teamId,
}) => {
  const form = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "sales" as const,
    },
  });

  const days = [
    { id: "monday", label: "Maandag" },
    { id: "tuesday", label: "Dinsdag" },
    { id: "wednesday", label: "Woensdag" },
    { id: "thursday", label: "Donderdag" },
    { id: "friday", label: "Vrijdag" },
    { id: "saturday", label: "Zaterdag" },
    { id: "sunday", label: "Zondag" },
  ];

  const handleSubmit = (values: z.infer<typeof memberSchema>) => {
    const newEmployee: EmployeeReq = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phoneNumber || "",
      start_date: new Date().toISOString().split('T')[0],
      rates: {
        hourly_rate: 0,
        daily_rate: 0,
      },
      working_days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      working_hours: {
        start: "09:00",
        end: "17:00",
      },
      available_days: days.map(day => day.id),
      active: true,
      team_ids: [teamId],
    };

    onSubmit(newEmployee);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nieuwe medewerker toevoegen</DialogTitle>
          <DialogDescription>
            Vul de gegevens van de nieuwe medewerker in.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voornaam</FormLabel>
                  <FormControl>
                    <Input placeholder="Voer voornaam in" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achternaam</FormLabel>
                  <FormControl>
                    <Input placeholder="Voer achternaam in" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="naam@bedrijf.nl" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefoonnummer (optioneel)</FormLabel>
                  <FormControl>
                    <Input placeholder="06 12345678" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="sales" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Verkoop medewerker
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="installation" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Uitvoerend medewerker
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="both" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Beide rollen
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <WorkScheduleForm form={form} /> */}
            <div className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Werkdagen</h3>
                <div className="grid grid-cols-2 gap-2">
                  {days.map((day) => (
                    <FormField
                      key={day.id}
                      control={form.control}
                      name={`working_days.${day.id}` as keyof EmployeeReq}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value as boolean}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{day.label}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="working_hours.start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start tijd</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="working_hours.end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Eind tijd</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Medewerker toevoegen</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
