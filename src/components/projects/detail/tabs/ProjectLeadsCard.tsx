
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Lead } from "@/types/index";

interface ProjectLeadsCardProps {
  projectLeads: Lead[];
}

export const ProjectLeadsCard: React.FC<ProjectLeadsCardProps> = ({ projectLeads }) => (
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
      {projectLeads && projectLeads.length > 0 ? (
        <div className="space-y-2">
          <div className="text-sm mb-2 font-semibold">
            {projectLeads.length} gekoppeld{projectLeads.length === 1 ? "" : "e"} lead{projectLeads.length === 1 ? "" : "s"}
          </div>
          <ul className="space-y-1">
            {projectLeads.map(lead => (
              <li key={lead.id} className="text-sm flex gap-2 items-center px-2 py-1 rounded hover:bg-muted">
                <span className="font-medium">{lead.name}</span>
                <span className="text-muted-foreground text-xs">({lead.address})</span>
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
