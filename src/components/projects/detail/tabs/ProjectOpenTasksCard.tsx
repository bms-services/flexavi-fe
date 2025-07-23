
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock } from "lucide-react";
import { ProjectTaskReq } from "@/zustand/types/projectT";
import { formatIsoToDate } from "@/utils/format";
import { useCreateProjectTask, useGetProjectTasks } from "@/zustand/hooks/useProject";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { defaultParams, ParamGlobal } from "@/zustand/types/apiT";
import { TaskDialog } from "./TaskDialog";

const defaultProjectTasks: ProjectTaskReq = {
  description: "",
  start_date: "",
  end_date: "",
  status: "open",
  assign_to: [],
}


export const ProjectOpenTasksCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [projectTasksParam, setProjectTasksParam] = useState<ParamGlobal>(
    defaultParams
  );

  const formProjectTask = useForm<ProjectTaskReq>({
    defaultValues: defaultProjectTasks,
  });

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

  const getProjectTasksZ = useGetProjectTasks(id || "", projectTasksParam);
  const createProjectTaskZ = useCreateProjectTask(id || "");


  const handleCreateTask = () => {
    setIsTaskDialogOpen(true);
  }


  const projectTasks = getProjectTasksZ.data?.result?.data || []


  const handleStoreTask = async (data: ProjectTaskReq) => {
    await createProjectTaskZ.mutateAsync({
      ...data,
      assign_to: data.assign_to.map((user) =>
        typeof user === "string" ? user : user.value
      ),
    });
  }


  useEffect(() => {
    if (createProjectTaskZ.isSuccess) {
      formProjectTask.reset(defaultProjectTasks);
      setIsTaskDialogOpen(false);
    }
  }, [createProjectTaskZ.isSuccess, formProjectTask]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Openstaande taken</CardTitle>
            <CardDescription>Taken die aandacht vereisen</CardDescription>
          </div>
          <Button size="sm" onClick={handleCreateTask}>
            <Plus className="h-4 w-4 mr-2" />
            Taak toevoegen
          </Button>
        </CardHeader>
        <CardContent>
          {projectTasks.length > 0 ? (
            <div className="space-y-3">
              {projectTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 border rounded-md p-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 mt-1"
                  // onClick={() => onToggleTaskStatus(task.id)}
                  >
                    <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center" />
                  </Button>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{task.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {/* Voor: {task.createdFor} • Gemaakt door: {task.createdBy} */}
                    </div>
                    {task.end_date && (
                      <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                        <Clock className="h-3 w-3" />
                        Vervaldatum: {formatIsoToDate(task.end_date)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>Geen openstaande taken</p>
              <p className="text-sm">Voeg taken toe om het project te beheren</p>
            </div>
          )}
        </CardContent>
      </Card>



      <FormProvider {...formProjectTask}>
        <TaskDialog
          open={isTaskDialogOpen}
          onOpenChange={setIsTaskDialogOpen}
          handleStore={formProjectTask.handleSubmit(handleStoreTask)}
        />
      </FormProvider>
    </>
  )
}

