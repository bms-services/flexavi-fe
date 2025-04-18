
import React from "react";
import { format, parseISO, addDays } from "date-fns";
import { Users, Building2 } from "lucide-react";
import { TeamSection } from "./components/TeamSection";
import { TeamAvailabilityOverviewProps } from "./types";

export const TeamAvailabilityOverview = ({
  startDate,
  appointments,
  teams,
  environments,
  scheduleSettings,
}: TeamAvailabilityOverviewProps) => {
  const daysToShow = 5;
  const dates = Array.from({ length: daysToShow }, (_, i) => 
    format(addDays(parseISO(startDate), i), 'yyyy-MM-dd')
  );

  const salesTeams = teams.filter(team => team.type === "sales");
  const installationTeams = teams.filter(team => team.type === "installation");

  return (
    <div className="space-y-6">
      <TeamSection
        title="Verkoopteams"
        icon={<Users className="h-5 w-5 text-primary" />}
        teams={salesTeams}
        dates={dates}
        appointments={appointments}
        scheduleSettings={scheduleSettings}
      />
      
      <TeamSection
        title="Uitvoerende Teams"
        icon={<Building2 className="h-5 w-5 text-primary" />}
        teams={installationTeams}
        dates={dates}
        appointments={appointments}
        scheduleSettings={scheduleSettings}
      />
    </div>
  );
};
