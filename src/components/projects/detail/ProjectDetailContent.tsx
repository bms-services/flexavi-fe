
import React, { useEffect, useState } from "react";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectTabs } from "./ProjectTabs";
import { TaskDialog } from "./tabs/TaskDialog";
import { useCreateProjectEmployee, useCreateProjectNote, useCreateProjectTask, useGetProjectEmployees, useGetProjectNotes, useGetProjectOverview, useGetProjectSummary, useGetProjectTasks } from "@/zustand/hooks/useProject";
import { useParams } from "react-router-dom";
import { ProjectEmployeeReq, ProjectNoteReq, ProjectOverviewRes, ProjectSummaryRes, ProjectTaskReq } from "@/zustand/types/projectT";
import NotFound from "@/pages/NotFound";
import { ParamGlobal } from "@/zustand/types/apiT";
import { FormProvider, useForm } from "react-hook-form";
import { NoteDialog } from "./tabs/NoteDialog";
import { EmployeeDialog } from "./tabs/EmployeeDialog";


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

const defaultProjectTasks: ProjectTaskReq = {
  description: "",
  start_date: "",
  end_date: "",
  status: "open",
  assign_to: [],
}

const defaultProjectNotes: ProjectNoteReq = {
  notes: "",
  assign_to: []
}

const defaultParams: ParamGlobal = {
  page: 1,
  per_page: 10,
  search: "",
  sorts: {},
  filters: {}
};

export const ProjectDetailContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);

  const [projectTasksParam, setProjectTasksParam] = useState<ParamGlobal>(
    defaultParams
  );

  const [projectNotesParam, setProjectNotesParam] = useState<ParamGlobal>(
    defaultParams
  );

  const [projectEmployeesParam, setProjectEmployeesParam] = useState<ParamGlobal>(
    defaultParams
  );

  const formProjectTask = useForm<ProjectTaskReq>({
    defaultValues: defaultProjectTasks,
  });

  const formProjectNote = useForm<ProjectNoteReq>({
    defaultValues: defaultProjectNotes,
  });

  const formProjectEmployee = useForm<ProjectEmployeeReq>({
    defaultValues: {
      staffs: []
    }
  });

  const getProjectOverviewZ = useGetProjectOverview(id || "");
  const getProjectSummaryZ = useGetProjectSummary(id || "");

  const getProjectTasksZ = useGetProjectTasks(id || "", projectTasksParam);
  const createProjectTaskZ = useCreateProjectTask(id || "");

  const getProjectNotesZ = useGetProjectNotes(id || "", projectNotesParam);
  const createProjectNoteZ = useCreateProjectNote(id || "");

  // const getProjectEmployeesZ = useGetProjectEmployees(id || "", projectEmployeesParam);
  const createProjectEmployeeZ = useCreateProjectEmployee(id || "");

  const projectOverview = getProjectOverviewZ.data?.result || defaultProjectOverview;
  const projectSummary = getProjectSummaryZ.data?.result || defaultProjectSummary;
  const projectTasks = getProjectTasksZ.data?.result?.data || []
  const projectNotes = getProjectNotesZ.data?.result?.data || [];

  const handleCreateTask = () => {
    setIsTaskDialogOpen(true);
  }

  const handleStoreTask = async (data: ProjectTaskReq) => {
    await createProjectTaskZ.mutateAsync({
      ...data,
      assign_to: data.assign_to.map((user) =>
        typeof user === "string" ? user : user.value
      ),
    });
  }

  const handleCreateNote = () => {
    setIsNoteDialogOpen(true);
  }

  const handleStoreNote = async (data: ProjectNoteReq) => {
    await createProjectNoteZ.mutateAsync({
      ...data,
      assign_to: data.assign_to.map((user) =>
        typeof user === "string" ? user : user.value
      ),
    });
  }

  const handleCreateEmployee = () => {
    setIsEmployeeDialogOpen(true);
  }

  const handleStoreEmployee = async (data: ProjectEmployeeReq) => {
    await createProjectEmployeeZ.mutateAsync({
      staffs: data.staffs.map((user) =>
        typeof user === "string" ? user : user.value
      ),
    });
  }

  useEffect(() => {
    if (createProjectNoteZ.isSuccess) {
      formProjectTask.reset(defaultProjectNotes);
      setIsNoteDialogOpen(false);
    }
  }, [createProjectNoteZ.isSuccess, formProjectTask]);


  useEffect(() => {
    if (createProjectTaskZ.isSuccess) {
      formProjectTask.reset(defaultProjectTasks);
      setIsTaskDialogOpen(false);
    }
  }, [createProjectTaskZ.isSuccess, formProjectTask]);

  useEffect(() => {
    if (createProjectEmployeeZ.isSuccess) {
      formProjectEmployee.reset({ staffs: [] });
      setIsEmployeeDialogOpen(false);
    }
  }, [createProjectEmployeeZ.isSuccess, formProjectEmployee]);

  if (getProjectOverviewZ.isError) {
    return <NotFound />;
  }

  return (
    <div className="space-y-6">
      <ProjectHeader
        onAddTask={handleCreateTask}
        projectOverview={projectOverview}
        projectSummary={projectSummary} />

      <ProjectTabs
        projectOverview={projectOverview}
        projectTasks={projectTasks}
        onOpenCreateTask={handleCreateTask}
        projectNotes={projectNotes}
        onOpenCreateNote={handleCreateNote}
        onOpenCreateEmployee={handleCreateEmployee}
      />

      <FormProvider {...formProjectTask}>
        <TaskDialog
          open={isTaskDialogOpen}
          onOpenChange={setIsTaskDialogOpen}
          handleStore={formProjectTask.handleSubmit(handleStoreTask)}
        />
      </FormProvider>

      <FormProvider {...formProjectNote}>
        <NoteDialog
          open={isNoteDialogOpen}
          onOpenChange={setIsNoteDialogOpen}
          handleStore={formProjectNote.handleSubmit(handleStoreNote)}
        />
      </FormProvider>

      <FormProvider {...formProjectEmployee}>
        <EmployeeDialog
          open={isEmployeeDialogOpen}
          onOpenChange={setIsEmployeeDialogOpen}
          handleStore={formProjectEmployee.handleSubmit(handleStoreEmployee)}
        />
      </FormProvider>
    </div>
  );
};
