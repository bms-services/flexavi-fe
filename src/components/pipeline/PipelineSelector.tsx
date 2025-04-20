
import React from "react";
import { Pipeline } from "@/types/pipeline";
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
    <div className="flex items-center gap-2">
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
      
      <Button variant="outline" size="sm" onClick={onCreatePipeline}>
        <Plus className="h-4 w-4 mr-2" />
        Nieuwe pijplijn
      </Button>
      
      <Button variant="outline" size="sm" onClick={onManagePipelines}>
        <Settings className="h-4 w-4 mr-2" />
        Beheer pijplijnen
      </Button>
    </div>
  );
};
