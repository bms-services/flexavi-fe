import React from "react";
import { ProjectNotesSection } from "../../../projects/detail/tabs/ProjectNotesSection";
import { ProjectDetailsCard } from "./ProjectDetailsCard";
import { ProjectLeadsCard } from "./ProjectLeadsCard";
import { ProjectOpenTasksCard } from "./ProjectOpenTasksCard";
import { ProjectDocumentsCard } from "./ProjectDocumentsCard";
import { ProjectOverviewRes } from "@/zustand/types/projectT";

interface ProjectOverviewProps {
  projectOverview: ProjectOverviewRes;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  projectOverview,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectDetailsCard projectOverview={projectOverview} />
        <ProjectLeadsCard projectOverview={projectOverview} />
        <ProjectOpenTasksCard />
        <ProjectNotesSection />
        <ProjectDocumentsCard projectOverview={projectOverview} />
      </div>

    </div>
  );
};
