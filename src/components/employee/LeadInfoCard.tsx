import React from "react";
import { Calendar, MapPin, Phone, Mail, FileText, History, Info, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
interface LeadInfoCardProps {
  lead: {
    name: string;
    address: string;
    phone: string;
    email: string;
    appointmentDateTime?: string;
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
}
export const LeadInfoCard: React.FC<LeadInfoCardProps> = ({
  lead,
  historyEntries = [],
  notes = [],
  isRescheduled = false,
  rescheduleReason,
  showMapButton = false
}) => {
  const handleOpenMap = () => {
    if (lead.address) {
      const encodedAddress = encodeURIComponent(lead.address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };
  return <div className="bg-gradient-to-br from-[#F1F0FB] to-[#f7f6fd] rounded-2xl border border-[#e0eefe] shadow-lg overflow-hidden w-full animate-fade-in">
      {/* Header with appointment time */}
      {lead.appointmentDateTime}

      {/* Lead Information Card */}
      <div className="p-5 sm:p-6 px-[25px] py-[18px]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-6">
          {/* Customer Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start gap-3 mb-1">
              <div className="bg-[#7E69AB]/10 rounded-full p-2 mt-0.5 shadow-sm">
                <User className="w-5 h-5 text-[#7E69AB]" />
              </div>
              <div>
                <span className="text-xs text-[#7E69AB] font-medium uppercase">Klantgegevens</span>
                <h3 className="text-lg font-bold text-[#1A1F2C]">{lead.name}</h3>
              </div>
            </div>
            
            <div className="ml-11 space-y-2">
              <div className="flex items-center gap-2 text-[#0EA5E9] hover:text-[#0a8cca] transition-colors">
                <MapPin className="w-4 h-4 shrink-0" />
                <button onClick={showMapButton ? handleOpenMap : undefined} className={`text-sm break-words ${showMapButton ? 'hover:underline cursor-pointer' : ''}`}>
                  {lead.address}
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-[#0EA5E9] hover:text-[#0a8cca] transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                <a href={`tel:${lead.phone}`} className="text-sm hover:underline">
                  {lead.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-2 text-[#0EA5E9] hover:text-[#0a8cca] transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                <a href={`mailto:${lead.email}`} className="text-sm hover:underline">
                  {lead.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Notes Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#7E69AB]/10 rounded-full p-1.5">
                <FileText className="w-4 h-4 text-[#7E69AB]" />
              </div>
              <h4 className="font-semibold text-[#221F26]">Notities</h4>
            </div>
            
            <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
              {notes.length > 0 ? notes.map((note, i) => <div key={i} className="bg-[#F9F8FF] p-2 rounded text-sm text-[#403E43] border-l-2 border-[#7E69AB]">
                    {note}
                  </div>) : <p className="text-gray-400 text-sm italic">Geen notities beschikbaar</p>}
            </div>
          </div>

          {/* History Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#1EAEDB]/10 rounded-full p-1.5">
                <History className="w-4 h-4 text-[#1EAEDB]" />
              </div>
              <h4 className="font-semibold text-[#221F26]">Geschiedenis</h4>
            </div>
            
            <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
              {isRescheduled && rescheduleReason && <div className="bg-[#0EA5E9]/10 p-2 rounded text-sm border-l-2 border-[#0EA5E9]">
                  <span className="font-medium text-[#0EA5E9]">Afspraak verzet:</span>
                  <p className="text-[#1A1F2C] mt-1">{rescheduleReason}</p>
                  <span className="text-xs text-gray-500 block mt-1">
                    {historyEntries.length > 0 ? historyEntries[0].date : ""}
                  </span>
                </div>}
              
              {historyEntries.length > 0 ? historyEntries.map((entry, i) => <div key={i} className="bg-[#F9F8FF] p-2 rounded text-sm text-[#403E43] border-l-2 border-[#1EAEDB]">
                    <span className="font-medium text-[#1A1F2C]">{entry.type}:</span>
                    <p className="text-[#403E43] mt-0.5">{entry.description}</p>
                    <span className="text-xs text-gray-500 block mt-0.5">{entry.date}</span>
                  </div>) : !isRescheduled ? <p className="text-gray-400 text-sm italic">Geen geschiedenis beschikbaar</p> : null}
            </div>
          </div>

          {/* Additional Info Card (placeholder for future) */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#0EA5E9]/10 rounded-full p-1.5">
                <Info className="w-4 h-4 text-[#0EA5E9]" />
              </div>
              <h4 className="font-semibold text-[#221F26]">Extra Informatie</h4>
            </div>
            
            <div className="h-full flex flex-col items-center justify-center py-4">
              <p className="text-gray-400 text-sm italic text-center">Extra klantinformatie komt hier beschikbaar</p>
              {showMapButton && <Button onClick={handleOpenMap} variant="outline" size="sm" className="mt-4 text-[#0EA5E9] border-[#0EA5E9] hover:bg-[#0EA5E9]/10">
                  <MapPin className="w-4 h-4 mr-2" />
                  Toon op kaart
                </Button>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};