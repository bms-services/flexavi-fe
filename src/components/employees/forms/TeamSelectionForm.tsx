
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Employee } from "@/types/employee-management";

interface TeamSelectionFormProps {
  form: UseFormReturn<Employee>;
}

export const TeamSelectionForm = ({ form }: TeamSelectionFormProps) => {
  return (
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
  );
};
