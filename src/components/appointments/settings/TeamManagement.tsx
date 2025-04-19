
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { TeamDetails, TeamType, WorkEnvironment } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";

const workEnvironments: WorkEnvironment[] = [
  { id: "1", name: "Rotterdam", region: "Zuid-Holland", color: "#0EA5E9" },
  { id: "2", name: "Amsterdam", region: "Noord-Holland", color: "#9b87f5" },
  { id: "3", name: "Utrecht", region: "Utrecht", color: "#7E69AB" },
];

const addTeamSchema = z.object({
  name: z.string().min(2, "Naam moet minstens 2 karakters bevatten"),
  type: z.enum(["sales", "installation"]),
  environmentId: z.string(),
});

const addMemberSchema = z.object({
  name: z.string().min(2, "Naam moet minstens 2 karakters bevatten"),
  teamId: z.string(),
});

export const TeamManagement = () => {
  const { toast } = useToast();
  const [teams, setTeams] = useState<TeamDetails[]>([
    { id: "1", name: "Verkoop Team A", type: "sales", environmentId: "1", color: "#0EA5E9" },
    { id: "2", name: "Verkoop Team B", type: "sales", environmentId: "2", color: "#9b87f5" },
    { id: "3", name: "Uitvoerende Ploeg 1", type: "installation", environmentId: "1", color: "#0EA5E9" },
    { id: "4", name: "Uitvoerende Ploeg 2", type: "installation", environmentId: "3", color: "#7E69AB" },
  ]);
  
  const [teamMembers, setTeamMembers] = useState<Record<string, string[]>>({
    "1": ["Jan de Vries", "Piet Jansen", "Klaas Bakker"],
    "2": ["Maria Visser", "Sophie de Groot"],
    "3": ["Willem van Dijk", "Thomas Smit", "Lars Bos", "Sven de Boer"],
    "4": ["Erik Meijer", "Jeroen de Jong", "Bas van der Meer"],
  });

  const addTeamForm = useForm<z.infer<typeof addTeamSchema>>({
    resolver: zodResolver(addTeamSchema),
    defaultValues: {
      name: "",
      type: "sales",
      environmentId: workEnvironments[0].id,
    },
  });

  const addMemberForm = useForm<z.infer<typeof addMemberSchema>>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      name: "",
      teamId: teams[0].id,
    },
  });

  const handleAddTeam = (data: z.infer<typeof addTeamSchema>) => {
    const newTeam: TeamDetails = {
      id: `${teams.length + 1}`,
      name: data.name,
      type: data.type as TeamType,
      environmentId: data.environmentId,
      color: workEnvironments.find(env => env.id === data.environmentId)?.color || "#0EA5E9",
    };
    
    setTeams([...teams, newTeam]);
    setTeamMembers({
      ...teamMembers,
      [newTeam.id]: []
    });
    
    toast({
      title: "Team toegevoegd",
      description: `${newTeam.name} is succesvol toegevoegd.`,
    });
    
    addTeamForm.reset();
  };

  const handleAddMember = (data: z.infer<typeof addMemberSchema>) => {
    setTeamMembers({
      ...teamMembers,
      [data.teamId]: [...(teamMembers[data.teamId] || []), data.name]
    });
    
    toast({
      title: "Medewerker toegevoegd",
      description: `${data.name} is succesvol toegevoegd aan het team.`,
    });
    
    addMemberForm.reset();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team toevoegen */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Nieuw Team Toevoegen</h3>
          <Form {...addTeamForm}>
            <form onSubmit={addTeamForm.handleSubmit(handleAddTeam)} className="space-y-4">
              <FormField
                control={addTeamForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team naam</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Voer teamnaam in" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={addTeamForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer team type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sales">Verkoop Team</SelectItem>
                        <SelectItem value="installation">Uitvoerende Ploeg</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={addTeamForm.control}
                name="environmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Werkgebied</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer werkgebied" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {workEnvironments.map(env => (
                          <SelectItem key={env.id} value={env.id}>
                            {env.name} ({env.region})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Team Toevoegen</Button>
            </form>
          </Form>
        </div>
        
        {/* Medewerker toevoegen */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Medewerker Toevoegen</h3>
          <Form {...addMemberForm}>
            <form onSubmit={addMemberForm.handleSubmit(handleAddMember)} className="space-y-4">
              <FormField
                control={addMemberForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naam medewerker</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Voer naam in" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={addMemberForm.control}
                name="teamId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teams.map(team => (
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
              
              <Button type="submit" className="w-full">Medewerker Toevoegen</Button>
            </form>
          </Form>
        </div>
      </div>
      
      {/* Team overzicht */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-4">Team Overzicht</h3>
        <div className="space-y-4">
          {teams.map(team => (
            <Sheet key={team.id}>
              <SheetTrigger asChild>
                <div className="border rounded p-3 cursor-pointer hover:bg-muted flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: team.color }}
                    />
                    <span>{team.name}</span>
                  </div>
                  <Badge variant={team.type === "sales" ? "default" : "secondary"}>
                    {team.type === "sales" ? "Verkoop" : "Uitvoerend"}
                  </Badge>
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{team.name} - Medewerkers</SheetTitle>
                  <SheetDescription>
                    Overzicht van alle medewerkers in dit team.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  {teamMembers[team.id]?.length > 0 ? (
                    <ul className="space-y-2">
                      {teamMembers[team.id].map((member, idx) => (
                        <li key={idx} className="flex items-center gap-2 p-2 border-b">
                          <UserPlus className="h-4 w-4 text-muted-foreground" />
                          <span>{member}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Geen medewerkers in dit team.</p>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>
    </div>
  );
};
