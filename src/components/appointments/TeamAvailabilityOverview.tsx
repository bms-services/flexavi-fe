
import React, { useState } from "react";
import { format, parseISO, addDays } from "date-fns";
import { Users, Building2, Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TeamSection } from "./components/TeamSection";
import { InstallationTeamSection } from "./components/InstallationTeamSection";
import { TeamAvailabilityOverviewProps } from "./types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TeamDetails } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const TeamAvailabilityOverview = ({
  startDate,
  appointments,
  teams,
  environments,
  scheduleSettings,
  unavailableDates,
  onTeamUpdate,
  onUnavailableDateAdd,
  onUnavailableDateRemove,
}: TeamAvailabilityOverviewProps) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [dateOffset, setDateOffset] = useState(0);
  const [editingTeam, setEditingTeam] = useState<TeamDetails | null>(null);
  const daysToShow = 5;
  
  // Calculate dates based on startDate and dateOffset
  const dates = Array.from({ length: daysToShow }, (_, i) => 
    format(addDays(parseISO(startDate), i + dateOffset), 'yyyy-MM-dd')
  );

  const salesTeams = teams.filter(team => team.type === "sales");
  const installationTeams = teams.filter(team => team.type === "installation");

  const handlePreviousDays = () => {
    if (dateOffset > 0) {
      setDateOffset(dateOffset - daysToShow);
    }
  };

  const handleNextDays = () => {
    setDateOffset(dateOffset + daysToShow);
  };

  const handleSliderChange = (value: number[]) => {
    setDateOffset(value[0]);
  };

  const handleTeamNameEdit = (team: TeamDetails) => {
    setEditingTeam(team);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op plaatsnaam..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex flex-col gap-2 sm:items-end">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePreviousDays}
              disabled={dateOffset === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {format(parseISO(dates[0]), 'dd MMM')} - {format(parseISO(dates[dates.length - 1]), 'dd MMM yyyy')}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNextDays}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full sm:w-64">
            <Slider
              defaultValue={[0]}
              value={[dateOffset]}
              max={90}
              step={5}
              onValueChange={handleSliderChange}
              className="py-2"
            />
          </div>
        </div>
      </div>

      <TeamSection
        title="Verkoopteams"
        icon={<Users className="h-5 w-5 text-primary" />}
        teams={salesTeams}
        dates={dates}
        appointments={appointments}
        scheduleSettings={scheduleSettings}
        searchLocation={searchLocation}
        unavailableDates={unavailableDates}
        onTeamNameEdit={handleTeamNameEdit}
      />
      
      <InstallationTeamSection
        title="Uitvoerende Teams"
        icon={<Building2 className="h-5 w-5 text-primary" />}
        teams={installationTeams}
        dates={dates}
        appointments={appointments}
        searchLocation={searchLocation}
        unavailableDates={unavailableDates}
        onTeamNameEdit={handleTeamNameEdit}
      />
    </div>
  );
};
