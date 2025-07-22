
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, MapPin as MapPinIcon } from "lucide-react";
import { ProjectOverviewRes } from "@/zustand/types/projectT";
import { formatIsoToDate } from "@/utils/format";

interface ProjectDetailsCardProps {
  projectOverview: ProjectOverviewRes;
}

export const ProjectDetailsCard: React.FC<ProjectDetailsCardProps> = ({ projectOverview }) => (
  <Card>
    <CardHeader>
      <CardTitle>Projectdetails</CardTitle>
      <CardDescription>Overzicht van projectinformatie</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Projectnaam</p>
        <p className="text-base">{projectOverview.name}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Beschrijving</p>
        <p className="text-base">{projectOverview.description}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">Startdatum</p>
          </div>
          <p className="text-base">
            {projectOverview.start_date && formatIsoToDate(projectOverview.start_date)}
          </p>
        </div>
        {projectOverview.end_date && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">Einddatum</p>
            </div>
            <p className="text-base">
              {projectOverview.end_date && formatIsoToDate(projectOverview.end_date)}
            </p>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">Locatie</p>
        </div>
        <p className="text-base">{projectOverview.address.street}</p>
      </div>
    </CardContent>
  </Card>
);
