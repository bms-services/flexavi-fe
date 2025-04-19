
import React, { useState } from "react";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsTable } from "./ProjectsTable";
import { Project } from "@/types/project";
import { ProjectWizard } from "./wizard/ProjectWizard";

interface ProjectsListProps {
  projects: Project[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [projectsList, setProjectsList] = useState<Project[]>(projects);

  return (
    <div className="space-y-6">
      <ProjectsHeader onCreateClick={() => setIsWizardOpen(true)} />
      <ProjectsTable projects={projectsList} />
      <ProjectWizard 
        isOpen={isWizardOpen} 
        onOpenChange={setIsWizardOpen}
      />
    </div>
  );
};
