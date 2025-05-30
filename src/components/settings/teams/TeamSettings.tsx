
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Employee } from "@/types/employee";
import { AddTeamMemberDialog } from "./AddTeamMemberDialog";
import { AddTeamDialog } from "./components/AddTeamDialog";
import { useAppDispatch } from "@/hooks/use-redux";
import { getSettingTeamShow, getSettingTeamIndex, postSettingTeamStore } from "@/actions/settingAction";
import { CompanyTeam, CompanyTeamTypeEnum } from "@/types/company";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { TeamTypeSection } from "./components/TeamTypeSection";
import { use } from "i18next";

export const TeamSettings: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [salesTeams, setSalesTeams] = useState<CompanyTeam[]>([]);
  const [executiveTeams, setExecutiveTeams] = useState<CompanyTeam[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);

  const handleAddTeam = (data: CompanyTeam) => {
    dispatch(postSettingTeamStore(data));
  };

  const handleAddMember = (employee: Employee) => {


  };

  const openAddMemberDialog = (team: CompanyTeam) => {
    setSelectedTeam(team.id);
    setAddMemberDialogOpen(true);
  };

  const handleOpenDetailTeam = (teamId: string) => {
    setSelectedTeam(teamId);
    dispatch(getSettingTeamShow(teamId));
  }

  //--------------- New Code --------------- \\
  const settingTeamIndexRedux = useSelector((state: RootState) => state.setting.team.index);
  const settingTeamShowRedux = useSelector((state: RootState) => state.setting.team.show);
  const settingTeamStoreRedux = useSelector((state: RootState) => state.setting.team.store);

  // Fetch teams from the server or any other source
  useEffect(() => {
    dispatch(getSettingTeamIndex())
  }, []);


  // Update the team index when a new team is added or updated
  useEffect(() => {
    if (settingTeamStoreRedux.success) {
      dispatch(getSettingTeamIndex())
    }
  }, [dispatch, settingTeamStoreRedux]);

  useEffect(() => {
    if (settingTeamIndexRedux.success && Array.isArray(settingTeamIndexRedux.result)) {
      const teams = settingTeamIndexRedux.result as CompanyTeam[];
      setSalesTeams(teams.filter(team => team.type === CompanyTeamTypeEnum.SALES));
      setExecutiveTeams(teams.filter(team => team.type === CompanyTeamTypeEnum.EXECUTIVE));
    }
  }, [settingTeamIndexRedux]);

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
        {settingTeamIndexRedux.success && Array.isArray(settingTeamIndexRedux.result) && (
          <div className="space-y-6">
            <TeamTypeSection
              title="Sales Teams"
              description="Beheer je sales teams en hun leden."
              selectedTeam={selectedTeam}
              handleOpenDetailTeam={handleOpenDetailTeam}
              openAddMemberDialog={openAddMemberDialog}
              teams={salesTeams}
            />

            <TeamTypeSection
              title="Executive Teams"
              description="Beheer je executive teams en hun leden."
              selectedTeam={selectedTeam}
              handleOpenDetailTeam={handleOpenDetailTeam}
              openAddMemberDialog={openAddMemberDialog}
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
