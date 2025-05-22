
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Team, TeamType } from "@/types";
import { Employee } from "@/types/employee";
import { v4 as uuidv4 } from "uuid";
import { AddTeamMemberDialog } from "./AddTeamMemberDialog";
import { AddTeamDialog } from "./components/AddTeamDialog";
import { useAppDispatch } from "@/hooks/use-redux";
import { getSettingTeamShow, getSettingTeamIndex, postSettingTeamStore } from "@/actions/settingAction";
import { CompanyTeam } from "@/types/company";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Accordion } from "@/components/ui/accordion";
import { AccordionContent, AccordionItem, AccordionTrigger, AccordionHeader } from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { ChevronDown, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const TeamSettings: React.FC = () => {
  const dispatch = useAppDispatch();

  // const [teams, setTeams] = useState<CompanyTeam[]>([]);
  // const [employees, setEmployees] = useState<Employee[]>([]);
  const [teamType, setTeamType] = useState<TeamType>("sales");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<CompanyTeam | null>(null);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);

  const handleAddTeam = (data: CompanyTeam) => {
    dispatch(postSettingTeamStore(data));
  };

  const handleAddMember = (employee: Employee) => {


  };

  const openAddMemberDialog = (team: CompanyTeam) => {
    setSelectedTeam(team);
    setAddMemberDialogOpen(true);
  };

  const getTeamMembers = (team: CompanyTeam) => {
    dispatch(getSettingTeamShow(team.id));
  };

  //--------------- New Code --------------- \\
  const settingTeamIndexRedux = useSelector((state: RootState) => state.setting.team.index);
  const settingTeamShowRedux = useSelector((state: RootState) => state.setting.team.show);
  const settingTeamStoreRedux = useSelector((state: RootState) => state.setting.team.store);


  // const { loading: loadingProfileIndexTeam, response: responseProfileIndexTeam } = useSelector((state: RootState) => state.setting.indexTeam);
  // const resultProfileIndexTeam = responseProfileIndexTeam.result as CompanyTeam[];

  // Fetch teams from the server or any other source
  useEffect(() => {
    dispatch(getSettingTeamIndex())
  }, []);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams beheren</CardTitle>
        <CardDescription>
          Voeg nieuwe teams toe of bewerk bestaande teams.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div className="space-y-4">
          <TeamTypeSection
            type="sales"
            teams={teams}
            onOpenAddTeam={handleOpenDialog}
            onOpenAddMember={openAddMemberDialog}
            getTeamMembers={getTeamMembers}
          />

          <TeamTypeSection
            type="installation"
            teams={teams}
            onOpenAddTeam={handleOpenDialog}
            onOpenAddMember={openAddMemberDialog}
            getTeamMembers={getTeamMembers}
          />
        </div> */}

        <Button onClick={() => setDialogOpen(true)} >
          <span className="flex flex-row items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Voeg team toe
          </span>
        </Button>
        <Accordion type="single" collapsible className="w-full mt-6 rounded-lg border bg-white shadow-sm">
          {settingTeamIndexRedux.success && Array.isArray(settingTeamIndexRedux.result) && (settingTeamIndexRedux.result as CompanyTeam[]).map((team: CompanyTeam) => (
            <AccordionItem
              value={team.id}
              key={team.id}
              className="border-b last:border-b-0 transition hover:bg-gray-50"
            >
              <AccordionTrigger className="flex justify-between w-full gap-2 items-center px-4 py-3 font-semibold text-gray-800 hover:text-primary-600 transition-colors">
                <div className="flex justify-between w-full items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-md"
                      style={{ backgroundColor: team.color }}
                    ></div>
                    <div className="flex flex-col">
                      <p className="text-left">{team.name}</p>
                      <p className="text-left text-[12px]">{team.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {team.type}
                  </Badge>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden px-6 py-4 bg-gray-50 text-sm text-gray-700 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Team ID:</span>
                  <span className="text-gray-500">{team.id}</span>
                  <Button variant="outline" size="sm" className="mt-2 self-start">
                    Bekijk details
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <AddTeamDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleAddTeam}
          teamType={teamType}
        />

        <AddTeamMemberDialog
          open={addMemberDialogOpen}
          onOpenChange={setAddMemberDialogOpen}
          onSubmit={handleAddMember}
          teamId={selectedTeam?.id || ""}
        />
      </CardContent>
    </Card>
  );
};
