
import React from "react";
import { User, Info, History, FileText, Phone, Mail, MapPin } from "lucide-react";

interface LeadInfoCardProps {
  lead: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  historyEntries?: { type: string; description: string; date: string }[];
  notes?: string[];
  isRescheduled?: boolean;
  rescheduleReason?: string;
  showMapButton?: boolean; // nieuw, default false
}

export const LeadInfoCard: React.FC<LeadInfoCardProps> = ({
  lead,
  historyEntries = [],
  notes = [],
  isRescheduled = false,
  rescheduleReason,
  showMapButton = false
}) => {
  return (
    <div className="bg-[#F1F0FB] rounded-xl p-5 mb-4 border">
      {/* NAAM + ADRES */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <User className="h-6 w-6 text-[#0EA5E9]" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-[#1A1F2C]">{lead.name}</span>
            <div className="text-xs text-[#0EA5E9] mb-0.5">{lead.address}</div>
            <div className="flex flex-col gap-1 mt-2">
              <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-[#0AA1E4] text-xs hover:underline">
                <Phone className="h-4 w-4" /> {lead.phone}
              </a>
              <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-[#0EA5E9] text-xs hover:underline">
                <Mail className="h-4 w-4" /> {lead.email}
              </a>
            </div>
          </div>
        </div>
        {/* Kaartknop optioneel en standaard niet tonen */}
        {showMapButton && (
          <div className="ml-auto">
            <button
              className="flex items-center gap-1 text-xs bg-white border border-[#0EA5E9] text-[#0AA1E4] rounded px-3 py-1 hover:bg-[#dbeefd] focus:outline-none transition"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.address)}`, "_blank")}
            >
              <MapPin className="h-4 w-4" />
              Bekijk op kaart
            </button>
          </div>
        )}
      </div>
      {/* 3 kolommen: notities, historie, evt. extra */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#0A8AD0]">
        {/* Notities */}
        <div>
          <h4 className="font-semibold text-[#1A1F2C] mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#0EA5E9]" />
            Klantnotities
          </h4>
          {notes.length > 0 ? (
            <ul className="list-disc pl-5 max-h-40 overflow-y-auto space-y-1">
              {notes.map((n, i) => (
                <li key={i} className="whitespace-pre-wrap">{n}</li>
              ))}
            </ul>
          ) : (
            <div className="italic text-gray-500">Geen notities beschikbaar</div>
          )}
        </div>
        {/* Geschiedenis */}
        <div>
          <h4 className="font-semibold text-[#1A1F2C] mb-2 flex items-center gap-2">
            <Info className="h-4 w-4 text-[#0AA1E4]" />
            Klantgeschiedenis
          </h4>
          {isRescheduled && rescheduleReason && (
            <div className="mb-2 text-blue-700 bg-blue-50 border-l-4 border-blue-400 rounded p-2 flex items-center gap-2 text-xs">
              <History className="h-4 w-4" />
              <span>Afspraak verzet: {rescheduleReason}</span>
              <span className="text-gray-400 ml-auto text-[11px]">{historyEntries.length > 0 ? historyEntries[0].date : ""}</span>
            </div>
          )}
          {historyEntries.length > 0 ? (
            <ul className="list-disc pl-5 max-h-40 overflow-y-auto space-y-1">
              {historyEntries.map((entry, i) => (
                <li key={i}>
                  <span className="font-semibold text-[#1A1F2C]">{entry.type}:</span> {entry.description}
                  <span className="text-gray-400 ml-1 text-[11px]">{entry.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="italic text-gray-500">Geen geschiedenis beschikbaar</div>
          )}
        </div>
        {/* Extra kolom voor toekomstige uitbreiding / placeholder */}
        <div>
          {/* Je kunt eventueel hier iets toevoegen zoals "Contact moments" etc. Voor nu leeg */}
        </div>
      </div>
    </div>
  );
};
