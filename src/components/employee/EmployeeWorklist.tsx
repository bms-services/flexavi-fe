
import React, { useState } from "react";
import { Appointment } from "@/types";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { CalendarDays } from "lucide-react";
import { mockLeads } from "@/data/mockLeads";
import { RoofingAppointmentCard } from "./RoofingAppointmentCard";

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

// DEMO data voor geschiedenis! (Voor een echte implementatie moet je dit uit de database/API halen)
const DUMMY_HISTORY = {
  "1": [
    { date: "2025-04-12", reason: "Offerte uitgebracht" },
    { date: "2025-04-15", reason: "Afspraak verzet door klant" }
  ],
  "2": [
    { date: "2025-04-10", reason: "Eerste intakegesprek" },
    { date: "2025-04-13", reason: "Afspraak bevestigd" }
  ],
  "3": [
    { date: "2025-04-05", reason: "Klant gebeld na offerteaanvraag" }
  ]
};

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

  const handleProcessAppointment = (appointmentId: string) => {
    console.log("Verwerken van afspraak:", appointmentId);
    // TODO: Implementeer verwerking logica, hier zouden we later AppointmentProcessModal kunnen openen
  };

  const handleCreateQuote = (leadId: string) => {
    window.location.href = `/quotes/create?leadId=${leadId}`;
  };
  const handleCreateInvoice = (leadId: string) => {
    window.location.href = `/invoices/create?leadId=${leadId}`;
  };
  const handleCreateAgreement = (leadId: string) => {
    window.location.href = `/workagreements/create?leadId=${leadId}`;
  };

  const handleViewHistory = (leadId: string) => {
    window.location.href = `/leads/${leadId}`;
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
    <div className="bg-white w-full">
      <div className="flex items-center gap-2 px-4 sm:px-6 py-4 border-b bg-white sticky top-0 z-10">
        <CalendarDays className="h-5 w-5 text-roof-600" />
        <h2 className="text-base sm:text-lg font-semibold text-roof-700">
          {dayLabel} - Werklijst
        </h2>
      </div>
      
      {appointments.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <CalendarDays className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-muted-foreground">Geen afspraken gepland voor deze dag.</p>
        </div>
      ) : (
        <div className="p-2 sm:p-4 grid gap-5 max-w-full">
          {appointments.map((app) => {
            const lead = getLead(app.leadId);
            const historyEntries = DUMMY_HISTORY[lead?.id || ""] || [];
            const rescheduleReason = rescheduleInfo[app.id]?.reason;

            return (
              <RoofingAppointmentCard
                key={app.id}
                app={app}
                lead={lead || {}}
                onMapOpen={handleMapOpen}
                onProcess={() => handleProcessAppointment(app.id)}
                onHistory={lead ? () => handleViewHistory(lead.id) : undefined}
                onReschedule={() => openRescheduleModal(app.id)}
                rescheduleReason={rescheduleReason}
                historyEntries={historyEntries}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
