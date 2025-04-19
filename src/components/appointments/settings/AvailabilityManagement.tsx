
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "../components/DatePicker";
import { TeamDetails } from "@/types";

export const AvailabilityManagement = () => {
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
