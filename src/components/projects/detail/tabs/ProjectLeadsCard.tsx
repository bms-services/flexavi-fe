
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { ProjectOverviewRes } from "@/zustand/types/projectT";
import { AddressJSX } from "@/components/ui/address";

interface ProjectLeadsCardProps {
  projectOverview: ProjectOverviewRes;

}

export const ProjectLeadsCard: React.FC<ProjectLeadsCardProps> = ({ projectOverview }) => (
  <Card>
    <CardHeader>
      <CardTitle>
        <div className="flex gap-2 items-center">
          <Users className="h-5 w-5" />
          Gekoppelde Leads
        </div>
      </CardTitle>
      <CardDescription>Leads die aan dit project zijn gekoppeld</CardDescription>
    </CardHeader>
    <CardContent>
      {projectOverview.project_leads && projectOverview.project_leads.length > 0 ? (
        <div className="space-y-2">
          <div className="text-sm mb-2 font-semibold">
            {projectOverview.project_leads.length} gekoppeld{projectOverview.project_leads.length === 1 ? "" : "e"} lead{projectOverview.project_leads.length === 1 ? "" : "s"}
          </div>
          <ul className="space-y-1">
            {projectOverview.project_leads.map(lead => (
              <li key={lead.id} className="text-sm flex flex-col gap-2 px-2 py-1 rounded hover:bg-muted">
                <span className="font-medium">{lead.name}</span>
                <span className="text-muted-foreground text-xs">
                  <AddressJSX address={lead.address} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-muted-foreground text-sm">Geen gekoppelde leads</div>
      )}
    </CardContent>
  </Card>
);
