
import React, { useState } from "react";
import { PipelineStage as PipelineStageType, PipelineItem } from "@/types/pipeline";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { PipelineItemCard } from "./PipelineItemCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { ColorPopover } from "./ColorPopover";
import { StageMailSettingsModal } from "./StageMailSettingsModal";
import { Settings } from "lucide-react";

// Props blijven hetzelfde
interface PipelineStageProps {
  stage: PipelineStageType;
  items: PipelineItem[];
  onAddItem: (stageId: string) => void;
  // Voor deze stap géén nieuwe props nodig
}

// Snel-ID om te bepalen of we in de Nieuwe Leads pipeline zitten
const NIEUWE_LEADS_PIPELINE_ID = "pipeline-callbacks";

export const PipelineStage: React.FC<PipelineStageProps> = ({
  stage,
  items,
  onAddItem,
}) => {
  const isMobile = useIsMobile();
  const stageItems = items.filter((item) => item.stageId === stage.id);

  // Houdt de kleur van de kolom bij in lokale state (begin met stage.color)
  const [color, setColor] = useState(stage.color);

  // ---- Mail instellingen local state (per kolom)
  // De instellingen zijn "fake/voorlopig" in local state (niet persistent)
  const [mailSettingsOpen, setMailSettingsOpen] = useState(false);
  const [mailEnabled, setMailEnabled] = useState(true);
  const [mailTemplate, setMailTemplate] = useState(
    `Beste [Naam],

Het item is verplaatst naar de fase: [Fase] op [Datum].

Met vriendelijke groet,
Jouw team`
  );

  // ---- Bepalen of we in de Nieuwe Leads pipeline zitten
  // We halen het pipelineId uit het eerste item in deze stage-lijst (want items zijn altijd gefilterd op pipeline).
  const currentPipelineId = stageItems[0]?.pipelineId;

  return (
    <div
      className="bg-white/95 rounded-xl shadow-[0_2px_6px_rgba(50,50,94,0.06)] border border-gray-200 min-w-[280px] max-w-xs w-full flex-shrink-0 h-fit max-h-full transition-shadow hover:shadow-lg flex flex-col"
      style={{ borderColor: color }}
    >
      <div className="px-4 pt-3 pb-2 border-b flex items-center justify-between rounded-t-xl bg-white/90">
        <div className="flex items-center gap-2">
          <ColorPopover value={color} onChange={setColor} />
          <span className="text-base font-medium">{stage.name}</span>
          <span className="text-xs text-muted-foreground">({stageItems.length})</span>
        </div>
        {/* Instellingenknop: alleen tonen bij Nieuwe Leads pipeline */}
        {currentPipelineId === NIEUWE_LEADS_PIPELINE_ID && (
          <button
            type="button"
            className="rounded-full hover:bg-accent/30 p-1 transition border border-transparent hover:border-accent"
            title="Instellingen e-mail na slepen"
            onClick={() => setMailSettingsOpen(true)}
          >
            <Settings size={20} className="text-muted-foreground" />
            <span className="sr-only">Instellingen e-mail</span>
          </button>
        )}
      </div>

      {/* Modal alleen tonen als open */}
      {currentPipelineId === NIEUWE_LEADS_PIPELINE_ID && (
        <StageMailSettingsModal
          open={mailSettingsOpen}
          onOpenChange={setMailSettingsOpen}
          enabled={mailEnabled}
          onEnabledChange={setMailEnabled}
          template={mailTemplate}
          onTemplateChange={setMailTemplate}
          stageName={stage.name}
        />
      )}

      <Droppable droppableId={stage.id} type="pipelineItem">
        {(provided, snapshot) => (
          <div
            className={`p-2 min-h-[150px] max-h-[60vh] overflow-y-auto space-y-2 transition-colors flex-1 ${snapshot.isDraggingOver ? 'bg-accent/30' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ background: snapshot.isDraggingOver ? "#f1f0fb" : "transparent" }}
          >
            {stageItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="draggable-item"
                  >
                    <PipelineItemCard item={item} isDragging={snapshot.isDragging} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {stageItems.length === 0 && (
              <div className="flex items-center justify-center h-24 text-sm text-muted-foreground border border-dashed rounded-lg bg-gray-50">
                Sleep items hier
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
