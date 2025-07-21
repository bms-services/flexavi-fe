
import React, { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ProjectNote } from "@/types/project";
// import { ProjectStatusBadge } from "../ProjectStatusBadge";
import { Edit, PlusCircle } from "lucide-react";
import { formatCurrency, formatEuro, formatIsoToDate } from "@/utils/format";
import { ProjectOverviewRes } from "@/zustand/types/projectT";

interface ProjectHeaderProps {
  onAddTask?: () => void;
  projectOverview: ProjectOverviewRes;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onAddTask, projectOverview }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            {projectOverview.name}
            {/* <ProjectStatusBadge status={project.status} /> */}
          </h1>
          <p className="text-muted-foreground mt-1">
            {projectOverview.address.city} • Start: {formatIsoToDate(projectOverview.start_date)}
            {/* {projectOverview.end_date && ` • Eind: ${formatIsoToDate(projectOverview.end_date)}`} */}
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
          <p className="text-2xl font-bold mt-1">{formatEuro(projectOverview.budget)}</p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Inkomsten</p>
          {/* <p className="text-2xl font-bold mt-1">{formatEuro(projectOverview.revenue)}</p> */}
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Kosten</p>
          <p className="text-2xl font-bold mt-1">
            {/* {formatEuro(projectOverview.revenue - projectOverview.profit)} */}
          </p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Winst</p>
          <p className={`text-2xl font-bold mt-1 ${projectOverview.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
            {formatEuro(projectOverview.profit)}
          </p>
        </div>
      </div>

    </div>
  );
};
