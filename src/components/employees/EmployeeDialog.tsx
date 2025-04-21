import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Employee, EmployeeRole } from "@/types/employee-management";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface EmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee | null;
  onSubmit: (data: Employee) => void;
}

export const EmployeeDialog = ({ isOpen, onClose, employee, onSubmit }: EmployeeDialogProps) => {
  const form = useForm<Employee>({
    defaultValues: employee || {
      id: crypto.randomUUID(),
      firstName: "",
      lastName: "",
      email: "",
      role: "sales",
      startDate: new Date().toISOString().split('T')[0],
      rates: {
        hourlyRate: 0,
        dailyRate: 0
      },
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false
      },
      workingHours: {
        start: "09:00",
        end: "17:00"
      },
      availableDays: ["1", "2", "3", "4", "5"],
      active: true,
      teamIds: []
    }
  });

  const handleSubmit = (data: Employee) => {
    onSubmit(data);
    onClose();
  };

  const roleLabels = {
    sales: "Verkoper",
    roofer: "Dakdekker",
    office: "Kantoor medewerker",
    driver: "Chauffeur"
  };

  const weekDays = [
    { value: "1", label: "Maandag" },
    { value: "2", label: "Dinsdag" },
    { value: "3", label: "Woensdag" },
    { value: "4", label: "Donderdag" },
    { value: "5", label: "Vrijdag" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {employee ? "Medewerker bewerken" : "Nieuwe medewerker"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voornaam</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Functie</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een functie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(roleLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Werkdagen</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(form.watch("workingDays")).map(([day, isChecked]) => (
                  <FormField
                    key={day}
                    control={form.control}
                    name={`workingDays.${day}`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="workingHours.start"
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
                name="workingHours.end"
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

            <FormField
              control={form.control}
              name="availableDays"
              render={() => (
                <FormItem>
                  <FormLabel>Beschikbare dagen</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {weekDays.map((day) => (
                      <FormField
                        key={day.value}
                        control={form.control}
                        name="availableDays"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(day.value)}
                                onCheckedChange={(checked) => {
                                  const current = new Set(field.value || []);
                                  if (checked) {
                                    current.add(day.value);
                                  } else {
                                    current.delete(day.value);
                                  }
                                  field.onChange(Array.from(current));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {day.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teams</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange([...field.value || [], value])}
                    value={field.value?.[0]}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer team" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sales">Verkoop team</SelectItem>
                      <SelectItem value="installation">Uitvoerend team</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Annuleren
              </Button>
              <Button type="submit">
                {employee ? "Opslaan" : "Toevoegen"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
