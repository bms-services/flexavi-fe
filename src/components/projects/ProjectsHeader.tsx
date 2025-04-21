
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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Projecten</h1>
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
