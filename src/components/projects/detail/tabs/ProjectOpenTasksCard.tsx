
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectNote } from "@/types/project";
import { Plus, Clock } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface ProjectOpenTasksCardProps {
  openTasks: ProjectNote[];
  onAddTaskClick: () => void;
  onToggleTaskStatus: (taskId: string) => void;
}

export const ProjectOpenTasksCard: React.FC<ProjectOpenTasksCardProps> = ({
  openTasks, onAddTaskClick, onToggleTaskStatus
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Openstaande taken</CardTitle>
        <CardDescription>Taken die aandacht vereisen</CardDescription>
      </div>
      <Button size="sm" onClick={onAddTaskClick}>
        <Plus className="h-4 w-4 mr-2" />
        Taak toevoegen
      </Button>
    </CardHeader>
    <CardContent>
      {openTasks.length > 0 ? (
        <div className="space-y-3">
          {openTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 border rounded-md p-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 mt-1"
                onClick={() => onToggleTaskStatus(task.id)}
              >
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center" />
              </Button>
              <div className="flex-1">
                <div className="text-sm font-medium">{task.note}</div>
                <div className="text-xs text-muted-foreground">
                  Voor: {task.createdFor} • Gemaakt door: {task.createdBy}
                </div>
                {task.dueDate && (
                  <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                    <Clock className="h-3 w-3" />
                    Vervaldatum: {format(new Date(task.dueDate), "d MMMM yyyy", { locale: nl })}
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
);
