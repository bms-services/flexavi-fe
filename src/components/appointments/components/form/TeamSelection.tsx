
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface TeamSelectionProps {
  form: UseFormReturn<any>;
  teams: Array<{ id: string; name: string; type: string }>;
}

export const TeamSelection: React.FC<TeamSelectionProps> = ({ form, teams }) => {
  return (
    <FormField
      control={form.control}
      name="teamId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Team (Optioneel)</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer een team (optioneel)" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
