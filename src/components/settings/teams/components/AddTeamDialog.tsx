
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TeamType } from "@/types";

const teamSchema = z.object({
  name: z.string().min(1, "Team naam is verplicht"),
  color: z.string().default("#3b82f6"),
});

interface AddTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof teamSchema>) => void;
  teamType: TeamType;
}

export const AddTeamDialog: React.FC<AddTeamDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  teamType,
}) => {
  const form = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      color: "#3b82f6",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {teamType === "sales" ? "Nieuw verkoop team" : "Nieuw uitvoerend team"}
          </DialogTitle>
          <DialogDescription>
            Voeg een nieuw team toe en wijs gebruikers toe aan dit team.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team naam</FormLabel>
                  <FormControl>
                    <Input placeholder="Voer teamnaam in" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team kleur</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input type="color" {...field} className="w-12 h-10 p-1" />
                      <span className="text-sm text-muted-foreground">
                        {field.value}
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Kies een kleur om dit team te identificeren in de agenda
                  </FormDescription>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Team opslaan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
