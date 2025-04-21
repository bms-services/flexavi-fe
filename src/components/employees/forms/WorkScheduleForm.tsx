
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Employee } from "@/types/employee-management";

interface WorkScheduleFormProps {
  form: UseFormReturn<Employee>;
}

export const WorkScheduleForm = ({ form }: WorkScheduleFormProps) => {
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
    <div className="space-y-4">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Werkdagen</h3>
        <div className="grid grid-cols-2 gap-2">
          {days.map((day) => (
            <FormField
              key={day.id}
              control={form.control}
              name={`workingDays.${day.id}` as keyof Employee}
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
    </div>
  );
};
