import React from "react";
import { ProjectNotesSection } from "../../../projects/detail/tabs/ProjectNotesSection";
import { ProjectDetailsCard } from "./ProjectDetailsCard";
import { ProjectLeadsCard } from "./ProjectLeadsCard";
import { ProjectOpenTasksCard } from "./ProjectOpenTasksCard";
import { ProjectDocumentsCard } from "./ProjectDocumentsCard";
import { ProjectNoteRes, ProjectOverviewRes, ProjectRes, ProjectTaskRes } from "@/zustand/types/projectT";

interface ProjectOverviewProps {
  projectOverview: ProjectOverviewRes;
  projectTasks: ProjectTaskRes[];
  onOpenCreateTask: () => void;
  projectNotes: ProjectNoteRes[];
  onOpenCreateNote: () => void;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  projectOverview,
  projectTasks,
  onOpenCreateTask,
  projectNotes,
  onOpenCreateNote,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectDetailsCard projectOverview={projectOverview} />
        <ProjectLeadsCard projectOverview={projectOverview} />
        <ProjectOpenTasksCard
          projectTasks={projectTasks}
          onOpenCreateTask={onOpenCreateTask}
        />
        <ProjectNotesSection
          projectNotes={projectNotes}
          onOpenCreateNote={onOpenCreateNote}
        />
        <ProjectDocumentsCard projectOverview={projectOverview} />
      </div>

    </div>
  );
};
