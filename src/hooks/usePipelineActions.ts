
import type { Pipeline, PipelineItem } from "@/types/pipeline";
import { toast } from "sonner";

export function getSelectedPipeline(pipelines: Pipeline[], selectedPipelineId: string): Pipeline {
  return pipelines.find(p => p.id === selectedPipelineId) || pipelines[0];
}

export function movePipelineItem(
  items: PipelineItem[],
  setItems: (x: PipelineItem[]) => void,
  itemId: string,
  newStageId: string
) {
  setItems(items.map(item => 
    item.id === itemId ? { ...item, stageId: newStageId, updatedAt: new Date().toISOString() } : item
  ));
  toast.success("Item verplaatst naar een nieuwe fase");
}

export function addPipelineItem(
  items: PipelineItem[],
  setItems: (x: PipelineItem[]) => void,
  selectedPipelineId: string,
  stageId: string
) {
  let objectType: "lead" | "project" | "quote" | "invoice" = "lead";
  switch (selectedPipelineId) {
    case "pipeline-callbacks":
    case "pipeline-reschedule":
      objectType = "lead";
      break;
    case "pipeline-quotes":
      objectType = "quote";
      break;
    case "pipeline-invoices":
      objectType = "invoice";
      break;
    case "pipeline-warranty":
      objectType = "project";
      break;
  }

  const newItem: PipelineItem = {
    id: `item-${crypto.randomUUID()}`,
    name: `Nieuwe ${objectType === "lead" ? "klant" : objectType} ${items.length + 1}`,
    stageId,
    pipelineId: selectedPipelineId,
    objectId: `${objectType}-${crypto.randomUUID()}`,
    objectType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  setItems([...items, newItem]);
  toast.success("Nieuw item toegevoegd");
}
