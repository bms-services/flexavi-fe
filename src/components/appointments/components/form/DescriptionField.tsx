
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface DescriptionFieldProps {
  form: UseFormReturn<any>;
}

export const DescriptionField: React.FC<DescriptionFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Beschrijving</FormLabel>
          <FormControl>
            <div className="relative">
              <Textarea 
                placeholder="Gedetailleerde omschrijving van de opdracht" 
                className="min-h-[100px]" 
                {...field} 
              />
              <FileText className="absolute right-3 top-3 h-4 w-4 opacity-50" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
