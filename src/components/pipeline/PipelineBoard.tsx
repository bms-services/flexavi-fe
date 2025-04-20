
import React, { useState } from "react";
import { Pipeline, PipelineItem, PipelineStage } from "@/types/pipeline";
import { PipelineStage as PipelineStageComponent } from "./PipelineStage";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface PipelineBoardProps {
  pipeline: Pipeline;
  items: PipelineItem[];
  onItemMove: (itemId: string, newStageId: string) => void;
  onAddItem: (stageId: string) => void;
}

export const PipelineBoard: React.FC<PipelineBoardProps> = ({
  pipeline,
  items,
  onItemMove,
  onAddItem,
}) => {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle the move
    onItemMove(draggableId, destination.droppableId);
    
    toast.success("Item verplaatst naar een nieuwe fase");
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <DragDropContext onDragEnd={handleDragEnd}>
        <ScrollArea className="h-full">
          <div className="flex gap-4 p-4 h-full">
            {pipeline.stages.sort((a, b) => a.order - b.order).map((stage) => (
              <PipelineStageComponent
                key={stage.id}
                stage={stage}
                items={items}
                onAddItem={onAddItem}
              />
            ))}
          </div>
        </ScrollArea>
      </DragDropContext>
    </div>
  );
};
