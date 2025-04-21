
import { useState } from "react";
import type { Pipeline, PipelineItem } from "@/types/pipeline";
import { fixedPipelines, sampleItems } from "./usePipelineData";
import { getSelectedPipeline, movePipelineItem, addPipelineItem } from "./usePipelineActions";
import { toast } from "sonner";

export function usePipeline() {
  const [pipelines] = useState<Pipeline[]>(fixedPipelines);
  const [items, setItems] = useState<PipelineItem[]>(sampleItems);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>(fixedPipelines[0].id);

  const selectedPipeline = getSelectedPipeline(pipelines, selectedPipelineId);

  const handleItemMove = (itemId: string, newStageId: string) => {
    movePipelineItem(items, setItems, itemId, newStageId);
  };

  const handleAddItem = (stageId: string) => {
    addPipelineItem(items, setItems, selectedPipelineId, stageId);
  };

  return {
    pipelines,
    selectedPipeline,
    selectedPipelineId,
    items: items.filter(item => item.pipelineId === selectedPipelineId),
    setSelectedPipelineId,
    handleItemMove,
    handleAddItem,
    handlePipelineUpdate: () => toast.error("Aanpassen van vaste pijplijnen niet mogelijk"),
    handlePipelineCreate: () => toast.error("Aanmaken van nieuwe pijplijnen niet mogelijk"),
    handlePipelineDelete: () => toast.error("Verwijderen van vaste pijplijnen niet mogelijk"),
  };
}
