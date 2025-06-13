import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

import { AddTeamMemberDialog } from "./AddTeamMemberDialog";
import { AddTeamDialog } from "./components/AddTeamDialog";
import { TeamTypeSection } from "./components/TeamTypeSection";

import {
  useGetMyTeam,
  useGetMyTeams,
  useCreateMyTeam,
  useDeleteMyTeam,
  useUpdateMyTeam
} from "@/zustand/hooks/useSetting";

import { Employee } from "@/types/employee";
import { TeamReq, TeamRes, TeamTypeEnum } from "@/zustand/types/teamT";

export const TeamSettings: React.FC = () => {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);

  const getMyTeamsZ = useGetMyTeams();
  const getMyTeamZ = useGetMyTeam(teamId ?? "");
  const createMyTeamZ = useCreateMyTeam();
  const updateMyTeamZ = useUpdateMyTeam();
  const deleteMyTeamZ = useDeleteMyTeam();

  const handleAddTeam = async (data: TeamReq) => {
    try {
      await createMyTeamZ.mutateAsync(data);
      await getMyTeamsZ.refetch();
      setDialogOpen(false);
    } catch (err) {
      console.error("Failed to create team:", err);
    }
  };

  const handleAddMember = (employee: Employee) => {
    // implementasikan jika sudah ada API untuk add member
  };

  const handleOpenAddMember = (team: TeamRes) => {
    setTeamId(team.id);
    setAddMemberDialogOpen(true);
  };

  const handleOpenDetailTeam = (teamId: string) => {
    setTeamId(teamId);
  };

  const teams = getMyTeamsZ.data?.result.data ?? [];

  const salesTeams = teams.filter(team => team.type === TeamTypeEnum.SALES);
  const executiveTeams = teams.filter(team => team.type === TeamTypeEnum.EXECUTIVE);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams beheren</CardTitle>
        <CardDescription>
          Voeg nieuwe teams toe of bewerk bestaande teams.
        </CardDescription>
        <Button onClick={() => setDialogOpen(true)}>
          <span className="flex flex-row items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Voeg team toe
          </span>
        </Button>
      </CardHeader>

      <CardContent>
        {getMyTeamsZ.isLoading ? (
          <div className="flex items-center justify-center h-40">
            <p>Loading teams...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <TeamTypeSection
              title="Sales Teams"
              description="Beheer je sales teams en hun leden."
              teamId={teamId}
              handleOpenDetailTeam={handleOpenDetailTeam}
              handleOpenAddMember={handleOpenAddMember}
              teams={salesTeams}
            />

            <TeamTypeSection
              title="Executive Teams"
              description="Beheer je executive teams en hun leden."
              teamId={teamId}
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
          teamId={teamId ?? ""}
        />
      </CardContent>
    </Card>
  );
};