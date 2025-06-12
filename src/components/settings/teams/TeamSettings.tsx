
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Employee } from "@/types/employee";
import { AddTeamMemberDialog } from "./AddTeamMemberDialog";
import { AddTeamDialog } from "./components/AddTeamDialog";
import { CompanyTeam, CompanyTeamTypeEnum } from "@/types/company";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { TeamTypeSection } from "./components/TeamTypeSection";
import { useGetMyTeam, useGetMyTeams, useCreateMyTeam, useDeleteMyTeam, useUpdateMyTeam } from "@/zustand/hooks/useSetting";
import { TeamReq } from "@/zustand/types/teamT";

export const TeamSettings: React.FC = () => {
  const getMyTeamsZ = useGetMyTeams();
  const getMyTeamZ = useGetMyTeam();
  const createMyTeamZ = useCreateMyTeam();
  const updateMyTeamZ = useUpdateMyTeam();
  const deleteMyTeamZ = useDeleteMyTeam();

  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [salesTeams, setSalesTeams] = useState<CompanyTeam[]>([]);
  const [executiveTeams, setExecutiveTeams] = useState<CompanyTeam[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);

  const handleAddTeam = (data: TeamReq) => {
    createMyTeamZ.mutateAsync(data).then(() => {
      setDialogOpen(false);
      handleGetMyTeam();
    })
  };

  const handleAddMember = (employee: Employee) => {


  };

  const handleOpenAddMember = (team: CompanyTeam) => {
    setSelectedTeam(team.id);
    setAddMemberDialogOpen(true);
  };

  const handleOpenDetailTeam = (teamId: string) => {
    setSelectedTeam(teamId);

    if (teamId !== "") {
      getMyTeamZ.mutateAsync(teamId).then(() => {
        // setAddMemberDialogOpen(true);
        console.log(teamId);
      })
    }
  }

  const handleGetMyTeam = () => {
    getMyTeamsZ.mutateAsync().then((data) => {
      const teams = data.result as CompanyTeam[];
      setSalesTeams(teams.filter(team => team.type === CompanyTeamTypeEnum.SALES));
      setExecutiveTeams(teams.filter(team => team.type === CompanyTeamTypeEnum.EXECUTIVE));
    }
    ).catch((error) => {
      console.error("Error fetching teams:", error);
    }
    );
  }

  // Fetch teams from the server or any other source
  useEffect(() => {
    handleGetMyTeam();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams beheren</CardTitle>
        <CardDescription>
          Voeg nieuwe teams toe of bewerk bestaande teams.
        </CardDescription>
        <Button onClick={() => setDialogOpen(true)} >
          <span className="flex flex-row items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Voeg team toe
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        {getMyTeamsZ.isPending ? (
          <div className="flex items-center justify-center h-40">
            <p>Loading teams...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <TeamTypeSection
              title="Sales Teams"
              description="Beheer je sales teams en hun leden."
              selectedTeam={selectedTeam}
              handleOpenDetailTeam={handleOpenDetailTeam}
              handleOpenAddMember={handleOpenAddMember}
              teams={salesTeams}
            />

            <TeamTypeSection
              title="Executive Teams"
              description="Beheer je executive teams en hun leden."
              selectedTeam={selectedTeam}
              handleOpenDetailTeam={handleOpenDetailTeam}
              handleOpenAddMember={handleOpenAddMember}
              teams={executiveTeams}
            />
          </div>
        )}
        <AddTeamDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleAddTeam}
        />

        <AddTeamMemberDialog
          open={addMemberDialogOpen}
          onOpenChange={setAddMemberDialogOpen}
          onSubmit={handleAddMember}
          teamId={selectedTeam || ""}
        />
      </CardContent>
    </Card>
  );
};
