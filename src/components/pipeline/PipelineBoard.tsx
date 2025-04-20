
import React from "react";
import type { Pipeline, PipelineItem, PipelineStage } from "@/types/pipeline";
import { PipelineStage as PipelineStageComponent } from "./PipelineStage";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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
    <div className="h-[calc(100vh-12rem)] w-full bg-card rounded-lg border shadow-sm">
      <DragDropContext onDragEnd={handleDragEnd}>
        <ScrollArea className="h-full">
          <div className="min-w-max p-4">
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
              {pipeline.stages.sort((a, b) => a.order - b.order).map((stage) => (
                <PipelineStageComponent
                  key={stage.id}
                  stage={stage}
                  items={items}
                  onAddItem={onAddItem}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </DragDropContext>
    </div>
  );
};
