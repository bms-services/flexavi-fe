
import { Control } from "react-hook-form";
import { PostType } from "@/types/community";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostTypeSelectProps {
  control: Control<any>;
}

export function PostTypeSelect({ control }: PostTypeSelectProps) {
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type bericht</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer een type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={PostType.GENERAL}>Algemeen</SelectItem>
              <SelectItem value={PostType.JOB_LISTING}>Personeel gezocht</SelectItem>
              <SelectItem value={PostType.PROJECT_SHOWCASE}>Project showcase</SelectItem>
              <SelectItem value={PostType.OUTSOURCE_WORK}>Werk uitbesteden</SelectItem>
              <SelectItem value={PostType.TECHNICAL_ADVICE}>Technisch advies</SelectItem>
              <SelectItem value={PostType.LEGAL_ADVICE}>Juridisch advies</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
