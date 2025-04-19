
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProjectsHeaderProps {
  onCreateClick: () => void;
}

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Projecten</h1>
        <p className="text-muted-foreground">
          Beheer al je projecten en bekijk hun status en winstgevendheid
        </p>
      </div>
      <Button onClick={onCreateClick}>
        <Plus className="h-4 w-4 mr-2" />
        Nieuw project
      </Button>
    </div>
  );
};
