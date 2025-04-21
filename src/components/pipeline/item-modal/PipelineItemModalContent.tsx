
import React from "react";
import { CustomerInfoPanel } from "./CustomerInfoPanel";
import { GuaranteesPanel } from "./GuaranteesPanel";
import { AppointmentPanel } from "./AppointmentPanel";
import { DocumentsTabsPanel } from "./DocumentsTabsPanel";
import { LeadLocationMap } from "@/components/leads/components/LeadLocationMap";

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
}) => (
  <div className="p-6 flex-1 min-h-0 max-h-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative">
    <div className="space-y-6 min-w-0">
      <CustomerInfoPanel lead={leadNAW} />
      {/* Move location map above appointments */}
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
