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
import { Project } from "@/types/project";
import { CalendarIcon, MapPinIcon, FileTextIcon, Users } from "lucide-react";

interface ProjectOverviewProps {
  project: Project;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  const [notes, setNotes] = useState(project.notes ?? []);

  const handleAddNote = (note: any) => {
    setNotes((prev) => [...prev, note]);
  };

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
          <CardHeader>
            <CardTitle>Gekoppelde leads</CardTitle>
            <CardDescription>Leads verbonden aan dit project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.leads.length > 0 ? (
              <div className="space-y-2">
                {project.leads.map((leadId) => (
                  <div key={leadId} className="flex items-center gap-2 rounded-md border p-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Lead ID: {leadId}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Er zijn nog geen leads gekoppeld aan dit project
              </p>
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
    </div>
  );
};
