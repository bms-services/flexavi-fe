
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Checkbox } from "@/components/ui/checkbox";
import { EmployeeReq } from "@/zustand/types/employee";
import { UserIcon, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import PhoneNumber from "@/components/ui/phone-number";

type WorkingDayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";


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

const defaultValues = {
  email: "",
  name: "",
  phone: "",
  role: "sales" as const,
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
}


export const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  teamId,
}) => {
  const { t } = useTranslation("dashboard");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<EmployeeReq>({
    resolver: zodResolver(memberSchema),
    defaultValues: defaultValues,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nieuwe medewerker toevoegen</DialogTitle>
          <DialogDescription>
            Vul de gegevens van de nieuwe medewerker in.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label={t('dashboard:settings.team_member.label.name')}
            placeholder={t('dashboard:settings.team_member.placeholder.name')}
            id="name"
            type="text"
            icon={<UserIcon className="h-5 w-5 " />}
            rules={{
              register,
              name: "name",
              options: {
                required: t('dashboard:settings.team_member.error.required.name')
              },
              errors,
            }}
          />
          <Input
            label={t('dashboard:settings.team_member.label.email')}
            placeholder={t('dashboard:settings.team_member.placeholder.email')}
            id={'email'}
            type="email"
            icon={<Mail className="h-5 w-5 " />}
            rules={{
              register,
              name: "email",
              options: {
                required: t('dashboard:settings.team_member.error.required.email')
              },
              errors,
            }}
          />
          <PhoneNumber
            label={t('dashboard:settings.team_member.label.phone')}
            rules={{
              control,
              name: "phone",
              options: {
                required: t('dashboard:settings.team_member.error.required.phone')
              },
              errors,
            }}
          />

          <FormField
            control={control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
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
                    control={control}
                    name={`working_days.${day.id}` as WorkingDayKey}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value as unknown as boolean}
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
                control={control}
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
                control={control}
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
      </DialogContent>
    </Dialog>
  );
};
