
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
// import { CompanyTeam } from "@/types/company";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { TeamRes } from "@/zustand/types/teamT";

interface TeamTypeSectionProps {
  title: string;
  description: string;
  teamId: string;
  handleOpenDetailTeam: (teamId: string) => void;
  handleOpenAddMember: (team: TeamRes) => void;
  teams?: TeamRes[];
}

export const TeamTypeSection: React.FC<TeamTypeSectionProps> = ({
  title,
  description,
  teamId,
  handleOpenDetailTeam,
  handleOpenAddMember,
  teams = [],
}) => {

  const settingTeamShowRedux = useSelector((state: RootState) => state.setting.team.show);

  return (
    <div className="flex flex-col gap-2 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">({description})</p>
      </div>
      {teams.length > 0 ? (
        <Accordion type="single" collapsible className="w-full rounded-lg border bg-white shadow-sm"
          value={teamId}
          onValueChange={(value) => handleOpenDetailTeam(value)}
        >
          {teams.map((team) => (
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenAddMember(team)}
                  >
                    Voeg lid toe
                  </Button>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden px-6 py-4 bg-gray-50 text-sm text-gray-700 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Teamleden:</span>
                  {settingTeamShowRedux.success && settingTeamShowRedux.result.company_users?.map((member) => (
                    <div className="space-y-2" key={member.id}>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6">
                          <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">{member.user_id}</span>
                        </span>
                        <div className="">
                          <span>{member.user_id}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-gray-500 text-[14px]">
          Geen teams beschikbaar. Maak een team aan om leden toe te voegen.
        </div>
      )}
    </div>
  );
};
