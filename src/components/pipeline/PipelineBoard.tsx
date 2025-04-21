
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
  onItemReorder: (stageId: string, fromIndex: number, toIndex: number) => void; // NIEUW
}

export const PipelineBoard: React.FC<PipelineBoardProps> = ({
  pipeline,
  items,
  onItemMove,
  onAddItem,
  onItemReorder,
}) => {
  const isMobile = useIsMobile();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    // Zelfde kolom = reorder:
    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      onItemReorder(destination.droppableId, source.index, destination.index);
      return;
    }
    // Anderes kolom = move:
    if (destination.droppableId !== source.droppableId) {
      onItemMove(draggableId, destination.droppableId);
    }
  };

  const sortedStages = pipeline.stages.sort((a, b) => a.order - b.order);

  return (
    <div className="h-[calc(100vh-12rem)] w-full bg-card rounded-lg border shadow-sm overflow-hidden">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="h-full overflow-x-auto">
          <div className="min-w-max p-4 inline-flex">
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
              {sortedStages.map((stage, idx) => (
                <PipelineStageComponent
                  key={stage.id}
                  stage={stage}
                  items={items}
                  onAddItem={onAddItem}
                  isFirstStage={idx === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};
