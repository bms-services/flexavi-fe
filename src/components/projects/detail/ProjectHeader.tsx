
import React, { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Project, ProjectNote } from "@/types/project";
// import { ProjectStatusBadge } from "../ProjectStatusBadge";
import { Edit, PlusCircle } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { TaskDialog } from "./tabs/TaskDialog";

interface ProjectHeaderProps {
  project: Project;
  onAddTask?: (task: ProjectNote) => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, onAddTask }) => {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

  const handleAddTask = (task: ProjectNote) => {
    if (onAddTask) {
      onAddTask(task);
    }
    setIsTaskDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            {project.name}
            {/* <ProjectStatusBadge status={project.status} /> */}
          </h1>
          <p className="text-muted-foreground mt-1">
            {project.location} • Start: {format(new Date(project.startDate), "d MMMM yyyy", { locale: nl })}
            {project.endDate && ` • Eind: ${format(new Date(project.endDate), "d MMMM yyyy", { locale: nl })}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Bewerken
          </Button>
          <Button size="sm" onClick={() => setIsTaskDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Taak toevoegen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Budget</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(project.budget)}</p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Inkomsten</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(project.revenue)}</p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Kosten</p>
          <p className="text-2xl font-bold mt-1">
            {formatCurrency(project.revenue - project.profit)}
          </p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">Winst</p>
          <p className={`text-2xl font-bold mt-1 ${project.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
            {formatCurrency(project.profit)}
          </p>
        </div>
      </div>

      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        onAddTask={handleAddTask}
      />
    </div>
  );
};
