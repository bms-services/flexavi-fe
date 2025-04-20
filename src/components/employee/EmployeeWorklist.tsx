
import React, { useState } from "react";
import { Appointment } from "@/types";
import { EmployeeAppointmentCard } from "./EmployeeAppointmentCard";
import { mockLeads } from "@/data/mockLeads";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";

interface EmployeeWorklistProps {
  appointments: Appointment[];
  dayLabel: string;
}

type RescheduleInfo = { [appointmentId: string]: { reason: string } };
type RescheduledStatus = { [appointmentId: string]: boolean };

interface UploadState {
  [id: string]: {
    quote: boolean;
    invoice: boolean;
    agreement: boolean;
  };
}
interface DigitalDocsState {
  [id: string]: {
    quote?: ReceiptData;
    invoice?: ReceiptData;
    agreement?: ReceiptData;
  }
}

export const EmployeeWorklist: React.FC<EmployeeWorklistProps> = ({ appointments, dayLabel }) => {
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState<string | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rescheduleInfo, setRescheduleInfo] = useState<RescheduleInfo>({});
  const [rescheduledStatus, setRescheduledStatus] = useState<RescheduledStatus>({});
  const [uploadDialogOpen, setUploadDialogOpen] = useState<UploadState>({});
  const [digitalDocs, setDigitalDocs] = useState<DigitalDocsState>({});

  const handleOpenUploadDialog = (appointmentId: string, type: "quote" | "invoice" | "agreement") => {
    setUploadDialogOpen(prev => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        [type]: true,
      },
    }));
  };

  const handleCloseUploadDialog = (appointmentId: string, type: "quote" | "invoice" | "agreement") => {
    setUploadDialogOpen(prev => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        [type]: false,
      },
    }));
  };

  const handleDigitalDocResult = (
    appointmentId: string,
    type: "quote" | "invoice" | "agreement",
    data: ReceiptData
  ) => {
    setDigitalDocs(prev => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        [type]: data,
      },
    }));
    handleCloseUploadDialog(appointmentId, type);
  };

  const handleMapOpen = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleCreateQuote = (leadId: string) => {
    // @ts-ignore
    import("react-router-dom").then(({ useNavigate }) => {
      const navigate = useNavigate();
      navigate('/quotes/create', { state: { leadId } });
    });
  };
  const handleCreateInvoice = (leadId: string) => {
    // @ts-ignore
    import("react-router-dom").then(({ useNavigate }) => {
      const navigate = useNavigate();
      navigate('/invoices/create', { state: { leadId } });
    });
  };
  const handleCreateAgreement = (leadId: string) => {
    // @ts-ignore
    import("react-router-dom").then(({ useNavigate }) => {
      const navigate = useNavigate();
      navigate('/workagreements/create', { state: { leadId } });
    });
  };

  const handleViewHistory = (leadId: string) => {
    // @ts-ignore
    import("react-router-dom").then(({ useNavigate }) => {
      const navigate = useNavigate();
      navigate(`/leads/${leadId}`);
    });
  };

  const openRescheduleModal = (appointmentId: string) => {
    setRescheduleModalOpen(appointmentId);
    setRescheduleReason(rescheduleInfo[appointmentId]?.reason || "");
  };

  const handleRescheduleSave = () => {
    if (rescheduleModalOpen) {
      setRescheduleInfo({
        ...rescheduleInfo,
        [rescheduleModalOpen]: { reason: rescheduleReason }
      });
      setRescheduledStatus({
        ...rescheduledStatus,
        [rescheduleModalOpen]: true
      });
    }
    setRescheduleModalOpen(null);
    setRescheduleReason("");
  };

  const getLead = (leadId: string) => mockLeads.find(l => l.id === leadId);

  return (
    <div>
      <h2 className="text-xl font-bold px-6 pt-6 mb-3 text-roof-700/90">{dayLabel} - Werklijst</h2>
      {appointments.length === 0 ? (
        <div className="text-center text-muted-foreground py-10 text-base">Geen afspraken gepland voor deze dag.</div>
      ) : (
        <div className="px-4 py-2 space-y-5">
          {appointments.map((app) => {
            const lead = getLead(app.leadId);
            const isRescheduled = rescheduledStatus[app.id];
            const rescheduleModalVisible = rescheduleModalOpen === app.id;
            const reason = rescheduleInfo[app.id]?.reason || rescheduleReason;

            const uploadState = uploadDialogOpen[app.id] || { quote: false, invoice: false, agreement: false };
            const docs = digitalDocs[app.id] || {};

            return (
              <EmployeeAppointmentCard
                key={app.id}
                app={app}
                lead={lead}
                isRescheduled={isRescheduled}
                rescheduleReason={reason}
                rescheduleModalOpen={rescheduleModalVisible}
                digitalQuote={docs.quote}
                digitalInvoice={docs.invoice}
                digitalAgreement={docs.agreement}
                onMapOpen={handleMapOpen}
                onCreateQuote={() => handleCreateQuote(app.leadId)}
                onOpenUploadQuote={() => handleOpenUploadDialog(app.id, "quote")}
                uploadQuoteDialogOpen={uploadState.quote}
                onQuoteResult={data => handleDigitalDocResult(app.id, "quote", data)}
                onCloseUploadQuote={() => handleCloseUploadDialog(app.id, "quote")}
                onCreateInvoice={() => handleCreateInvoice(app.leadId)}
                onOpenUploadInvoice={() => handleOpenUploadDialog(app.id, "invoice")}
                uploadInvoiceDialogOpen={uploadState.invoice}
                onInvoiceResult={data => handleDigitalDocResult(app.id, "invoice", data)}
                onCloseUploadInvoice={() => handleCloseUploadDialog(app.id, "invoice")}
                onCreateAgreement={() => handleCreateAgreement(app.leadId)}
                onOpenUploadAgreement={() => handleOpenUploadDialog(app.id, "agreement")}
                uploadAgreementDialogOpen={uploadState.agreement}
                onAgreementResult={data => handleDigitalDocResult(app.id, "agreement", data)}
                onCloseUploadAgreement={() => handleCloseUploadDialog(app.id, "agreement")}
                onViewHistory={() => handleViewHistory(app.leadId)}
                onOpenRescheduleModal={() => openRescheduleModal(app.id)}
                onCloseRescheduleModal={() => setRescheduleModalOpen(null)}
                onRescheduleReasonChange={setRescheduleReason}
                onRescheduleSave={handleRescheduleSave}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
