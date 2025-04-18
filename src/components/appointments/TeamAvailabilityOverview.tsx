
import React, { useState } from "react";
import { format, parseISO, addDays } from "date-fns";
import { Users, Building2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TeamSection } from "./components/TeamSection";
import { InstallationTeamSection } from "./components/InstallationTeamSection";
import { TeamAvailabilityOverviewProps } from "./types";

export const TeamAvailabilityOverview = ({
  startDate,
  appointments,
  teams,
  environments,
  scheduleSettings,
}: TeamAvailabilityOverviewProps) => {
  const [searchLocation, setSearchLocation] = useState("");
  const daysToShow = 5;
  const dates = Array.from({ length: daysToShow }, (_, i) => 
    format(addDays(parseISO(startDate), i), 'yyyy-MM-dd')
  );

  const salesTeams = teams.filter(team => team.type === "sales");
  const installationTeams = teams.filter(team => team.type === "installation");

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Zoek op plaatsnaam..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="pl-9"
        />
      </div>

      <TeamSection
        title="Verkoopteams"
        icon={<Users className="h-5 w-5 text-primary" />}
        teams={salesTeams}
        dates={dates}
        appointments={appointments}
        scheduleSettings={scheduleSettings}
        searchLocation={searchLocation}
      />
      
      <InstallationTeamSection
        title="Uitvoerende Teams"
        icon={<Building2 className="h-5 w-5 text-primary" />}
        teams={installationTeams}
        dates={dates}
        appointments={appointments}
      />
    </div>
  );
};
