import React, { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Project, ProjectNote } from "@/types/project";
import { 
  CalendarIcon, 
  MapPinIcon, 
  FileTextIcon, 
  Users, 
  CheckCircle, 
  Clock, 
  PlusCircle 
} from "lucide-react";
import { ProjectNotesSection } from "../../../projects/detail/tabs/ProjectNotesSection";
import { Button } from "@/components/ui/button";
import { TaskDialog } from "./TaskDialog";
import { mockLeads } from "@/data/mockLeads";
import { ProjectDetailsCard } from "./ProjectDetailsCard";
import { ProjectLeadsCard } from "./ProjectLeadsCard";
import { ProjectOpenTasksCard } from "./ProjectOpenTasksCard";
import { ProjectDocumentsCard } from "./ProjectDocumentsCard";

interface ProjectOverviewProps {
  project: Project;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  const [notes, setNotes] = useState(project.notes ?? []);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  
  const handleAddNote = (note: ProjectNote) => {
    setNotes((prev) => [...prev, note]);
  };
  
  const handleAddTask = (task: ProjectNote) => {
    setNotes((prev) => [...prev, task]);
  };
  
  const handleToggleTaskStatus = (taskId: string) => {
    setNotes((prev) => 
      prev.map(note => 
        note.id === taskId && note.type === "task" 
          ? { ...note, status: note.status === "open" ? "completed" : "open" } 
          : note
      )
    );
  };
  
  const openTasks = notes.filter(note => note.type === "task" && note.status === "open");
  const projectLeads = mockLeads.filter(l => project.leads?.includes(l.id));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectDetailsCard project={project} />
        <ProjectLeadsCard projectLeads={projectLeads} />
        <ProjectOpenTasksCard
          openTasks={openTasks}
          onAddTaskClick={() => setIsTaskDialogOpen(true)}
          onToggleTaskStatus={handleToggleTaskStatus}
        />
        <ProjectDocumentsCard project={project} />
      </div>
      <ProjectNotesSection notes={notes} onAddNote={handleAddNote} />
      <TaskDialog 
        open={isTaskDialogOpen} 
        onOpenChange={setIsTaskDialogOpen} 
        onAddTask={handleAddTask} 
      />
    </div>
  );
};
