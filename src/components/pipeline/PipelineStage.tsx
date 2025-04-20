
import React from "react";
import { PipelineStage as PipelineStageType, PipelineItem } from "@/types/pipeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { PipelineItemCard } from "./PipelineItemCard";

interface PipelineStageProps {
  stage: PipelineStageType;
  items: PipelineItem[];
  onAddItem: (stageId: string) => void;
}

export const PipelineStage: React.FC<PipelineStageProps> = ({
  stage,
  items,
  onAddItem,
}) => {
  const stageItems = items.filter((item) => item.stageId === stage.id);
  
  return (
    <Card className="w-[280px] flex-shrink-0 h-full flex flex-col">
      <CardHeader className="pb-2 relative" style={{ borderLeft: `4px solid ${stage.color}` }}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {stage.name} <span className="text-muted-foreground ml-1">({stageItems.length})</span>
          </CardTitle>
          <button 
            onClick={() => onAddItem(stage.id)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            +
          </button>
        </div>
      </CardHeader>
      <Droppable droppableId={stage.id} type="pipelineItem">
        {(provided, snapshot) => (
          <CardContent 
            className={`p-2 flex-grow overflow-auto space-y-2 ${snapshot.isDraggingOver ? 'bg-accent/50' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {stageItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <PipelineItemCard item={item} isDragging={snapshot.isDragging} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {stageItems.length === 0 && (
              <div className="text-center p-4 text-muted-foreground text-sm">
                Geen items in deze fase
              </div>
            )}
          </CardContent>
        )}
      </Droppable>
    </Card>
  );
};
