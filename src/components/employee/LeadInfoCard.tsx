
import React from "react";
// Alleen icons die we mogen gebruiken:
import { columns3 } from "lucide-react"; // Dummy import: geen gebruikte lucide-react icons toegestaan volgens lijst!
// Voor nu GEEN icons, strakker en netter!

interface LeadInfoCardProps {
  lead: {
    name: string;
    address: string;
    phone: string;
    email: string;
    appointmentDateTime?: string; // voeg datum/tijd toe indien beschikbaar
  };
  historyEntries?: { type: string; description: string; date: string }[];
  notes?: string[];
  isRescheduled?: boolean;
  rescheduleReason?: string;
  showMapButton?: boolean; // mag weg
}

export const LeadInfoCard: React.FC<LeadInfoCardProps> = ({
  lead,
  historyEntries = [],
  notes = [],
  isRescheduled = false,
  rescheduleReason,
}) => {
  return (
    <div className="bg-[#F1F0FB] rounded-xl p-6 md:p-8 shadow border border-[#e0eefe] mb-4">
      {/* Tijd & datum prominent bovenaan */}
      {lead && (lead as any).appointmentDateTime && (
        <div className="text-center md:text-left mb-4">
          <div className="text-xl md:text-2xl font-bold tracking-tight text-[#0EA5E9]">
            {(lead as any).appointmentDateTime}
          </div>
        </div>
      )}

      {/* Klantgegevens */}
      <div className="flex flex-col md:flex-row md:items-start md:gap-8">
        <div className="flex-1">
          <div>
            <span className="block font-semibold text-lg md:text-xl text-[#1A1F2C] mb-1">
              {lead.name}
            </span>
            <span className="block text-sm md:text-base text-[#0EA5E9] mb-2">
              {lead.address}
            </span>
            <div className="flex flex-col gap-0.5">
              <a
                href={`tel:${lead.phone}`}
                className="text-xs md:text-sm text-[#0AA1E4] hover:underline"
              >
                {lead.phone}
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="text-xs md:text-sm text-[#0EA5E9] hover:underline"
              >
                {lead.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Kolommen: Klantnotities, geschiedenis, extra */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notities */}
        <div>
          <div className="font-semibold text-[#1A1F2C] mb-2 text-sm md:text-base">
            Klantnotities
          </div>
          {notes.length > 0 ? (
            <ul className="list-disc pl-5 max-h-40 overflow-y-auto space-y-1 text-xs md:text-sm text-[#0A8AD0]">
              {notes.map((n, i) => (
                <li key={i} className="whitespace-pre-wrap">{n}</li>
              ))}
            </ul>
          ) : (
            <div className="italic text-gray-400 text-xs md:text-sm">Geen notities beschikbaar</div>
          )}
        </div>
        {/* Geschiedenis */}
        <div>
          <div className="font-semibold text-[#1A1F2C] mb-2 text-sm md:text-base">
            Klantgeschiedenis
          </div>
          {/* Eventueel herplande afspraak */}
          {isRescheduled && rescheduleReason && (
            <div className="mb-2 px-3 py-2 bg-blue-50 border-l-4 border-blue-400 rounded text-xs text-blue-700 md:text-sm">
              Afspraak verzet: {rescheduleReason}
              <span className="block text-gray-400 text-[11px] mt-0.5">
                {historyEntries.length > 0 ? historyEntries[0].date : ""}
              </span>
            </div>
          )}
          {historyEntries.length > 0 ? (
            <ul className="list-disc pl-5 max-h-40 overflow-y-auto space-y-1 text-xs md:text-sm text-[#0A8AD0]">
              {historyEntries.map((entry, i) => (
                <li key={i}>
                  <span className="font-semibold text-[#1A1F2C]">{entry.type}:</span>{" "}
                  {entry.description}
                  <span className="text-gray-400 ml-1 text-[11px]">{entry.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="italic text-gray-400 text-xs md:text-sm">Geen geschiedenis beschikbaar</div>
          )}
        </div>
        {/* Extra kolom: future proof of info */}
        <div className="hidden md:block"></div>
      </div>
    </div>
  );
};

