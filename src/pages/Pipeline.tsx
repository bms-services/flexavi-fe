import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PipelineBoard } from "@/components/pipeline/PipelineBoard";
import { PipelineSelector } from "@/components/pipeline/PipelineSelector";
import { PipelineManagementDialog } from "@/components/pipeline/PipelineManagementDialog";
import type { Pipeline as PipelineType, PipelineItem } from "@/types/pipeline";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PipelineForm } from "@/components/pipeline/PipelineForm";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

// Sample data for demonstration
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

// Sample items for demonstration
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

const Pipeline = () => {
  const [pipelines, setPipelines] = useState<PipelineType[]>(samplePipelines);
  const [items, setItems] = useState<PipelineItem[]>(sampleItems);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>(samplePipelines[0].id);
  const [managePipelineOpen, setManagePipelineOpen] = useState(false);
  const [createPipelineOpen, setCreatePipelineOpen] = useState(false);
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [activeStageIdForAdd, setActiveStageIdForAdd] = useState<string | null>(null);
  
  const selectedPipeline = pipelines.find(p => p.id === selectedPipelineId) || pipelines[0];
  
  // Pipeline management functions
  const handlePipelineUpdate = (updatedPipeline: Pipeline) => {
    setPipelines(pipelines.map(p => 
      p.id === updatedPipeline.id ? updatedPipeline : p
    ));
    
    // If updated pipeline has default set to true, set others to false
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
    // If new pipeline has default set to true, set others to false
    let updatedPipelines = [...pipelines];
    if (newPipeline.isDefault) {
      updatedPipelines = updatedPipelines.map(p => ({ ...p, isDefault: false }));
    }
    
    setPipelines([...updatedPipelines, newPipeline]);
    setSelectedPipelineId(newPipeline.id);
    setCreatePipelineOpen(false);
    
    toast.success("Nieuwe pijplijn aangemaakt");
  };
  
  const handlePipelineDelete = (pipelineId: string) => {
    // Don't allow deleting the last pipeline
    if (pipelines.length <= 1) {
      toast.error("Kan de laatste pijplijn niet verwijderen");
      return;
    }
    
    // Delete pipeline
    setPipelines(pipelines.filter(p => p.id !== pipelineId));
    
    // If the deleted pipeline was selected, select another one
    if (selectedPipelineId === pipelineId) {
      setSelectedPipelineId(pipelines.find(p => p.id !== pipelineId)?.id || "");
    }
    
    // Remove all items associated with this pipeline
    setItems(items.filter(item => item.pipelineId !== pipelineId));
    
    toast.success("Pijplijn verwijderd");
  };
  
  // Item management functions
  const handleItemMove = (itemId: string, newStageId: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, stageId: newStageId, updatedAt: new Date().toISOString() } : item
    ));
  };
  
  const handleAddItem = (stageId: string) => {
    setActiveStageIdForAdd(stageId);
    setAddItemDialogOpen(true);
    
    // In a real app, you would open a dialog or form to create a new item
    // For this example, we'll just add a dummy item
    const newItem: PipelineItem = {
      id: `item-${uuidv4()}`,
      name: `Nieuw item ${items.length + 1}`,
      stageId,
      pipelineId: selectedPipelineId,
      objectId: `lead-${uuidv4()}`,
      objectType: "lead",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setItems([...items, newItem]);
  };
  
  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Pijplijn</h1>
            <PipelineSelector 
              pipelines={pipelines}
              selectedPipelineId={selectedPipelineId}
              onSelectPipeline={setSelectedPipelineId}
              onCreatePipeline={() => setCreatePipelineOpen(true)}
              onManagePipelines={() => setManagePipelineOpen(true)}
            />
          </div>
          
          <PipelineBoard 
            pipeline={selectedPipeline}
            items={items.filter(item => item.pipelineId === selectedPipelineId)}
            onItemMove={handleItemMove}
            onAddItem={handleAddItem}
          />
        </div>
      </div>
      
      {/* Dialogs */}
      <PipelineManagementDialog 
        pipelines={pipelines}
        selectedPipelineId={selectedPipelineId}
        open={managePipelineOpen}
        onOpenChange={setManagePipelineOpen}
        onPipelineUpdate={handlePipelineUpdate}
        onPipelineCreate={handlePipelineCreate}
        onPipelineDelete={handlePipelineDelete}
      />
      
      <Dialog open={createPipelineOpen} onOpenChange={setCreatePipelineOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nieuwe pijplijn aanmaken</DialogTitle>
          </DialogHeader>
          <PipelineForm 
            onSubmit={handlePipelineCreate}
          />
        </DialogContent>
      </Dialog>
      
      {/* Placeholder for add item dialog - in a real app, this would be more complex */}
      <Dialog open={addItemDialogOpen} onOpenChange={setAddItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Item toevoegen</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            In een echte applicatie zou hier een formulier staan om een nieuw item toe te voegen.
            Voor dit voorbeeld is automatisch een dummy item toegevoegd.
          </p>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Pipeline;
