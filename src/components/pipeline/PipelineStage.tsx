
import React from "react";
import { PipelineStage as PipelineStageType, PipelineItem } from "@/types/pipeline";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { PipelineItemCard } from "./PipelineItemCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const stageItems = items.filter((item) => item.stageId === stage.id);

  return (
    <Card className={`${isMobile ? 'w-full' : 'w-[300px]'} flex-shrink-0 h-fit max-h-full transition-shadow hover:shadow-md`}>
      <CardHeader className="pb-2 relative space-y-0" style={{ borderLeft: `4px solid ${stage.color}` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{stage.name}</span>
            <span className="text-xs text-muted-foreground">
              ({stageItems.length})
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAddItem(stage.id)}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <Droppable droppableId={stage.id} type="pipelineItem">
        {(provided, snapshot) => (
          <CardContent
            className={`p-2 min-h-[150px] space-y-2 transition-colors ${
              snapshot.isDraggingOver ? 'bg-accent/50' : ''
            }`}
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
              <div className="flex items-center justify-center h-24 text-sm text-muted-foreground border border-dashed rounded-lg">
                Sleep items hier
              </div>
            )}
          </CardContent>
        )}
      </Droppable>
    </Card>
  );
};
