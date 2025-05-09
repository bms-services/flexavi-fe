
import React, { useState } from "react";
import { TeamDetails, WorkEnvironment } from "@/types";
import { format, parseISO, addDays } from "date-fns";
import { nl } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Edit, Plus, Trash2, AlertOctagon } from "lucide-react";

interface TeamAvailabilitySettingsProps {
  teams: TeamDetails[];
  environments: WorkEnvironment[];
  unavailableDates: Record<string, string[]>;
  onTeamUpdate: (updatedTeam: TeamDetails) => void;
  onUnavailableDateAdd: (teamId: string, date: string) => void;
  onUnavailableDateRemove: (teamId: string, date: string) => void;
  onTeamDelete: (teamId: string) => void;
  onSlotUpdate: (timeOfDay: string, teamType: string, value: number) => void;
  slotsConfiguration: {
    salesMorningSlots: number;
    salesAfternoonSlots: number;
    salesEveningSlots: number;
    installationMorningSlots: number;
    installationAfternoonSlots: number;
    installationEveningSlots: number;
  };
}

export const TeamAvailabilitySettings: React.FC<TeamAvailabilitySettingsProps> = ({
  teams,
  environments,
  unavailableDates,
  onTeamUpdate,
  onUnavailableDateAdd,
  onUnavailableDateRemove,
  onTeamDelete,
  onSlotUpdate,
  slotsConfiguration,
}) => {
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editedTeamName, setEditedTeamName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleStartEditing = (team: TeamDetails) => {
    setEditingTeamId(team.id);
    setEditedTeamName(team.name);
  };

  const handleSaveTeamName = () => {
    if (editingTeamId && editedTeamName.trim()) {
      const teamToUpdate = teams.find(t => t.id === editingTeamId);
      if (teamToUpdate) {
        onTeamUpdate({ ...teamToUpdate, name: editedTeamName });
        
      }
      setEditingTeamId(null);
    }
  };

  const handleOpenUnavailability = (teamId: string) => {
    setSelectedTeamId(teamId);
    setSelectedDate(undefined);
  };

  const handleAddUnavailableDate = () => {
    if (selectedTeamId && selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      
      if (unavailableDates[selectedTeamId]?.includes(dateString)) {
      
        return;
      }
      
      onUnavailableDateAdd(selectedTeamId, dateString);
      
      
      setSelectedDate(undefined);
    }
  };

  const handleRemoveUnavailableDate = (date: string) => {
    if (selectedTeamId) {
      onUnavailableDateRemove(selectedTeamId, date);
      
    
    }
  };

  return (
    <div className="space-y-8">
      {/* Slots configuration */}
      <div className="bg-white rounded-lg border shadow-sm p-5 space-y-4">
        <h3 className="text-lg font-semibold mb-4">Aantal beschikbare afspraken per dagdeel</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salesMorningSlots">Verkoop - Ochtend</Label>
            <Input 
              id="salesMorningSlots" 
              type="number" 
              min="0" 
              max="10"
              value={slotsConfiguration.salesMorningSlots}
              onChange={(e) => onSlotUpdate('morning', 'sales', parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salesAfternoonSlots">Verkoop - Middag</Label>
            <Input 
              id="salesAfternoonSlots" 
              type="number" 
              min="0" 
              max="10"
              value={slotsConfiguration.salesAfternoonSlots}
              onChange={(e) => onSlotUpdate('afternoon', 'sales', parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salesEveningSlots">Verkoop - Avond</Label>
            <Input 
              id="salesEveningSlots" 
              type="number" 
              min="0" 
              max="10"
              value={slotsConfiguration.salesEveningSlots}
              onChange={(e) => onSlotUpdate('evening', 'sales', parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="installationMorningSlots">Uitvoering - Ochtend</Label>
            <Input 
              id="installationMorningSlots" 
              type="number" 
              min="0" 
              max="10"
              value={slotsConfiguration.installationMorningSlots}
              onChange={(e) => onSlotUpdate('morning', 'installation', parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="installationAfternoonSlots">Uitvoering - Middag</Label>
            <Input 
              id="installationAfternoonSlots" 
              type="number" 
              min="0" 
              max="10"
              value={slotsConfiguration.installationAfternoonSlots}
              onChange={(e) => onSlotUpdate('afternoon', 'installation', parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="installationEveningSlots">Uitvoering - Avond</Label>
            <Input 
              id="installationEveningSlots" 
              type="number" 
              min="0" 
              max="10"
              value={slotsConfiguration.installationEveningSlots}
              onChange={(e) => onSlotUpdate('evening', 'installation', parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Teams list with inline editing */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">Teams bewerken</h3>
          <p className="text-sm text-muted-foreground">Klik op een teamnaam om deze te bewerken</p>
        </div>
        
        <div className="divide-y">
          {teams.map(team => (
            <div key={team.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: team.color }}
                />
                
                {editingTeamId === team.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editedTeamName}
                      onChange={(e) => setEditedTeamName(e.target.value)}
                      className="w-48"
                      autoFocus
                    />
                    <Button size="sm" onClick={handleSaveTeamName}>
                      Opslaan
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="font-medium">{team.name}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 ml-1"
                      onClick={() => handleStartEditing(team)}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
                
                <Badge variant={team.type === "sales" ? "default" : "secondary"} className="ml-2">
                  {team.type === "sales" ? "Verkoop" : "Uitvoering"}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleOpenUnavailability(team.id)}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Beschikbaarheid
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Beschikbaarheid voor {team.name}</DialogTitle>
                      <DialogDescription>
                        Markeer datums waarop dit team niet beschikbaar is.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border mx-auto"
                      />
                      
                      <Button 
                        onClick={handleAddUnavailableDate} 
                        disabled={!selectedDate}
                        className="w-full"
                      >
                        Markeer als niet beschikbaar
                      </Button>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Niet beschikbare dagen:</h4>
                        {unavailableDates[team.id]?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {unavailableDates[team.id].map(date => (
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
                          <p className="text-sm text-muted-foreground">
                            Geen niet-beschikbare dagen gemarkeerd voor dit team.
                          </p>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Team verwijderen?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Weet je zeker dat je "{team.name}" wilt verwijderen? 
                        Deze actie kan niet ongedaan worden gemaakt.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuleren</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onTeamDelete(team.id)} 
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Verwijderen
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
