import { useState } from "react";
import type { Pipeline, PipelineItem } from "@/types/pipeline";
import { toast } from "sonner";

// Sample data - in a real app, this would come from an API
const samplePipelines: Pipeline[] = [
  {
    id: "pipeline-1",
    name: "Sales Pijplijn",
    description: "Standaard verkoop proces",
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stages: [
      { id: "stage-1", name: "Lead", color: "#3b82f6", order: 0 },
      { id: "stage-2", name: "Contact gemaakt", color: "#10b981", order: 1 },
      { id: "stage-3", name: "Offerte verstuurd", color: "#f59e0b", order: 2 },
      { id: "stage-4", name: "Onderhandeling", color: "#8b5cf6", order: 3 },
      { id: "stage-5", name: "Gewonnen", color: "#84cc16", order: 4 },
      { id: "stage-6", name: "Verloren", color: "#ef4444", order: 5 },
    ],
  },
  {
    id: "pipeline-2",
    name: "Projecten Pijplijn",
    description: "Project management proces",
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stages: [
      { id: "stage-7", name: "Gepland", color: "#3b82f6", order: 0 },
      { id: "stage-8", name: "In uitvoering", color: "#f59e0b", order: 1 },
      { id: "stage-9", name: "Afronding", color: "#10b981", order: 2 },
      { id: "stage-10", name: "Afgerond", color: "#84cc16", order: 3 },
    ],
  },
];

const sampleItems: PipelineItem[] = [
  {
    id: "item-1",
    name: "Acme Corporation",
    stageId: "stage-1",
    pipelineId: "pipeline-1",
    objectId: "lead-1",
    objectType: "lead",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-2",
    name: "Globex Ltd",
    stageId: "stage-2",
    pipelineId: "pipeline-1",
    objectId: "lead-2",
    objectType: "lead",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-3",
    name: "Woonhuis renovatie",
    stageId: "stage-7",
    pipelineId: "pipeline-2",
    objectId: "project-1",
    objectType: "project",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function usePipeline() {
  const [pipelines, setPipelines] = useState<Pipeline[]>(samplePipelines);
  const [items, setItems] = useState<PipelineItem[]>(sampleItems);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>(samplePipelines[0].id);
  
  const selectedPipeline = pipelines.find(p => p.id === selectedPipelineId) || pipelines[0];

  const handlePipelineUpdate = (updatedPipeline: Pipeline) => {
    setPipelines(pipelines.map(p => 
      p.id === updatedPipeline.id ? updatedPipeline : p
    ));
    
    if (updatedPipeline.isDefault) {
      setPipelines(prev => 
        prev.map(p => 
          p.id !== updatedPipeline.id ? { ...p, isDefault: false } : p
        )
      );
    }
    
    toast.success("Pijplijn bijgewerkt");
  };
  
  const handlePipelineCreate = (newPipeline: Pipeline) => {
    let updatedPipelines = [...pipelines];
    if (newPipeline.isDefault) {
      updatedPipelines = updatedPipelines.map(p => ({ ...p, isDefault: false }));
    }
    
    setPipelines([...updatedPipelines, newPipeline]);
    setSelectedPipelineId(newPipeline.id);
    
    toast.success("Nieuwe pijplijn aangemaakt");
  };
  
  const handlePipelineDelete = (pipelineId: string) => {
    if (pipelines.length <= 1) {
      toast.error("Kan de laatste pijplijn niet verwijderen");
      return;
    }
    
    setPipelines(pipelines.filter(p => p.id !== pipelineId));
    
    if (selectedPipelineId === pipelineId) {
      setSelectedPipelineId(pipelines.find(p => p.id !== pipelineId)?.id || "");
    }
    
    setItems(items.filter(item => item.pipelineId !== pipelineId));
    
    toast.success("Pijplijn verwijderd");
  };
  
  const handleItemMove = (itemId: string, newStageId: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, stageId: newStageId, updatedAt: new Date().toISOString() } : item
    ));
  };
  
  const handleAddItem = (stageId: string) => {
    const newItem: PipelineItem = {
      id: `item-${crypto.randomUUID()}`,
      name: `Nieuw item ${items.length + 1}`,
      stageId,
      pipelineId: selectedPipelineId,
      objectId: `lead-${crypto.randomUUID()}`,
      objectType: "lead",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setItems([...items, newItem]);
  };

  return {
    pipelines,
    selectedPipeline,
    selectedPipelineId,
    items: items.filter(item => item.pipelineId === selectedPipelineId),
    setSelectedPipelineId,
    handlePipelineUpdate,
    handlePipelineCreate,
    handlePipelineDelete,
    handleItemMove,
    handleAddItem,
  };
}
