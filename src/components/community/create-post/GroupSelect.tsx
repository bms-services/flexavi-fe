
import { Control } from "react-hook-form";
import { useCommunityGroups } from "@/hooks/community";
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

interface GroupSelectProps {
  control: Control<any>;
}

export function GroupSelect({ control }: GroupSelectProps) {
  const { groups } = useCommunityGroups();

  return (
    <FormField
      control={control}
      name="groupId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Groep</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer een groep" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
