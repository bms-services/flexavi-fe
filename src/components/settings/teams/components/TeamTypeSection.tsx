
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Users, UserPlus, Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Team } from "@/types";
import { Employee } from "@/types/employee";
import { TeamType } from "@/types";

interface TeamTypeSectionProps {
  type: TeamType;
  teams: Team[];
  onOpenAddTeam: (type: TeamType) => void;
  onOpenAddMember: (team: Team) => void;
  getTeamMembers: (team: Team) => Employee[];
}

export const TeamTypeSection: React.FC<TeamTypeSectionProps> = ({
  type,
  teams,
  onOpenAddTeam,
  onOpenAddMember,
  getTeamMembers,
}) => {
  const filteredTeams = teams.filter(team => team.type === type);
  const icon = type === "sales" ? <Users className="h-5 w-5" /> : <Building2 className="h-5 w-5" />;
  const title = type === "sales" ? "Verkoop Teams" : "Uitvoerende Teams";
  const buttonText = type === "sales" ? "Voeg verkoop team toe" : "Voeg uitvoerend team toe";

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {filteredTeams.length > 0 && (
        <div className="space-y-2 mb-4">
          {filteredTeams.map(team => (
            <div key={team.id} className="p-4 border rounded-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: team.color }}
                  ></div>
                  <span className="font-medium">{team.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenAddMember(team)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Voeg lid toe
                </Button>
              </div>

              {getTeamMembers(team).length > 0 && (
                <div className="border-t pt-3">
                  <h4 className="text-sm font-medium mb-2">Teamleden:</h4>
                  <div className="space-y-2">
                    {getTeamMembers(team).map(member => (
                      <div key={member.id} className="flex items-center gap-2 text-sm">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.firstName[0]}
                            {member.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span>
                          {member.firstName} {member.lastName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <Button variant="outline" className="w-full" onClick={() => onOpenAddTeam(type)}>
        <Plus className="h-4 w-4 mr-2" />
        {buttonText}
      </Button>
    </div>
  );
};
