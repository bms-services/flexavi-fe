
import React from "react";
import { MapPin, Phone, Mail, FileText, History, Info, User } from "lucide-react";
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
}

export const LeadInfoCard: React.FC<LeadInfoCardProps> = ({
  lead,
  historyEntries = [],
  notes = [],
  isRescheduled = false,
  rescheduleReason,
  showMapButton = false,
  description
}) => {
  const handleOpenMap = () => {
    if (lead.address) {
      const encodedAddress = encodeURIComponent(lead.address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  return (
    <div className="bg-[#EFF7FF] rounded-2xl border border-[#DFE7F1] shadow-lg overflow-hidden w-full animate-fade-in">
      <div className="p-3 sm:p-5 md:p-6">
        {/* Responsive grid: klantgegevens 1/3, afspraakomschrijving 2/3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mb-6">
          {/* Klant Info (1/3) */}
          <div className="flex-1 md:col-span-1 space-y-3 min-w-0">
            <div className="flex items-start gap-3 mb-1">
              <div className="bg-[#7E69AB]/10 rounded-full p-2 mt-0.5 shadow-sm">
                <User className="w-5 h-5 text-[#7E69AB]" />
              </div>
              <div>
                <span className="text-xs text-[#2F3857] font-medium uppercase">Klantgegevens</span>
                <h3 className="text-lg font-bold text-[#1A1F2C]">{lead.name}</h3>
              </div>
            </div>
            <div className="ml-11 space-y-2">
              <div className="flex items-center gap-2 text-[#1A1F2C] hover:text-[#0a8cca] transition-colors">
                <MapPin className="w-4 h-4 shrink-0" />
                <button 
                  onClick={showMapButton ? handleOpenMap : undefined} 
                  className={`text-sm break-words ${showMapButton ? 'hover:underline cursor-pointer' : ''} text-[#1A1F2C]`}>
                  {lead.address}
                </button>
              </div>
              <div className="flex items-center gap-2 text-[#1A1F2C] hover:text-[#0a8cca] transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                <a href={`tel:${lead.phone}`} className="text-sm hover:underline text-[#1A1F2C]">
                  {lead.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#1A1F2C] hover:text-[#0a8cca] transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                <a href={`mailto:${lead.email}`} className="text-sm hover:underline text-[#1A1F2C]">
                  {lead.email}
                </a>
              </div>
            </div>
          </div>
          {/* Afspraakomschrijving (2/3), responsief */}
          <div className="md:col-span-2 flex flex-col justify-center min-h-[112px]">
            <span className="text-xs text-[#2F3857] font-semibold uppercase mb-2 block">
              Afspraakomschrijving
            </span>
            <div className="bg-white/90 rounded-lg px-4 py-4 min-h-[96px] flex items-center shadow-sm border border-[#DFE7F1]">
              <p className={`text-base sm:text-lg font-medium text-[#1A1F2C] whitespace-pre-line break-words`}>
                {description ? description : <span className="text-gray-400 italic font-normal">Geen omschrijving ingevuld</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Onderrij: 3 kaarten, responsief in 1 rij, op mobiel stacked */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Notes Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#DFE7F1] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#7E69AB]/10 rounded-full p-1.5">
                <FileText className="w-4 h-4 text-[#7E69AB]" />
              </div>
              <h4 className="font-semibold text-[#23262F]">Notities</h4>
            </div>
            <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
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
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#DFE7F1] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#1EAEDB]/10 rounded-full p-1.5">
                <History className="w-4 h-4 text-[#1EAEDB]" />
              </div>
              <h4 className="font-semibold text-[#23262F]">Geschiedenis</h4>
            </div>
            <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
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
          {/* Extra info */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#DFE7F1] hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#0EA5E9]/10 rounded-full p-1.5">
                <Info className="w-4 h-4 text-[#0EA5E9]" />
              </div>
              <h4 className="font-semibold text-[#23262F]">Extra Informatie</h4>
            </div>
            <div className="h-full flex flex-col items-center justify-center py-4">
              <p className="text-gray-400 text-sm italic text-center">Extra klantinformatie komt hier beschikbaar</p>
              {showMapButton && (
                <Button 
                  onClick={handleOpenMap} 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 text-[#0EA5E9] border-[#0EA5E9] hover:bg-[#0EA5E9]/10">
                  <MapPin className="w-4 h-4 mr-2" />
                  Toon op kaart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
