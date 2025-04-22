
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PostTitleFieldProps {
  control: Control<any>;
}

export function PostTitleField({ control }: PostTitleFieldProps) {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Titel</FormLabel>
          <FormControl>
            <Input placeholder="Geef je bericht een titel" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
