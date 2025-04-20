
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PipelineBoard } from "@/components/pipeline/PipelineBoard";
import { PipelineHeader } from "@/components/pipeline/PipelineHeader";
import { PipelineDialogs } from "@/components/pipeline/PipelineDialogs";
import { usePipeline } from "@/hooks/usePipeline";

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
      <div className="container mx-auto py-6 space-y-6 w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-4 overflow-hidden">
          <PipelineHeader 
            pipelines={pipelines}
            selectedPipelineId={selectedPipelineId}
            onSelectPipeline={setSelectedPipelineId}
            onCreatePipeline={() => setCreatePipelineOpen(true)}
            onManagePipelines={() => setManagePipelineOpen(true)}
          />
          
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
