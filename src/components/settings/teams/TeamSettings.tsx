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
import { ParamGlobal } from "@/zustand/types/apiT";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmployeeReq } from "@/zustand/types/employee";

export const TeamSettings: React.FC = () => {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [collapseId, setCollapseId] = useState<string | null>(null);

  const [modal, setModal] = useState({
    member: false,
    team: false,
    deleteMember: false,
    deleteTeam: false,
  });

  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const getMyTeamsZ = useGetMyTeams(params);
  const getMyTeamZ = useGetMyTeam(collapseId ?? "");
  const createMyTeamZ = useCreateMyTeam();
  const updateMyTeamZ = useUpdateMyTeam();
  const deleteMyTeamZ = useDeleteMyTeam();

  const teams = getMyTeamsZ.data?.result.data ?? [];
  const salesTeams = teams.filter(team => team.type === TeamTypeEnum.SALES);
  const executiveTeams = teams.filter(team => team.type === TeamTypeEnum.EXECUTIVE);

  const handleCreateTeam = () => {
    setTeamId(null);
    setModal((prev) => ({ ...prev, team: true }));
  };

  const handleStoreTeam = async (data: TeamReq) => {
    try {
      await createMyTeamZ.mutateAsync(data);
      await getMyTeamsZ.refetch();
      setModal((prev) => ({ ...prev, team: false }));
    } catch (err) {
      console.error("Failed to create team:", err);
    }
  };

  const handleShowTeam = (id: string) => {
    setTeamId(id);
    setCollapseId(id);
  };

  const handleEditTeam = (data: TeamRes) => {
    setTeamId(data.id);
    setModal((prev) => ({ ...prev, team: true }));
    // Set form data for editing if needed
  };

  const handleUpdateTeam = async (id: string, data: TeamReq) => {
    try {
      await updateMyTeamZ.mutateAsync({ id: id, formData: data });
      await getMyTeamsZ.refetch();
      setModal((prev) => ({ ...prev, team: false }));
    } catch (err) {
      console.error("Failed to update team:", err);
    }
  }


  const handleDeleteTeam = async (data: TeamRes) => {
    setTeamId(data.id);
    setModal((prev) => ({ ...prev, deleteTeam: true }));
  };

  const handleDestroyTeam = async (id: string) => {
    try {
      await deleteMyTeamZ.mutateAsync(id);
      await getMyTeamsZ.refetch();
      setTeamId(null);
      setModal((prev) => ({ ...prev, deleteTeam: false }));
    } catch (err) {
      console.error("Failed to destroy team:", err);
    }
  };


  //-- Add member handling
  const handleCreateMember = (team: TeamRes) => {
    setTeamId(team.id);
    setModal((prev) => ({ ...prev, member: true }));
  };

  const handleStoreMember = (data: EmployeeReq) => {
    // implementasikan jika sudah ada API untuk add member
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams beheren</CardTitle>
        <CardDescription>
          Voeg nieuwe teams toe of bewerk bestaande teams.
        </CardDescription>
        <Button onClick={handleCreateTeam}>
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
              collapseId={collapseId}
              handleCreateMember={handleCreateMember}
              handleShowTeam={handleShowTeam}
              handleDeleteTeam={handleDeleteTeam}
              handleEditTeam={handleEditTeam}
              teams={salesTeams}
            />

            <TeamTypeSection
              title="Executive Teams"
              description="Beheer je executive teams en hun leden."
              collapseId={collapseId}
              handleCreateMember={handleCreateMember}
              handleShowTeam={handleShowTeam}
              handleDeleteTeam={handleDeleteTeam}
              handleEditTeam={handleEditTeam}
              teams={executiveTeams}
            />
          </div>
        )}

        <AddTeamDialog
          open={modal.team}
          onOpenChange={(open) => {
            if (!open) {
              setTeamId(null);
              setModal((prev) => ({ ...prev, team: false }));
            }
          }}
          onStore={handleStoreTeam}
          onUpdate={handleUpdateTeam}
          teamId={teamId ?? ""}
        />

        <ConfirmDialog
          open={!!modal.deleteTeam}
          onCancel={() => setModal((prev) => ({ ...prev, deleteTeam: false }))}
          onConfirm={() => {
            if (teamId) handleDestroyTeam(teamId);
          }}
          title="Confirm Deletion"
          description="Weet je zeker dat je dit team wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt."
        />

        <AddTeamMemberDialog
          open={modal.member}
          onOpenChange={(open) => {
            if (!open) {
              setTeamId(null);
              setModal((prev) => ({ ...prev, member: false }));
            }
          }}
          onSubmit={handleStoreMember}
          teamId={teamId ?? ""}
        />
      </CardContent>
    </Card>
  );
};