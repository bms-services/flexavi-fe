
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, MapPin as MapPinIcon } from "lucide-react";
import { Project } from "@/types/project";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface ProjectDetailsCardProps {
  project: Project;
}

export const ProjectDetailsCard: React.FC<ProjectDetailsCardProps> = ({ project }) => (
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
);
