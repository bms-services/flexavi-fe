
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
  
  // Filter voor openstaande taken
  const openTasks = notes.filter(note => note.type === "task" && note.status === "open");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Projectdetails</CardTitle>
            <CardDescription>Overzicht van projectinformatie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Projectnaam</p>
              <p className="text-base">{project.name}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Beschrijving</p>
              <p className="text-base">{project.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">Startdatum</p>
                </div>
                <p className="text-base">
                  {format(new Date(project.startDate), "d MMMM yyyy", { locale: nl })}
                </p>
              </div>
              
              {project.endDate && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-muted-foreground">Einddatum</p>
                  </div>
                  <p className="text-base">
                    {format(new Date(project.endDate), "d MMMM yyyy", { locale: nl })}
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">Locatie</p>
              </div>
              <p className="text-base">{project.location}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Openstaande taken</CardTitle>
              <CardDescription>Taken die aandacht vereisen</CardDescription>
            </div>
            <Button size="sm" onClick={() => setIsTaskDialogOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
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
                      onClick={() => handleToggleTaskStatus(task.id)}
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
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Documenten</CardTitle>
            <CardDescription>Gekoppelde documenten aan dit project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileTextIcon className="h-4 w-4" />
                    Offertes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p>{project.quotes.length} offerte(s)</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileTextIcon className="h-4 w-4" />
                    Werkovereenkomsten
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p>{project.workAgreements.length} werkovereenkomst(en)</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileTextIcon className="h-4 w-4" />
                    Facturen
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p>{project.invoices.length} factuur/facturen</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
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
