
import React, { useState } from "react";
import { Pipeline, PipelineStage } from "@/types/pipeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Plus, Trash, Circle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PipelineStageFormProps {
  pipeline: Pipeline;
  onSubmit: (pipeline: Pipeline) => void;
}

export const PipelineStageForm: React.FC<PipelineStageFormProps> = ({
  pipeline,
  onSubmit,
}) => {
  const [stages, setStages] = useState<PipelineStage[]>([...pipeline.stages]);
  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update order
    const updatedStages = items.map((stage, index) => ({
      ...stage,
      order: index
    }));
    
    setStages(updatedStages);
  };
  
  const addStage = () => {
    const newStage: PipelineStage = {
      id: crypto.randomUUID(),
      name: "Nieuwe fase",
      color: "#3b82f6", // Default blue
      order: stages.length
    };
    
    setStages([...stages, newStage]);
  };
  
  const updateStage = (id: string, updates: Partial<PipelineStage>) => {
    setStages(stages.map(stage => 
      stage.id === id ? { ...stage, ...updates } : stage
    ));
  };
  
  const removeStage = (id: string) => {
    setStages(stages.filter(stage => stage.id !== id));
  };
  
  const saveChanges = () => {
    onSubmit({
      ...pipeline,
      stages: stages
    });
  };
  
  const colors = [
    "#ef4444", // red
    "#f97316", // orange
    "#f59e0b", // amber
    "#84cc16", // lime
    "#10b981", // emerald
    "#14b8a6", // teal
    "#06b6d4", // cyan
    "#0ea5e9", // sky
    "#3b82f6", // blue
    "#6366f1", // indigo
    "#8b5cf6", // violet
    "#a855f7", // purple
    "#d946ef", // fuchsia
    "#ec4899", // pink
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Pijplijn fases</h3>
        <Button onClick={addStage} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Fase toevoegen
        </Button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="pipeline-stages">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {stages.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground border rounded-md">
                  Geen fases toegevoegd. Klik op 'Fase toevoegen' om te beginnen.
                </div>
              ) : (
                stages
                  .sort((a, b) => a.order - b.order)
                  .map((stage, index) => (
                    <Draggable key={stage.id} draggableId={stage.id} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="border-l-4"
                          style={{ 
                            borderLeftColor: stage.color,
                            ...provided.draggableProps.style
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                              </div>
                              
                              <div className="flex-1 grid gap-3">
                                <div className="flex items-center gap-2">
                                  <Popover>
                                    <PopoverTrigger>
                                      <div 
                                        className="w-6 h-6 rounded-full cursor-pointer"
                                        style={{ backgroundColor: stage.color }}
                                      />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64">
                                      <div className="grid grid-cols-7 gap-2">
                                        {colors.map(color => (
                                          <button
                                            key={color}
                                            className="w-6 h-6 rounded-full"
                                            style={{ backgroundColor: color }}
                                            onClick={() => updateStage(stage.id, { color })}
                                          />
                                        ))}
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                  
                                  <div className="flex-1">
                                    <Label htmlFor={`stage-name-${stage.id}`} className="sr-only">
                                      Fase naam
                                    </Label>
                                    <Input
                                      id={`stage-name-${stage.id}`}
                                      value={stage.name}
                                      onChange={(e) => updateStage(stage.id, { name: e.target.value })}
                                      className="h-9"
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeStage(stage.id)}
                              >
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <div className="flex justify-end">
        <Button onClick={saveChanges}>Wijzigingen opslaan</Button>
      </div>
    </div>
  );
};
