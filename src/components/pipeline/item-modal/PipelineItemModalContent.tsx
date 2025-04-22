import React from "react";
import { CustomerInfoPanel } from "./CustomerInfoPanel";
import { GuaranteesPanel } from "./GuaranteesPanel";
import { AppointmentPanel } from "./AppointmentPanel";
import { DocumentsTabsPanel } from "./DocumentsTabsPanel";
import { LeadLocationMap } from "@/components/leads/components/LeadLocationMap";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pipeline } from "@/types/pipeline";

interface PipelineItemModalContentProps {
  leadNAW: any;
  guarantees: any[];
  appointments: any[];
  quotes: any[];
  invoices: any[];
  workAgreements: any[];
  activeDocTab: string;
  setActiveDocTab: (tab: string) => void;
  getStatusColor: (status: string) => string;
  pipeline: Pipeline;
  currentStageId: string;
  onStageChange: (newStageId: string) => void;
}

export const PipelineItemModalContent: React.FC<PipelineItemModalContentProps> = ({
  leadNAW,
  guarantees,
  appointments,
  quotes,
  invoices,
  workAgreements,
  activeDocTab,
  setActiveDocTab,
  getStatusColor,
  pipeline,
  currentStageId,
  onStageChange,
}) => {
  const [selectedStage, setSelectedStage] = React.useState(currentStageId);

  const handleSave = () => {
    if (selectedStage !== currentStageId) {
      onStageChange(selectedStage);
    }
  };

  return (
    <div className="p-6 flex-1 min-h-0 max-h-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative">
      <div className="space-y-6 min-w-0">
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Selecteer fase" />
            </SelectTrigger>
            <SelectContent>
              {pipeline.stages.sort((a, b) => a.order - b.order).map((stage) => (
                <SelectItem key={stage.id} value={stage.id}>
                  {stage.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={handleSave}
            disabled={selectedStage === currentStageId}
          >
            Fase wijzigen
          </Button>
        </div>
        <CustomerInfoPanel lead={leadNAW} />
        <LeadLocationMap address={leadNAW.address} />
        <GuaranteesPanel guarantees={guarantees} getStatusColor={getStatusColor} />
      </div>
      <div className="space-y-6 min-w-0">
        <AppointmentPanel appointments={appointments} />
        <DocumentsTabsPanel
          activeTab={activeDocTab}
          setActiveTab={setActiveDocTab}
          quotes={quotes}
          invoices={invoices}
          workAgreements={workAgreements}
          getStatusColor={getStatusColor}
        />
      </div>
    </div>
  );
};
