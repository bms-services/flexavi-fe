
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Users, Calendar, UserPlus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { TeamDetails, TeamType, WorkEnvironment } from "@/types";
import { DatePicker } from "./components/DatePicker";

// Define the settings schema
const settingsSchema = z.object({
  salesMorningSlots: z.coerce.number().min(0).max(20),
  salesAfternoonSlots: z.coerce.number().min(0).max(20),
  salesEveningSlots: z.coerce.number().min(0).max(20),
  installationMorningSlots: z.coerce.number().min(0).max(20),
  installationAfternoonSlots: z.coerce.number().min(0).max(20),
  installationEveningSlots: z.coerce.number().min(0).max(20),
  defaultJobDuration: z.enum(["small", "medium", "large"]),
});

export type ScheduleSettings = z.infer<typeof settingsSchema>;

interface AppointmentSettingsProps {
  settings: ScheduleSettings;
  onSettingsChange: (settings: ScheduleSettings) => void;
}

export const AppointmentSettings: React.FC<AppointmentSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const { toast } = useToast();
  const form = useForm<ScheduleSettings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  const onSubmit = (data: ScheduleSettings) => {
    onSettingsChange(data);
    toast({
      title: "Instellingen bijgewerkt",
      description: "De planning instellingen zijn succesvol bijgewerkt.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white">
          <Settings className="mr-2 h-4 w-4" />
          Planning Instellingen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Afspraken Planning Instellingen</DialogTitle>
          <DialogDescription>
            Beheer de planning instellingen, teams en beschikbaarheid.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="capaciteit" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="capaciteit" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Capaciteit</span>
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Teams</span>
            </TabsTrigger>
            <TabsTrigger value="beschikbaarheid" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Beschikbaarheid</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="capaciteit" className="space-y-4 py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4 border p-4 rounded-lg bg-blue-50/50">
                    <h3 className="font-medium text-blue-700">Verkoop Team Capaciteit</h3>
                    
                    <FormField
                      control={form.control}
                      name="salesMorningSlots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ochtend Slots (9:00-12:00)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="salesAfternoonSlots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middag Slots (12:00-17:00)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="salesEveningSlots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Avond Slots (17:00-21:00)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4 border p-4 rounded-lg bg-green-50/50">
                    <h3 className="font-medium text-green-700">Uitvoerende Ploeg Capaciteit</h3>
                    
                    <FormField
                      control={form.control}
                      name="installationMorningSlots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ochtend Slots (9:00-12:00)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="installationAfternoonSlots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middag Slots (12:00-17:00)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="installationEveningSlots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Avond Slots (17:00-21:00)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="defaultJobDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Standaard Klus Grootte</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer klus grootte" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Klein (1-2 dagen)</SelectItem>
                          <SelectItem value="medium">Gemiddeld (3-5 dagen)</SelectItem>
                          <SelectItem value="large">Groot (5+ dagen)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Hiermee wordt de standaard duur van een klus ingesteld voor planning doeleinden
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Instellingen Opslaan</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="teams" className="space-y-6 py-4">
            <TeamManagement />
          </TabsContent>
          
          <TabsContent value="beschikbaarheid" className="space-y-6 py-4">
            <AvailabilityManagement />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

// Team Management Component
const TeamManagement = () => {
  const { toast } = useToast();
  const [teams, setTeams] = useState<TeamDetails[]>([
    { id: "1", name: "Verkoop Team A", type: "sales", environmentId: "1", color: "#0EA5E9" },
    { id: "2", name: "Verkoop Team B", type: "sales", environmentId: "2", color: "#9b87f5" },
    { id: "3", name: "Uitvoerende Ploeg 1", type: "installation", environmentId: "1", color: "#0EA5E9" },
    { id: "4", name: "Uitvoerende Ploeg 2", type: "installation", environmentId: "3", color: "#7E69AB" },
  ]);
  
  const workEnvironments: WorkEnvironment[] = [
    { id: "1", name: "Rotterdam", region: "Zuid-Holland", color: "#0EA5E9" },
    { id: "2", name: "Amsterdam", region: "Noord-Holland", color: "#9b87f5" },
    { id: "3", name: "Utrecht", region: "Utrecht", color: "#7E69AB" },
  ];
  
  const [teamMembers, setTeamMembers] = useState<Record<string, string[]>>({
    "1": ["Jan de Vries", "Piet Jansen", "Klaas Bakker"],
    "2": ["Maria Visser", "Sophie de Groot"],
    "3": ["Willem van Dijk", "Thomas Smit", "Lars Bos", "Sven de Boer"],
    "4": ["Erik Meijer", "Jeroen de Jong", "Bas van der Meer"],
  });
  
  const addTeamSchema = z.object({
    name: z.string().min(2, "Naam moet minstens 2 karakters bevatten"),
    type: z.enum(["sales", "installation"]),
    environmentId: z.string(),
  });

  const addMemberSchema = z.object({
    name: z.string().min(2, "Naam moet minstens 2 karakters bevatten"),
    teamId: z.string(),
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

// Availability Management Component
const AvailabilityManagement = () => {
  const { toast } = useToast();
  const [teams, setTeams] = useState<TeamDetails[]>([
    { id: "1", name: "Verkoop Team A", type: "sales", environmentId: "1", color: "#0EA5E9" },
    { id: "2", name: "Verkoop Team B", type: "sales", environmentId: "2", color: "#9b87f5" },
    { id: "3", name: "Uitvoerende Ploeg 1", type: "installation", environmentId: "1", color: "#0EA5E9" },
    { id: "4", name: "Uitvoerende Ploeg 2", type: "installation", environmentId: "3", color: "#7E69AB" },
  ]);
  
  const [selectedTeam, setSelectedTeam] = useState<string>(teams[0].id);
  const [unavailableDates, setUnavailableDates] = useState<Record<string, string[]>>({
    "1": ["2025-04-20", "2025-04-21"],
    "2": ["2025-04-22", "2025-04-23", "2025-04-24"],
    "3": [],
    "4": ["2025-04-25"],
  });
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  const handleSelectTeam = (teamId: string) => {
    setSelectedTeam(teamId);
    setSelectedDate(undefined);
  };
  
  const handleAddUnavailableDate = () => {
    if (selectedDate && selectedTeam) {
      const dateString = selectedDate.toISOString().split('T')[0];
      
      if (unavailableDates[selectedTeam]?.includes(dateString)) {
        toast({
          title: "Datum al gemarkeerd",
          description: "Deze datum is al gemarkeerd als niet beschikbaar.",
          variant: "destructive",
        });
        return;
      }
      
      setUnavailableDates({
        ...unavailableDates,
        [selectedTeam]: [...(unavailableDates[selectedTeam] || []), dateString]
      });
      
      toast({
        title: "Datum gemarkeerd",
        description: `Het team is gemarkeerd als niet beschikbaar op ${dateString}.`,
      });
      
      setSelectedDate(undefined);
    }
  };
  
  const handleRemoveUnavailableDate = (date: string) => {
    setUnavailableDates({
      ...unavailableDates,
      [selectedTeam]: unavailableDates[selectedTeam].filter(d => d !== date)
    });
    
    toast({
      title: "Datum verwijderd",
      description: `De niet-beschikbaarheid op ${date} is verwijderd.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Team selecteren</h3>
          <div className="space-y-2">
            {teams.map(team => (
              <div 
                key={team.id}
                className={`border rounded p-3 cursor-pointer flex items-center gap-2 ${
                  selectedTeam === team.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                }`}
                onClick={() => handleSelectTeam(team.id)}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: team.color }}
                />
                <span>{team.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Markeer niet-beschikbare dagen</h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Selecteer een datum waarop het geselecteerde team niet beschikbaar is:
              </p>
              <DatePicker
                date={selectedDate}
                onDateChange={setSelectedDate}
              />
              <Button 
                onClick={handleAddUnavailableDate} 
                disabled={!selectedDate || !selectedTeam}
              >
                Markeer als Niet Beschikbaar
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {selectedTeam && (
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">
            Niet-beschikbare dagen voor {teams.find(t => t.id === selectedTeam)?.name}
          </h3>
          
          {unavailableDates[selectedTeam]?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {unavailableDates[selectedTeam].map(date => (
                <Badge 
                  key={date} 
                  variant="outline" 
                  className="flex items-center gap-2 pl-3 pr-2 py-1.5"
                >
                  <span>{date}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleRemoveUnavailableDate(date)}
                  >
                    <span className="sr-only">Verwijder</span>
                    <span aria-hidden="true">×</span>
                  </Button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Geen niet-beschikbare dagen gemarkeerd voor dit team.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
