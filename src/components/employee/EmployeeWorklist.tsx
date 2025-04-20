
import React from "react";
import { Appointment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { MapPin, FilePlus, Upload, History } from "lucide-react";

interface EmployeeWorklistProps {
  appointments: Appointment[];
  dayLabel: string;
}

export const EmployeeWorklist: React.FC<EmployeeWorklistProps> = ({ appointments, dayLabel }) => {
  const navigate = useNavigate();

  const handleMapOpen = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleCreateQuote = (leadId: string) => {
    navigate('/quotes/create', { state: { leadId } });
  };

  const handleUploadQuote = (appointmentId: string) => {
    // For now just log, will be implemented with AI processing later
    console.log('Upload quote for appointment:', appointmentId);
  };

  const handleViewHistory = (leadId: string) => {
    navigate(`/leads/${leadId}`);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold px-6 pt-6">{dayLabel} - Werklijst</h2>
      {appointments.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">Geen afspraken gepland voor deze dag.</div>
      ) : (
        <div className="px-6 py-4 space-y-4">
          {appointments.map((app) => (
            <Card key={app.id} className="mb-2">
              <CardHeader>
                <CardTitle className="text-base leading-tight">{app.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="text-sm"><strong>Beschrijving:</strong> {app.description}</div>
                  <div className="text-sm"><strong>Datum:</strong> {format(parseISO(app.date), "d MMM yyyy")}</div>
                  <div className="text-sm"><strong>Tijd:</strong> {app.startTime} - {app.endTime}</div>
                  <div className="text-sm"><strong>Locatie:</strong> {app.location}</div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMapOpen(app.location)}
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
                    onClick={() => handleUploadQuote(app.id)}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
