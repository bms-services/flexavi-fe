
import React, { useState } from "react";
import { Project } from "@/types/project";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectTabs } from "./ProjectTabs";

interface ProjectDetailContentProps {
  project: Project;
}

export const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      <ProjectHeader project={project} />
      <ProjectTabs project={project} />
    </div>
  );
};
