
import React from "react";
import { Button } from "@/components/ui/button";
// import { ProjectStatusBadge } from "../ProjectStatusBadge";
import { Edit, PlusCircle } from "lucide-react";
import { formatEuro, formatIsoToDate } from "@/utils/format";
import { ProjectOverviewRes, ProjectSummaryRes } from "@/zustand/types/projectT";
import ProjectStatusBadge from "../ProjectStatusBadge";

interface ProjectHeaderProps {
  onAddTask?: () => void;
  projectOverview: ProjectOverviewRes;
  projectSummary: ProjectSummaryRes;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onAddTask, projectOverview, projectSummary }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            {projectOverview.name}
            <ProjectStatusBadge status={projectOverview.status} />
          </h1>
          <p className="text-muted-foreground mt-1">
            {projectOverview.address.city} • Start: {projectOverview.start_date && formatIsoToDate(projectOverview.start_date)}
            {projectOverview.end_date && ` • Eind: ${formatIsoToDate(projectOverview.end_date)}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Bewerken
          </Button>
          <Button size="sm" onClick={onAddTask}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Taak toevoegen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Budget</p>
          <p className="text-2xl font-bold mt-1">{formatEuro(projectSummary.budget)}</p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Inkomsten</p>
          <p className="text-2xl font-bold mt-1">
            {/* {formatEuro(projectOverview.revenue)} */}
            {formatEuro(projectSummary.income)}
          </p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Kosten</p>
          <p className="text-2xl font-bold mt-1">
            {/* {formatEuro(projectOverview.revenue - projectOverview.profit)} */}
            {formatEuro(projectSummary.costs)}
          </p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Winst</p>
          <p className={`text-2xl font-bold mt-1 ${projectSummary.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
            {/* {formatEuro(projectOverview.profit)} */}
            {formatEuro(projectSummary.profit)}
          </p>
        </div>
      </div>

    </div>
  );
};
