
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGrid, Table } from "lucide-react";

interface ProjectsViewToggleProps {
  currentView: "table" | "card";
  onViewChange: (view: "table" | "card") => void;
}

export const ProjectsViewToggle: React.FC<ProjectsViewToggleProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <div className="flex items-center">
      <span className="text-sm font-medium mr-2">Weergave:</span>
      <ToggleGroup type="single" value={currentView} onValueChange={(value) => value && onViewChange(value as "table" | "card")}>
        <ToggleGroupItem value="table" aria-label="Tabelweergave">
          <Table className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Tabel</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="card" aria-label="Kaartweergave">
          <LayoutGrid className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Kaarten</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
