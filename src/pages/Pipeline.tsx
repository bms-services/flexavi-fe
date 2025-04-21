
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PipelineBoard } from "@/components/pipeline/PipelineBoard";
import { PipelineHeader } from "@/components/pipeline/PipelineHeader";
import { PipelineDialogs } from "@/components/pipeline/PipelineDialogs";
import { usePipeline } from "@/hooks/usePipeline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { toast } from "sonner";

const Pipeline = () => {
  const {
    pipelines,
    selectedPipeline,
    selectedPipelineId,
    items,
    setSelectedPipelineId,
    handlePipelineUpdate,
    handlePipelineCreate,
    handlePipelineDelete,
    handleItemMove,
    handleAddItem,
  } = usePipeline();

  const [managePipelineOpen, setManagePipelineOpen] = useState(false);
  const [createPipelineOpen, setCreatePipelineOpen] = useState(false);
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  
  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col gap-4">
          <PipelineHeader 
            pipelines={pipelines}
            selectedPipelineId={selectedPipelineId}
            onSelectPipeline={setSelectedPipelineId}
            onCreatePipeline={() => toast.info("Aanmaken van nieuwe pijplijnen niet mogelijk")}
            onManagePipelines={() => toast.info("Aanpassen van vaste pijplijnen niet mogelijk")}
          />
          
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Vaste pijplijnen</AlertTitle>
            <AlertDescription>
              Dit systeem gebruikt 5 vaste pijplijnen voor verschillende werkprocessen. Sleep items naar 
              de gewenste fase om ze te verplaatsen. Klik op een item voor meer acties.
            </AlertDescription>
          </Alert>
          
          <PipelineBoard 
            pipeline={selectedPipeline}
            items={items}
            onItemMove={handleItemMove}
            onAddItem={handleAddItem}
          />
        </div>
      </div>
      
      <PipelineDialogs 
        pipelines={pipelines}
        selectedPipelineId={selectedPipelineId}
        managePipelineOpen={managePipelineOpen}
        createPipelineOpen={createPipelineOpen}
        addItemDialogOpen={addItemDialogOpen}
        onManagePipelineOpenChange={setManagePipelineOpen}
        onCreatePipelineOpenChange={setCreatePipelineOpen}
        onAddItemDialogOpenChange={setAddItemDialogOpen}
        onPipelineUpdate={handlePipelineUpdate}
        onPipelineCreate={handlePipelineCreate}
        onPipelineDelete={handlePipelineDelete}
      />
    </Layout>
  );
};

export default Pipeline;
