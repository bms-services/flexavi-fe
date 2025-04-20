
import React from "react";
import type { Pipeline } from "@/types/pipeline";
import { PipelineSelector } from "./PipelineSelector";

interface PipelineHeaderProps {
  pipelines: Pipeline[];
  selectedPipelineId: string;
  onSelectPipeline: (id: string) => void;
  onCreatePipeline: () => void;
  onManagePipelines: () => void;
}

export const PipelineHeader: React.FC<PipelineHeaderProps> = ({
  pipelines,
  selectedPipelineId,
  onSelectPipeline,
  onCreatePipeline,
  onManagePipelines,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Pijplijn</h1>
      <PipelineSelector 
        pipelines={pipelines}
        selectedPipelineId={selectedPipelineId}
        onSelectPipeline={onSelectPipeline}
        onCreatePipeline={onCreatePipeline}
        onManagePipelines={onManagePipelines}
      />
    </div>
  );
};
