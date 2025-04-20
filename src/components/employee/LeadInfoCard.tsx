
import React from "react";
import { Calendar, MapPin, Phone, Mail, FileText, History } from "lucide-react";

interface LeadInfoCardProps {
  lead: {
    name: string;
    address: string;
    phone: string;
    email: string;
    appointmentDateTime?: string;
  };
  historyEntries?: { type: string; description: string; date: string }[];
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
  showMapButton = false,
}) => {
  return (
    <section className="bg-[#F1F0FB] rounded-2xl p-5 sm:p-8 shadow border border-[#e0eefe] w-full max-w-3xl mx-auto animate-fade-in">
      {/* Afspraak tijd & datum */}
      {lead && lead.appointmentDateTime && (
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-[#0EA5E9] shrink-0" />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-[#0EA5E9]">
            {lead.appointmentDateTime}
          </span>
        </div>
      )}
      {/* Klant info */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-start mb-6">
        <div className="flex-1">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2 font-semibold text-lg md:text-xl text-[#1A1F2C]">
              <UserIcon />
              {lead.name}
            </span>
            <span className="flex items-center gap-2 text-sm md:text-base text-[#0EA5E9]">
              <MapPin className="w-4 h-4" /> {lead.address}
            </span>
            <span className="flex items-center gap-2 text-xs md:text-sm text-[#0AA1E4] mt-0.5">
              <Phone className="w-4 h-4" />
              <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
            </span>
            <span className="flex items-center gap-2 text-xs md:text-sm text-[#0EA5E9]">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
            </span>
          </div>
        </div>
      </div>
      {/* Kolommen in grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Notities */}
        <div className="bg-white/70 rounded-lg px-4 py-3 shadow flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-[#7E69AB]" />
            <span className="font-semibold text-[#221F26] text-sm md:text-base">Klantnotities</span>
          </div>
          {notes.length > 0 ? (
            <ul className="list-disc pl-4 max-h-36 overflow-y-auto space-y-1 text-xs md:text-sm text-[#0A8AD0]">
              {notes.map((n, i) => (
                <li key={i} className="whitespace-pre-wrap">{n}</li>
              ))}
            </ul>
          ) : (
            <div className="italic text-gray-400 text-xs md:text-sm">Geen notities beschikbaar</div>
          )}
        </div>
        {/* Geschiedenis */}
        <div className="bg-white/70 rounded-lg px-4 py-3 shadow flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-4 h-4 text-[#1EAEDB]" />
            <span className="font-semibold text-[#221F26] text-sm md:text-base">Klantgeschiedenis</span>
          </div>
          {isRescheduled && rescheduleReason && (
            <div className="mb-2 px-2 py-1 bg-blue-50 border-l-4 border-blue-400 rounded text-xs text-blue-700 md:text-sm">
              Afspraak verzet: <span className="font-semibold">{rescheduleReason}</span>
              <span className="block text-gray-400 text-[11px] mt-0.5">
                {historyEntries.length > 0 ? historyEntries[0].date : ""}
              </span>
            </div>
          )}
          {historyEntries.length > 0 ? (
            <ul className="list-disc pl-4 max-h-36 overflow-y-auto space-y-1 text-xs md:text-sm text-[#0A8AD0]">
              {historyEntries.map((entry, i) => (
                <li key={i}>
                  <span className="font-semibold text-[#1A1F2C]">{entry.type}:</span> {entry.description}
                  <span className="text-gray-400 ml-1 text-[11px]">{entry.date}</span>
                </li>
              ))}
            </ul>
          ) : !isRescheduled ? (
            <div className="italic text-gray-400 text-xs md:text-sm">Geen geschiedenis beschikbaar</div>
          ) : null}
        </div>
        {/* Extra kolom future proof */}
        <div className="bg-white/70 rounded-lg px-4 py-3 shadow flex flex-col h-full items-center justify-center">
          {/* Hier kan in de toekomst andere info komen */}
          <span className="text-gray-400 text-xs md:text-sm">-</span>
        </div>
      </div>
    </section>
  );
};

// Custom User icon (omdat lucide-react User anders capitalize is en whitelist)
const UserIcon = () => (
  <svg className="w-5 h-5 text-[#7E69AB]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20c0-2.21 3.582-4 6-4s6 1.79 6 4" />
  </svg>
);
