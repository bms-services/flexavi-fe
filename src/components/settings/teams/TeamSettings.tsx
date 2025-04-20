
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Team, TeamType } from "@/types";
import { Employee } from "@/types/employee";
import { v4 as uuidv4 } from "uuid";
import { AddTeamMemberDialog } from "./AddTeamMemberDialog";
import { TeamTypeSection } from "./components/TeamTypeSection";
import { AddTeamDialog } from "./components/AddTeamDialog";

export const TeamSettings: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [teamType, setTeamType] = useState<TeamType>("sales");
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);

  const handleAddTeam = (values: { name: string; color: string }) => {
    const newTeam: Team = {
      id: uuidv4(),
      name: values.name,
      type: teamType,
      members: [],
      color: values.color,
    };

    setTeams([...teams, newTeam]);
    setDialogOpen(false);
    
    toast({
      title: "Team toegevoegd",
      description: `Het ${teamType === "sales" ? "verkoop" : "uitvoerend"} team "${values.name}" is succesvol toegevoegd.`,
    });
  };

  const handleOpenDialog = (type: TeamType) => {
    setTeamType(type);
    setDialogOpen(true);
  };

  const handleAddMember = (employee: Employee) => {
    if (!selectedTeam) return;
    
    setEmployees([...employees, employee]);
    
    const updatedTeams = teams.map(team => {
      if (team.id === selectedTeam.id) {
        return {
          ...team,
          members: [...team.members, employee.id]
        };
      }
      return team;
    });
    
    setTeams(updatedTeams);
    
    toast({
      title: "Medewerker toegevoegd",
      description: `${employee.firstName} ${employee.lastName} is toegevoegd aan ${selectedTeam.name}.`,
    });
  };

  const openAddMemberDialog = (team: Team) => {
    setSelectedTeam(team);
    setAddMemberDialogOpen(true);
  };

  const getTeamMembers = (team: Team) => {
    return employees.filter(employee => team.members.includes(employee.id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams beheren</CardTitle>
        <CardDescription>
          Voeg nieuwe teams toe of bewerk bestaande teams.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
        </div>

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
