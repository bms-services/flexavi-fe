
import React from "react";
import type { Pipeline } from "@/types/pipeline";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";

interface PipelineSelectorProps {
  pipelines: Pipeline[];
  selectedPipelineId: string;
  onSelectPipeline: (pipelineId: string) => void;
  onCreatePipeline: () => void;
  onManagePipelines: () => void;
}

export const PipelineSelector: React.FC<PipelineSelectorProps> = ({
  pipelines,
  selectedPipelineId,
  onSelectPipeline,
  onCreatePipeline,
  onManagePipelines,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={selectedPipelineId} onValueChange={onSelectPipeline}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Selecteer een pijplijn" />
        </SelectTrigger>
        <SelectContent>
          {pipelines.map((pipeline) => (
            <SelectItem key={pipeline.id} value={pipeline.id}>
              {pipeline.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onCreatePipeline}>
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Nieuwe pijplijn</span>
          <span className="sm:hidden">Nieuw</span>
        </Button>
        
        <Button variant="outline" size="sm" onClick={onManagePipelines}>
          <Settings className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Beheer pijplijnen</span>
          <span className="sm:hidden">Beheer</span>
        </Button>
      </div>
    </div>
  );
};
