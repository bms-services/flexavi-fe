
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const roleSchema = z.object({
  name: z.string().min(1, "Rol naam is verplicht"),
  description: z.string().optional(),
});

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof roleSchema>) => void;
  editingRoleId: string | null;
  defaultValues?: {
    name: string;
    description: string;
  };
}

export const RoleDialog: React.FC<RoleDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  editingRoleId,
  defaultValues = {
    name: "",
    description: "",
  },
}) => {
  const form = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingRoleId ? "Rol bewerken" : "Nieuwe rol toevoegen"}
          </DialogTitle>
          <DialogDescription>
            {editingRoleId ? "Bewerk de geselecteerde rol" : "Voeg een nieuwe rol toe met aangepaste rechten"}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol naam</FormLabel>
                  <FormControl>
                    <Input placeholder="Bijv. Manager, Verkoper, Monteur" {...field} />
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
                  <FormLabel>Beschrijving (optioneel)</FormLabel>
                  <FormControl>
                    <Input placeholder="Beschrijf de rol en verantwoordelijkheden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">
                {editingRoleId ? "Rol bijwerken" : "Rol toevoegen"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
