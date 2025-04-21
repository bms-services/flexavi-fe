
import { useState } from "react";
import type { Pipeline, PipelineItem } from "@/types/pipeline";
import { fixedPipelines, sampleItems } from "./usePipelineData";
import { getSelectedPipeline, movePipelineItem, addPipelineItem, reorderPipelineItem } from "./usePipelineActions";
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

  // NIEUW: reorder support voor sorteren binnen stages
  const handleItemReorder = (stageId: string, fromIndex: number, toIndex: number) => {
    reorderPipelineItem(items, setItems, stageId, fromIndex, toIndex);
    toast.success("Item volgorde bijgewerkt");
  };

  return {
    pipelines,
    selectedPipeline,
    selectedPipelineId,
    // Zie hier sortering per order binnen stage direct:
    items: items
      .filter(item => item.pipelineId === selectedPipelineId)
      .sort((a, b) => ((a.stageId + (a.order ?? 0)).localeCompare(b.stageId + (b.order ?? 0)))),
    setSelectedPipelineId,
    handleItemMove,
    handleAddItem,
    handleItemReorder,
    handlePipelineUpdate: () => toast.error("Aanpassen van vaste pijplijnen niet mogelijk"),
    handlePipelineCreate: () => toast.error("Aanmaken van nieuwe pijplijnen niet mogelijk"),
    handlePipelineDelete: () => toast.error("Verwijderen van vaste pijplijnen niet mogelijk"),
  };
}
