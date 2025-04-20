import React from "react";
import { User, Phone, Mail, MapPin, Info, History, FileText } from "lucide-react";

interface LeadInfoCardProps {
  lead: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  onMapOpen: (address: string) => void;
  historyEntries?: { type: string; description: string; date: string }[];
  notes?: string[];
  isRescheduled?: boolean;
  rescheduleReason?: string;
  compact?: boolean;
}

export const LeadInfoCard: React.FC<LeadInfoCardProps> = ({
  lead,
  onMapOpen,
  historyEntries = [],
  notes = [],
  isRescheduled = false,
  rescheduleReason,
  compact = false,
}) => {
  if (!compact) {
    return (
      <div className="bg-[#F1F0FB] rounded-xl p-5 mb-4 border">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
          <div className="flex-1 flex items-center gap-3">
            <User className="h-6 w-6 text-[#0EA5E9]" />
            <div>
              <span className="font-semibold text-lg text-[#1A1F2C]">{lead.name}</span>
              <div className="text-xs text-[#0EA5E9]">{lead.address}</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
            <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-[#0AA1E4] text-sm hover:underline">
              <Phone className="h-4 w-4" />
              {lead.phone}
            </a>
            <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-[#0EA5E9] text-sm hover:underline">
              <Mail className="h-4 w-4" />
              {lead.email}
            </a>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            className="flex items-center gap-1 text-xs bg-white border border-[#0EA5E9] text-[#0AA1E4] rounded px-3 py-1 hover:bg-[#dbeefd] focus:outline-none transition"
            onClick={() => onMapOpen(lead.address)}
          >
            <MapPin className="h-4 w-4" />
            Bekijk op kaart
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#0A8AD0]">
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
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F0FB] rounded-xl p-3 border flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-[#0EA5E9]" />
          <span className="font-semibold text-base text-[#1A1F2C] leading-5">{lead.name}</span>
          <span className="text-xs text-[#0A8AD0] ml-2">{lead.address}</span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 items-center justify-end text-xs">
          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-[#0AA1E4] hover:underline">
            <Phone className="h-4 w-4" />
            {lead.phone}
          </a>
          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-[#0EA5E9] hover:underline">
            <Mail className="h-4 w-4" />
            {lead.email}
          </a>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-2">
        <button
          className="flex items-center gap-1 text-xs bg-white border border-[#0EA5E9] text-[#0AA1E4] rounded px-3 py-0.5 hover:bg-[#dbeefd] focus:outline-none transition"
          onClick={() => onMapOpen(lead.address)}
        >
          <MapPin className="h-4 w-4" />
          Bekijk op kaart
        </button>
      </div>
      <div className="w-full flex flex-col sm:flex-row gap-3 text-xs text-[#0A8AD0] mt-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 font-semibold text-[#1A1F2C] mb-0.5">
            <FileText className="h-4 w-4 text-[#0EA5E9]" /> Klantnotities
          </div>
          {notes.length > 0 ? (
            <ul className="list-disc pl-5 max-h-24 overflow-y-auto space-y-1 text-xs">
              {notes.map((n, i) => (
                <li key={i} className="whitespace-pre-wrap">{n}</li>
              ))}
            </ul>
          ) : (
            <div className="italic text-gray-500">Geen notities beschikbaar</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 font-semibold text-[#1A1F2C] mb-0.5">
            <Info className="h-4 w-4 text-[#0AA1E4]" /> Klantgeschiedenis
          </div>
          {isRescheduled && rescheduleReason && (
            <div className="mb-1 text-blue-700 bg-blue-50 border-l-4 border-blue-400 rounded p-1.5 flex items-center gap-2 text-xs">
              <History className="h-4 w-4" />
              <span>Afspraak verzet: {rescheduleReason}</span>
              <span className="text-gray-400 ml-auto text-[11px]">{historyEntries.length > 0 ? historyEntries[0].date : ""}</span>
            </div>
          )}
          {historyEntries.length > 0 ? (
            <ul className="list-disc pl-5 max-h-24 overflow-y-auto space-y-1 text-xs">
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
      </div>
    </div>
  );
};
