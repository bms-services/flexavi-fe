
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { mockProjects } from "@/data/mockData";

const Projects = () => {
  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <ProjectsList projects={mockProjects} />
      </div>
    </Layout>
  );
};

export default Projects;
