
import React from "react";
import type { Pipeline } from "@/types/pipeline";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PipelineManagementDialog } from "./PipelineManagementDialog";
import { PipelineForm } from "./PipelineForm";

interface PipelineDialogsProps {
  pipelines: Pipeline[];
  selectedPipelineId: string;
  managePipelineOpen: boolean;
  createPipelineOpen: boolean;
  addItemDialogOpen: boolean;
  onManagePipelineOpenChange: (open: boolean) => void;
  onCreatePipelineOpenChange: (open: boolean) => void;
  onAddItemDialogOpenChange: (open: boolean) => void;
  onPipelineUpdate: (pipeline: Pipeline) => void;
  onPipelineCreate: (pipeline: Pipeline) => void;
  onPipelineDelete: (id: string) => void;
}

export const PipelineDialogs: React.FC<PipelineDialogsProps> = ({
  pipelines,
  selectedPipelineId,
  managePipelineOpen,
  createPipelineOpen,
  addItemDialogOpen,
  onManagePipelineOpenChange,
  onCreatePipelineOpenChange,
  onAddItemDialogOpenChange,
  onPipelineUpdate,
  onPipelineCreate,
  onPipelineDelete,
}) => {
  return (
    <>
      <PipelineManagementDialog 
        pipelines={pipelines}
        selectedPipelineId={selectedPipelineId}
        open={managePipelineOpen}
        onOpenChange={onManagePipelineOpenChange}
        onPipelineUpdate={onPipelineUpdate}
        onPipelineCreate={onPipelineCreate}
        onPipelineDelete={onPipelineDelete}
      />
      
      <Dialog open={createPipelineOpen} onOpenChange={onCreatePipelineOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nieuwe pijplijn aanmaken</DialogTitle>
          </DialogHeader>
          <PipelineForm onSubmit={onPipelineCreate} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={addItemDialogOpen} onOpenChange={onAddItemDialogOpenChange}>
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
    </>
  );
};
