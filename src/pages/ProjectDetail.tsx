
import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { mockProjects } from "@/data/mockData";
import { ProjectDetailContent } from "@/components/projects/detail/ProjectDetailContent";
import NotFound from "./NotFound";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = mockProjects.find(project => project.id === id);

  if (!project) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <ProjectDetailContent project={project} />
      </div>
    </Layout>
  );
};

export default ProjectDetail;
