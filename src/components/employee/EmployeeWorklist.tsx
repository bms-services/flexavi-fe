
import React, { useState } from "react";
import { Appointment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { MapPin, FilePlus, Upload, History, Clock } from "lucide-react";
import { mockLeads } from "@/data/mockLeads";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";

interface EmployeeWorklistProps {
  appointments: Appointment[];
  dayLabel: string;
}

type RescheduleInfo = { [appointmentId: string]: { reason: string } };
type RescheduledStatus = { [appointmentId: string]: boolean };

export const EmployeeWorklist: React.FC<EmployeeWorklistProps> = ({ appointments, dayLabel }) => {
  const navigate = useNavigate();
  
  // Voor reschedule modal
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState<string | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rescheduleInfo, setRescheduleInfo] = useState<RescheduleInfo>({});
  const [rescheduledStatus, setRescheduledStatus] = useState<RescheduledStatus>({});
  
  // Voor offerte upload modal
  const [uploadDialogOpenId, setUploadDialogOpenId] = useState<string | null>(null);

  // Voor demo: gesimuleerde AI geëxtraheerde offerte
  const [digitalQuote, setDigitalQuote] = useState<{[id:string]: ReceiptData}>({});

  const handleMapOpen = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleCreateQuote = (leadId: string) => {
    navigate('/quotes/create', { state: { leadId } });
  };

  const handleOpenUploadQuote = (appointmentId: string) => {
    setUploadDialogOpenId(appointmentId);
  };

  const handleViewHistory = (leadId: string) => {
    navigate(`/leads/${leadId}`);
  };

  // Reschedule modal functies
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

  // Ophalen van lead bij deze afspraak
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
            return (
              <Card key={app.id} className="mb-2 relative">
                <CardHeader>
                  <CardTitle className="text-base leading-tight flex items-center gap-2">
                    {app.title}
                    {isRescheduled && (
                      <span className="ml-2 px-2 py-1 rounded bg-warning text-xs text-warning-foreground flex items-center gap-1"><Clock className="w-3 h-3" />Verzet</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                  {/* Klant details */}
                  {lead && (
                    <div className="mb-2 p-2 rounded bg-gray-50 border flex flex-col sm:flex-row gap-2 sm:justify-between">
                      <div>
                        <div className="text-sm font-medium">{lead.name}</div>
                        <div className="text-xs text-muted-foreground">{lead.address}</div>
                      </div>
                      <div className="flex flex-col text-xs mt-1 sm:mt-0 gap-1">
                        <span><b>Tel:</b> {lead.phone}</span>
                        <span><b>Email:</b> {lead.email}</span>
                      </div>
                    </div>
                  )}

                  {/* Afspraak info */}
                  <div className="space-y-1">
                    <div className="text-sm"><strong>Beschrijving:</strong> {app.description}</div>
                    <div className="text-sm"><strong>Datum:</strong> {format(parseISO(app.date), "d MMM yyyy")}</div>
                    <div className="text-sm"><strong>Tijd:</strong> {app.startTime} - {app.endTime}</div>
                    <div className="text-sm"><strong>Locatie:</strong> {app.location}</div>
                    {isRescheduled && (
                      <div className="text-sm text-warning mt-2">
                        <b>Reden verzet:</b> {rescheduleInfo[app.id]?.reason}
                      </div>
                    )}
                  </div>
                  
                  {/* Digitale offerte voorbeeld (AI extractie proof of concept) */}
                  {digitalQuote[app.id] && (
                    <div className="bg-accent/50 rounded p-3 text-sm mt-2">
                      <div className="font-medium mb-1">Digitale Offerte (geëxtraheerd)</div>
                      <ul className="list-disc ml-4">
                        {Object.entries(digitalQuote[app.id] || {}).map(([key, val]) => (
                          <li key={key}><b>{key}</b>: {String(val)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMapOpen(app.location || "")}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Open Maps
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCreateQuote(app.leadId)}
                    >
                      <FilePlus className="h-4 w-4 mr-2" />
                      Maak Offerte
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenUploadQuote(app.id)}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Offerte
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewHistory(app.leadId)}
                    >
                      <History className="h-4 w-4 mr-2" />
                      Bekijk Geschiedenis
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openRescheduleModal(app.id)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Verzetten
                    </Button>
                  </div>
                </CardContent>

                {/* Modal voor verzetten */}
                <Dialog open={rescheduleModalOpen === app.id} onOpenChange={open => open ? setRescheduleModalOpen(app.id) : setRescheduleModalOpen(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Afspraak verzetten</DialogTitle>
                      <DialogDescription>
                        Geef een reden voor het verzetten van deze afspraak.
                      </DialogDescription>
                    </DialogHeader>
                    <textarea
                      value={rescheduleReason}
                      onChange={e => setRescheduleReason(e.target.value)}
                      placeholder="Bijv. klant niet aanwezig, ziek, etc."
                      className="w-full border rounded p-2 mt-2 min-h-[60px]"
                    />
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setRescheduleModalOpen(null)}>Annuleren</Button>
                      <Button onClick={handleRescheduleSave} disabled={!rescheduleReason.trim()}>Verzetten</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Modal voor offerte uploaden */}
                <ReceiptUploadDialog
                  open={uploadDialogOpenId === app.id}
                  onOpenChange={open => setUploadDialogOpenId(open ? app.id : null)}
                  onResult={data => {
                    setDigitalQuote(prev => ({
                      ...prev,
                      [app.id]: data
                    }));
                  }}
                />

              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
