
import React from "react";
import { MapPin, FileText, History, Info, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeadInfoCardProps {
  lead: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  historyEntries?: {
    type: string;
    description: string;
    date: string;
  }[];
  notes?: string[];
  isRescheduled?: boolean;
  rescheduleReason?: string;
  showMapButton?: boolean;
  description?: string;
  wozValue?: number;
}

export const LeadInfoCard: React.FC<LeadInfoCardProps> = ({
  lead,
  historyEntries = [],
  notes = [],
  isRescheduled = false,
  rescheduleReason,
  showMapButton = false,
  description,
  wozValue
}) => {
  const handleOpenMap = () => {
    if (lead.address) {
      const encodedAddress = encodeURIComponent(lead.address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  const handleOpenStreetView = () => {
    if (lead.address) {
      const encodedAddress = encodeURIComponent(lead.address);
      window.open(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${encodedAddress}`, '_blank');
    }
  };

  return (
    <div className="bg-[#F9FAFC] rounded-2xl border border-[#F1F1F1] shadow-sm overflow-hidden w-full animate-fade-in">
      <div className="p-5">
        {/* Customer Info & Street View Button */}
        <div className="flex flex-col md:flex-row gap-5 mb-5">
          <div className="bg-white rounded-xl p-4 shadow-sm flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs uppercase text-[#6B7280] font-medium mb-1">Klant</h3>
                <p className="text-lg font-semibold text-[#1A1F2C]">{lead.name}</p>
              </div>
              
              {wozValue && (
                <div className="bg-[#F0F9FF] px-3 py-1.5 rounded-lg">
                  <span className="text-xs text-[#0369A1] font-medium">WOZ Waarde</span>
                  <p className="text-[#0369A1] font-bold">€{wozValue.toLocaleString()}</p>
                </div>
              )}
            </div>
            
            <div className="flex items-start gap-2 mb-3 text-[#1A1F2C]">
              <MapPin className="w-5 h-5 text-[#6B7280] shrink-0 mt-0.5" />
              <span className="text-sm">{lead.address}</span>
            </div>
            
            <div className="mt-auto">
              <Button 
                onClick={handleOpenStreetView} 
                variant="outline" 
                size="sm" 
                className="w-full text-[#0EA5E9] border-[#0EA5E9] hover:bg-[#0EA5E9]/10">
                <MapPin className="w-4 h-4 mr-2" />
                Street View
              </Button>
            </div>
          </div>
          
          {/* Afspraak omschrijving */}
          <div className="bg-white rounded-xl p-4 shadow-sm flex-[2]">
            <h3 className="text-xs uppercase text-[#6B7280] font-medium mb-2">Afspraak omschrijving</h3>
            <div className="bg-[#F9FAFC] rounded-lg p-3 min-h-[100px] border border-gray-100">
              <p className="text-[#1A1F2C] whitespace-pre-line break-words">
                {description ? description : <span className="text-gray-400 italic">Geen omschrijving ingevuld</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Notes, History & Map Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Notes Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F1F1F1]">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#7E69AB]/10 rounded-full p-1.5">
                <FileText className="w-4 h-4 text-[#7E69AB]" />
              </div>
              <h4 className="font-semibold text-[#23262F]">Notities</h4>
            </div>
            <div className="max-h-48 overflow-y-auto pr-1 space-y-2">
              {notes.length > 0 
                ? notes.map((note, i) => (
                  <div key={i} className="bg-[#F9F8FF] p-2 rounded text-sm text-[#403E43] border-l-2 border-[#7E69AB]">
                    {note}
                  </div>
                ))
                : <p className="text-gray-400 text-sm italic">Geen notities beschikbaar</p>
              }
            </div>
          </div>
          
          {/* History Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F1F1F1]">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#1EAEDB]/10 rounded-full p-1.5">
                <History className="w-4 h-4 text-[#1EAEDB]" />
              </div>
              <h4 className="font-semibold text-[#23262F]">Geschiedenis</h4>
            </div>
            <div className="max-h-48 overflow-y-auto pr-1 space-y-2">
              {isRescheduled && rescheduleReason && (
                <div className="bg-[#0EA5E9]/10 p-2 rounded text-sm border-l-2 border-[#0EA5E9]">
                  <span className="font-medium text-[#0EA5E9]">Afspraak verzet:</span>
                  <p className="text-[#1A1F2C] mt-1">{rescheduleReason}</p>
                  <span className="text-xs text-gray-500 block mt-1">
                    {historyEntries.length > 0 ? historyEntries[0].date : ""}
                  </span>
                </div>
              )}
              {historyEntries.length > 0 ? historyEntries.map((entry, i) => (
                <div key={i} className="bg-[#F9F8FF] p-2 rounded text-sm text-[#403E43] border-l-2 border-[#1EAEDB]">
                  <span className="font-medium text-[#1A1F2C]">{entry.type}:</span>
                  <p className="text-[#403E43] mt-0.5">{entry.description}</p>
                  <span className="text-xs text-gray-500 block mt-0.5">{entry.date}</span>
                </div>
              )) : !isRescheduled ? (
                <p className="text-gray-400 text-sm italic">Geen geschiedenis beschikbaar</p>
              ) : null}
            </div>
          </div>
          
          {/* Map Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F1F1F1]">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#0EA5E9]/10 rounded-full p-1.5">
                <MapPin className="w-4 h-4 text-[#0EA5E9]" />
              </div>
              <h4 className="font-semibold text-[#23262F]">Google Maps</h4>
            </div>
            <div className="rounded-lg overflow-hidden bg-gray-100 h-[120px] mb-3 relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <p className="text-gray-500 text-sm">Kaart preview</p>
              </div>
            </div>
            <Button 
              onClick={handleOpenMap} 
              variant="default" 
              size="sm" 
              className="w-full bg-[#0EA5E9] hover:bg-[#0991D1] text-white">
              <MapPin className="w-4 h-4 mr-2" />
              Bekijk op kaart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
