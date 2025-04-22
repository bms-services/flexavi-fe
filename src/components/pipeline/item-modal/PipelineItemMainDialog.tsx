
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { PipelineItemModalHeader } from "./PipelineItemModalHeader";
import { PipelineItemModalFooterActions } from "./PipelineItemModalFooterActions";
import { PipelineItemModalContent } from "./PipelineItemModalContent";

interface PipelineItemMainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modalClass: string;
  item: any;
  leadNAW: any;
  guarantees: any[];
  appointments: any[];
  quotes: any[];
  invoices: any[];
  workAgreements: any[];
  activeDocTab: string;
  setActiveDocTab: (tab: string) => void;
  getStatusColor: (status: string) => string;
  pipeline: any;
  currentStageId: string;
  onStageChange: (newStageId: string) => void;
  onGoToDetail: () => void;
  onAddNote: () => void;
  onSchedule: () => void;
  onCreateQuote: () => void;
  onCreateInvoice: () => void;
  onCreateWorkOrder: () => void;
  onUploadPhotos: () => void;
}

export const PipelineItemMainDialog: React.FC<PipelineItemMainDialogProps> = ({
  open,
  onOpenChange,
  modalClass,
  item,
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
  onGoToDetail,
  onAddNote,
  onSchedule,
  onCreateQuote,
  onCreateInvoice,
  onCreateWorkOrder,
  onUploadPhotos,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={modalClass}>
      <div className="bg-slate-50 p-6 border-b shrink-0">
        <PipelineItemModalHeader
          objectId={item.objectId}
          name={leadNAW.name}
          updatedAt={item.updatedAt}
        />
      </div>
      <PipelineItemModalContent
        leadNAW={leadNAW}
        guarantees={guarantees}
        appointments={appointments}
        quotes={quotes}
        invoices={invoices}
        workAgreements={workAgreements}
        activeDocTab={activeDocTab}
        setActiveDocTab={setActiveDocTab}
        getStatusColor={getStatusColor}
        pipeline={pipeline}
        currentStageId={currentStageId}
        onStageChange={onStageChange}
      />
      <Separator className="my-0" />
      <PipelineItemModalFooterActions
        onAddNote={onAddNote}
        onSchedule={onSchedule}
        onGoToDetail={onGoToDetail}
        onCreateQuote={onCreateQuote}
        onCreateInvoice={onCreateInvoice}
        onCreateWorkOrder={onCreateWorkOrder}
        onUploadPhotos={onUploadPhotos}
      />
    </DialogContent>
  </Dialog>
);

