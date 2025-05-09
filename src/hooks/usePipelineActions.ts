
import type { Pipeline, PipelineItem } from "@/types/pipeline";


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
}

// NIEUW: reorderPipelineItem voor sorteren binnen stadium
export function reorderPipelineItem(
  items: PipelineItem[],
  setItems: (x: PipelineItem[]) => void,
  stageId: string,
  fromIndex: number,
  toIndex: number
) {
  const copied = [...items];
  const stageItems = copied.filter(i => i.stageId === stageId).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const item = stageItems[fromIndex];
  if (!item) return;

  stageItems.splice(fromIndex, 1);
  stageItems.splice(toIndex, 0, item);
  // Nieuwe order toewijzen
  stageItems.forEach((item, idx) => (item.order = idx));

  // Alles terugzetten in kopie
  const newItems = copied.map(i =>
    i.stageId === stageId
      ? stageItems.find(si => si.id === i.id) ?? i
      : i
  );
  setItems(newItems);
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

  // Volgorde op einde zetten
  const order = Math.max(
    0,
    ...items.filter(i => i.stageId === stageId).map(i => i.order ?? 0)
  ) + 1;

  const newItem: PipelineItem = {
    id: `item-${crypto.randomUUID()}`,
    name: `Nieuwe ${objectType === "lead" ? "klant" : objectType} ${items.length + 1}`,
    stageId,
    pipelineId: selectedPipelineId,
    objectId: `${objectType}-${crypto.randomUUID()}`,
    objectType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order,
  };

  setItems([...items, newItem]);
}
