
import React, { useState } from "react";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsTable } from "./ProjectsTable";
import { Project } from "@/types/project";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { toast } from "sonner";

interface ProjectsListProps {
  projects: Project[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [projectsList, setProjectsList] = useState<Project[]>(projects);

  const handleCreateProject = (project: Partial<Project>) => {
    const newProject: Project = {
      ...project as Project,
      id: `proj-${projectsList.length + 1}`,
      expenses: [],
      personnel: [],
      leads: [],
      quotes: [],
      invoices: [],
      workAgreements: [],
      photos: [],
      revenue: 0,
      profit: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjectsList([...projectsList, newProject]);
    toast.success("Project succesvol aangemaakt");
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <ProjectsHeader onCreateClick={() => setIsCreateDialogOpen(true)} />
      <ProjectsTable projects={projectsList} />
      <CreateProjectDialog 
        isOpen={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateProject}
      />
    </div>
  );
};
