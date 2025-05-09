
import React from "react";
import type { Pipeline, PipelineItem, PipelineStage } from "@/types/pipeline";
import { PipelineStage as PipelineStageComponent } from "./PipelineStage";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useIsMobile } from "@/hooks/use-mobile";

interface PipelineBoardProps {
  pipeline: Pipeline;
  items: PipelineItem[];
  onItemMove: (itemId: string, newStageId: string) => void;
  onAddItem: (stageId: string) => void;
  onItemReorder: (stageId: string, fromIndex: number, toIndex: number) => void;
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
        <ScrollArea className="h-full" orientation={isMobile ? "horizontal" : "vertical"}>
          <div className="p-4 min-w-fit">
            <div className={`flex ${isMobile ? 'flex-row' : 'flex-row'} gap-4`}>
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
        </ScrollArea>
      </DragDropContext>
    </div>
  );
};
