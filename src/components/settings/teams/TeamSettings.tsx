
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Team, TeamType } from "@/types";
import { v4 as uuidv4 } from "uuid";

const teamSchema = z.object({
  name: z.string().min(1, "Team naam is verplicht"),
  members: z.array(z.string()).optional(),
  color: z.string().default("#3b82f6"),
});

export const TeamSettings: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamType, setTeamType] = useState<TeamType>("sales");
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      members: [],
      color: "#3b82f6",
    },
  });

  const onSubmit = (values: z.infer<typeof teamSchema>) => {
    const newTeam: Team = {
      id: uuidv4(),
      name: values.name,
      type: teamType,
      members: values.members || [],
      color: values.color,
    };

    setTeams([...teams, newTeam]);
    form.reset();
    setDialogOpen(false);
    
    toast({
      title: "Team toegevoegd",
      description: `Het ${teamType === "sales" ? "verkoop" : "uitvoerend"} team "${values.name}" is succesvol toegevoegd.`,
    });
  };

  const handleOpenDialog = (type: TeamType) => {
    setTeamType(type);
    form.reset();
    setDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams beheren</CardTitle>
        <CardDescription>
          Voeg nieuwe teams toe of bewerk bestaande teams.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" /> Verkoop Teams
            </h3>
            {teams.filter(team => team.type === "sales").length > 0 ? (
              <div className="space-y-2 mb-4">
                {teams
                  .filter(team => team.type === "sales")
                  .map(team => (
                    <div key={team.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: team.color }}></div>
                        <span>{team.name}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">{team.members.length} leden</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : null}
            <Button variant="outline" className="w-full" onClick={() => handleOpenDialog("sales")}>
              <Plus className="h-4 w-4 mr-2" />
              Voeg verkoop team toe
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5" /> Uitvoerende Teams
            </h3>
            {teams.filter(team => team.type === "installation").length > 0 ? (
              <div className="space-y-2 mb-4">
                {teams
                  .filter(team => team.type === "installation")
                  .map(team => (
                    <div key={team.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: team.color }}></div>
                        <span>{team.name}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">{team.members.length} leden</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : null}
            <Button variant="outline" className="w-full" onClick={() => handleOpenDialog("installation")}>
              <Plus className="h-4 w-4 mr-2" />
              Voeg uitvoerend team toe
            </Button>
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                          <span className="text-sm text-muted-foreground">{field.value}</span>
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
      </CardContent>
    </Card>
  );
};
