
import React, { useState } from "react";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectTabs } from "./ProjectTabs";
import { TaskDialog } from "./tabs/TaskDialog";
import { useGetProject, useGetProjectOverview } from "@/zustand/hooks/useProject";
import { useParams } from "react-router-dom";
import { ProjectOverviewRes, ProjectRes } from "@/zustand/types/projectT";
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
  project_leads: []
}

export const ProjectDetailContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();


  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

  const getProjectOverviewZ = useGetProjectOverview(id || "");


  const handleAddTask = () => {

  }
  const projectOverview = getProjectOverviewZ.data?.result || defaultProjectOverview;


  if (getProjectOverviewZ.isError) {
    return <NotFound />;
  }

  console.log(projectOverview);


  return (
    <div className="space-y-6">
      <ProjectHeader onAddTask={handleAddTask} projectOverview={projectOverview} />
      {/* <ProjectTabs project={project} /> */}



      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        onAddTask={handleAddTask}
      />
    </div>
  );
};
