
import React, { useState } from "react";
import { Pipeline } from "@/types/pipeline";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineForm } from "./PipelineForm";
import { PipelineStageForm } from "./PipelineStageForm";

interface PipelineManagementDialogProps {
  pipelines: Pipeline[];
  selectedPipelineId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPipelineUpdate: (pipeline: Pipeline) => void;
  onPipelineCreate: (pipeline: Pipeline) => void;
  onPipelineDelete: (pipelineId: string) => void;
}

export const PipelineManagementDialog: React.FC<PipelineManagementDialogProps> = ({
  pipelines,
  selectedPipelineId,
  open,
  onOpenChange,
  onPipelineUpdate,
  onPipelineCreate,
  onPipelineDelete,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  
  const selectedPipeline = pipelines.find(p => p.id === selectedPipelineId);
  
  if (!selectedPipeline) {
    return null;
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pijplijn beheren: {selectedPipeline.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="stages">Fases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="pt-4">
            <PipelineForm 
              pipeline={selectedPipeline}
              onSubmit={(updated) => {
                onPipelineUpdate(updated);
              }}
              onDelete={() => {
                onPipelineDelete(selectedPipeline.id);
                onOpenChange(false);
              }}
            />
          </TabsContent>
          
          <TabsContent value="stages" className="pt-4">
            <PipelineStageForm 
              pipeline={selectedPipeline}
              onSubmit={(updated) => {
                onPipelineUpdate({
                  ...selectedPipeline,
                  stages: updated.stages
                });
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
