
import React, { } from "react";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectTabs } from "./ProjectTabs";
import { useGetProjectOverview, useGetProjectSummary } from "@/zustand/hooks/useProject";
import { useParams } from "react-router-dom";
import { ProjectOverviewRes, ProjectSummaryRes } from "@/zustand/types/projectT";
import NotFound from "@/pages/NotFound";


const defaultProjectOverview: ProjectOverviewRes = {
  id: "",
  company_id: "",
  name: "",
  description: "",
  status: "active",
  start_date: "",
  budget: 0,
  profit: 0,
  total_document_quote: 0,
  total_document_agreement: 0,
  total_document_invoice: 0,
  created_at: "",
  updated_at: "",
  address: {
    street: "",
    postal_code: "",
    house_number: "",
    house_number_addition: undefined,
    city: "",
    province: ""
  },
  project_leads: [],
  end_date: ""
}

const defaultProjectSummary: ProjectSummaryRes = {
  budget: 0,
  income: 0,
  costs: 0,
  profit: 0
}



export const ProjectDetailContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const getProjectOverviewZ = useGetProjectOverview(id || "");
  const getProjectSummaryZ = useGetProjectSummary(id || "");

  const projectOverview = getProjectOverviewZ.data?.result || defaultProjectOverview;
  const projectSummary = getProjectSummaryZ.data?.result || defaultProjectSummary;

  if (getProjectOverviewZ.isError) {
    return <NotFound />;
  }

  return (
    <div className="space-y-6">
      <ProjectHeader
        projectOverview={projectOverview}
        projectSummary={projectSummary}
      />

      <ProjectTabs
        projectOverview={projectOverview}
      />
    </div>
  );
};
