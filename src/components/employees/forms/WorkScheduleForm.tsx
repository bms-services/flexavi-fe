
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Employee } from "@/types/employee-management";

interface WorkScheduleFormProps {
  form: UseFormReturn<Employee>;
}

export const WorkScheduleForm = ({ form }: WorkScheduleFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Werkdagen</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(form.watch("workingDays")).map(([day]) => (
            <FormField
              key={day}
              control={form.control}
              name={`workingDays.${day}` as keyof Employee}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value as boolean}
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
    </div>
  );
};
