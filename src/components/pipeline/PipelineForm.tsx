
import React from "react";
import { Pipeline } from "@/types/pipeline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface PipelineFormProps {
  pipeline?: Pipeline;
  onSubmit: (pipeline: Pipeline) => void;
  onDelete?: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Naam moet minimaal 2 karakters bevatten" }),
  description: z.string(),
  isDefault: z.boolean().default(false),
});

export const PipelineForm: React.FC<PipelineFormProps> = ({
  pipeline,
  onSubmit,
  onDelete,
}) => {
  const isEditing = !!pipeline;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: pipeline?.name || "",
      description: pipeline?.description || "",
      isDefault: pipeline?.isDefault || false,
    },
  });
  
  function handleSubmit(values: z.infer<typeof formSchema>) {
    const newPipeline: Pipeline = {
      id: pipeline?.id || crypto.randomUUID(),
      name: values.name,
      description: values.description,
      stages: pipeline?.stages || [],
      isDefault: values.isDefault,
      createdAt: pipeline?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    onSubmit(newPipeline);
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naam</FormLabel>
              <FormControl>
                <Input placeholder="Pijplijn naam" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschrijving</FormLabel>
              <FormControl>
                <Textarea placeholder="Beschrijf deze pijplijn..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Standaard pijplijn</FormLabel>
                <FormDescription>
                  Maak dit de standaard pijplijn voor nieuwe items
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex justify-between">
          {isEditing && onDelete && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              Verwijderen
            </Button>
          )}
          <Button type="submit">
            {isEditing ? "Bijwerken" : "Aanmaken"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
