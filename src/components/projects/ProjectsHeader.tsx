
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectsViewToggle } from "./ProjectsViewToggle";

interface ProjectsHeaderProps {
  onCreateClick: () => void;
  currentView: "table" | "card";
  onViewChange: (view: "table" | "card") => void;
}

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  onCreateClick,
  currentView,
  onViewChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          Projecten</h1>
        <p className="text-muted-foreground">
          Beheer al je projecten en bekijk hun status en winstgevendheid
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ProjectsViewToggle
          currentView={currentView}
          onViewChange={onViewChange}
        />
        <Button
          onClick={onCreateClick}
          data-create-project-button
        >
          <Plus className="h-4 w-4 mr-2" />
          Nieuw project
        </Button>
      </div>
    </div>
  );
};
