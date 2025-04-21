
import React, { useState } from "react";
import { Project, ProjectNote } from "@/types/project";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectTabs } from "./ProjectTabs";

interface ProjectDetailContentProps {
  project: Project;
}

export const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({ project }) => {
  const [notes, setNotes] = useState(project.notes ?? []);
  
  const handleAddTask = (task: ProjectNote) => {
    setNotes((prev) => [...prev, task]);
  };
  
  // Voeg de project notes toe met de huidige notes state
  const projectWithNotes = {
    ...project,
    notes
  };

  return (
    <div className="space-y-6">
      <ProjectHeader project={project} onAddTask={handleAddTask} />
      <ProjectTabs project={projectWithNotes} />
    </div>
  );
};
