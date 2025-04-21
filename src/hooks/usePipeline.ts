import { useState } from "react";
import type { Pipeline, PipelineItem } from "@/types/pipeline";
import { toast } from "sonner";

// Define the 5 fixed pipelines with their stages
const fixedPipelines: Pipeline[] = [
  {
    id: "pipeline-callbacks",
    name: "Terug bel lijst",
    description: "Opvolging van terug te bellen klanten",
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stages: [
      { id: "stage-callbacks-1", name: "Nog te bellen", color: "#3b82f6", order: 0 },
      { id: "stage-callbacks-2", name: "1x GGH", color: "#f59e0b", order: 1 },
      { id: "stage-callbacks-3", name: "2x GGH", color: "#f59e0b", order: 2 },
      { id: "stage-callbacks-4", name: "3x GGH", color: "#f59e0b", order: 3 },
      { id: "stage-callbacks-5", name: "4x GGH", color: "#f59e0b", order: 4 },
      { id: "stage-callbacks-6", name: "5x GGH", color: "#f59e0b", order: 5 },
      { id: "stage-callbacks-7", name: "6x GGH", color: "#f59e0b", order: 6 },
      { id: "stage-callbacks-8", name: "Ingepland", color: "#10b981", order: 7 },
      { id: "stage-callbacks-9", name: "Afgevallen", color: "#ef4444", order: 8 },
    ],
  },
  {
    id: "pipeline-reschedule",
    name: "Opnieuw in te plannen afspraken",
    description: "Afspraken die opnieuw ingepland moeten worden",
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stages: [
      { id: "stage-reschedule-1", name: "Nog te bellen", color: "#3b82f6", order: 0 },
      { id: "stage-reschedule-2", name: "1x GGH", color: "#f59e0b", order: 1 },
      { id: "stage-reschedule-3", name: "2x GGH", color: "#f59e0b", order: 2 },
      { id: "stage-reschedule-4", name: "3x GGH", color: "#f59e0b", order: 3 },
      { id: "stage-reschedule-5", name: "4x GGH", color: "#f59e0b", order: 4 },
      { id: "stage-reschedule-6", name: "5x GGH", color: "#f59e0b", order: 5 },
      { id: "stage-reschedule-7", name: "6x GGH", color: "#f59e0b", order: 6 },
      { id: "stage-reschedule-8", name: "Ingepland", color: "#10b981", order: 7 },
      { id: "stage-reschedule-9", name: "Afgevallen", color: "#ef4444", order: 8 },
    ],
  },
  {
    id: "pipeline-quotes",
    name: "Op te volgen offertes",
    description: "Opvolging van verstuurde offertes",
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stages: [
      { id: "stage-quotes-1", name: "Nog te bellen", color: "#3b82f6", order: 0 },
      { id: "stage-quotes-2", name: "Opnieuw verstuurd", color: "#8b5cf6", order: 1 },
      { id: "stage-quotes-3", name: "Onderhandeling", color: "#f59e0b", order: 2 },
      { id: "stage-quotes-4", name: "Gewonnen", color: "#10b981", order: 3 },
      { id: "stage-quotes-5", name: "Verloren", color: "#ef4444", order: 4 },
    ],
  },
  {
    id: "pipeline-invoices",
    name: "Op te volgen facturen",
    description: "Opvolging van verstuurde facturen",
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stages: [
      { id: "stage-invoices-1", name: "Nog te betalen", color: "#3b82f6", order: 0 },
      { id: "stage-invoices-2", name: "Betaling uitgesteld", color: "#f59e0b", order: 1 },
      { id: "stage-invoices-3", name: "Weigert te betalen", color: "#ef4444", order: 2 },
      { id: "stage-invoices-4", name: "Betaalafspraak gemaakt", color: "#8b5cf6", order: 3 },
      { id: "stage-invoices-5", name: "Betaald", color: "#10b981", order: 4 },
    ],
  },
  {
    id: "pipeline-warranty",
    name: "Nog te plannen garanties",
    description: "Opvolging van garantie aanvragen",
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stages: [
      { id: "stage-warranty-1", name: "Inkomende garanties", color: "#3b82f6", order: 0 },
      { id: "stage-warranty-2", name: "Gebeld", color: "#f59e0b", order: 1 },
      { id: "stage-warranty-3", name: "Ingepland", color: "#8b5cf6", order: 2 },
      { id: "stage-warranty-4", name: "Niet opgelost na 1x", color: "#ef4444", order: 3 },
      { id: "stage-warranty-5", name: "Opgelost", color: "#10b981", order: 4 },
    ],
  },
];

// Sample data for pipelines
const sampleItems: PipelineItem[] = [
  {
    id: "item-1",
    name: "Niels de Vries",
    stageId: "stage-callbacks-1",
    pipelineId: "pipeline-callbacks",
    objectId: "lead-1",
    objectType: "lead",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-2",
    name: "Marco Jansen",
    stageId: "stage-callbacks-2",
    pipelineId: "pipeline-callbacks",
    objectId: "lead-2",
    objectType: "lead",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-3",
    name: "Familie Bakker",
    stageId: "stage-quotes-1",
    pipelineId: "pipeline-quotes",
    objectId: "quote-1",
    objectType: "quote",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-4",
    name: "Firma Jansen BV",
    stageId: "stage-invoices-1",
    pipelineId: "pipeline-invoices",
    objectId: "invoice-1",
    objectType: "invoice",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-5",
    name: "Kees van den Berg",
    stageId: "stage-warranty-1",
    pipelineId: "pipeline-warranty",
    objectId: "project-1",
    objectType: "project",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function usePipeline() {
  const [pipelines] = useState<Pipeline[]>(fixedPipelines);
  const [items, setItems] = useState<PipelineItem[]>(sampleItems);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>(fixedPipelines[0].id);
  
  const selectedPipeline = pipelines.find(p => p.id === selectedPipelineId) || pipelines[0];

  const handleItemMove = (itemId: string, newStageId: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, stageId: newStageId, updatedAt: new Date().toISOString() } : item
    ));
    
    toast.success("Item verplaatst naar een nieuwe fase");
  };
  
  const handleAddItem = (stageId: string) => {
    // Determine the object type based on the selected pipeline
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
