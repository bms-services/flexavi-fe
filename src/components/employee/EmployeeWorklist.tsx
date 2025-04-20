
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

export const EmployeeWorklist: React.FC<EmployeeWorklistProps> = ({ appointments, dayLabel }) => {
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState<string | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rescheduleInfo, setRescheduleInfo] = useState<RescheduleInfo>({});
  const [rescheduledStatus, setRescheduledStatus] = useState<RescheduledStatus>({});
  const [uploadDialogOpenId, setUploadDialogOpenId] = useState<string | null>(null);
  const [digitalQuote, setDigitalQuote] = useState<{[id:string]: ReceiptData}>({});

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

  const handleOpenUploadQuote = (appointmentId: string) => setUploadDialogOpenId(appointmentId);

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
      <h2 className="text-lg font-semibold px-6 pt-6">{dayLabel} - Werklijst</h2>
      {appointments.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">Geen afspraken gepland voor deze dag.</div>
      ) : (
        <div className="px-6 py-4 space-y-4">
          {appointments.map((app) => {
            const lead = getLead(app.leadId);
            const isRescheduled = rescheduledStatus[app.id];
            const rescheduleModalVisible = rescheduleModalOpen === app.id;
            const reason = rescheduleInfo[app.id]?.reason || rescheduleReason;
            return (
              <EmployeeAppointmentCard
                key={app.id}
                app={app}
                lead={lead}
                isRescheduled={isRescheduled}
                rescheduleReason={reason}
                rescheduleModalOpen={rescheduleModalVisible}
                digitalQuote={digitalQuote[app.id]}
                onMapOpen={handleMapOpen}
                onCreateQuote={() => handleCreateQuote(app.leadId)}
                onOpenUploadQuote={() => handleOpenUploadQuote(app.id)}
                onViewHistory={() => handleViewHistory(app.leadId)}
                onOpenRescheduleModal={() => openRescheduleModal(app.id)}
                onCloseRescheduleModal={() => setRescheduleModalOpen(null)}
                onRescheduleReasonChange={setRescheduleReason}
                onRescheduleSave={handleRescheduleSave}
                onUploadDialogChange={open => setUploadDialogOpenId(open ? app.id : null)}
                uploadDialogOpen={uploadDialogOpenId === app.id}
                onQuoteResult={data => {
                  setDigitalQuote(prev => ({
                    ...prev,
                    [app.id]: data
                  }));
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
