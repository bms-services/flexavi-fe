
import React from "react";
import { Calendar, MapPin, FileText, Phone, Mail, User, Info, ArrowRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types";

interface HistoryEntry {
  date: string;
  reason: string;
}

interface RoofingAppointmentCardProps {
  app: Appointment;
  lead: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    source?: string;
    status?: string;
  };
  onMapOpen: (address: string) => void;
  onProcess: () => void;
  onHistory?: () => void;
  onReschedule?: () => void;
  historyEntries?: HistoryEntry[];
  rescheduleReason?: string;
}

const COLORS = {
  card: "bg-white",
  border: "border-[#EBE8FA]",
  value: "text-[#1A1F2C]",
  label: "text-[#8E9196]",
  accent: "text-[#7E69AB]",
  chip: "bg-[#E0E7FF] text-[#37395b]",
  button: "bg-[#9b87f5] text-white",
  shadow: "shadow-xl",
};

export const RoofingAppointmentCard: React.FC<RoofingAppointmentCardProps> = ({
  app,
  lead = {},
  onMapOpen,
  onProcess,
  onHistory,
  onReschedule,
  historyEntries = [],
  rescheduleReason,
}) => (
  <div
    className={`
      w-full rounded-3xl
      ${COLORS.card} border ${COLORS.border} ${COLORS.shadow}
      flex flex-col p-6 gap-6
      animate-fade-in
      max-w-full
    `}
  >
    {/* Hoofdkop met klant */}
    <div className="flex flex-wrap items-start sm:items-center gap-4 border-b pb-5">
      <div className="flex-shrink-0 flex items-center justify-center rounded-full bg-[#F5F5FE] border border-[#D6BCFA] w-16 h-16">
        <User className="h-10 w-10 text-[#9b87f5]" />
      </div>
      <div className="grow min-w-[160px]">
        <div className="font-bold text-xl text-[#1A1F2C] mb-1 flex items-center gap-2">
          {lead?.name || "Onbekende klant"}
          <span className="ml-1 px-2 py-1 text-xs bg-[#E0E7FF] text-[#7E69AB] rounded">
            {lead?.status || "Status onbekend"}
          </span>
        </div>
        <div className="text-sm flex flex-wrap gap-x-6 gap-y-1 text-[#7E69AB] font-medium">
          <span className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <a href={lead?.phone ? `tel:${lead.phone}` : "#"} className="hover:underline">{lead?.phone || "-"}</a>
          </span>
          <span className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <a href={lead?.email ? `mailto:${lead.email}` : "#"} className="hover:underline">{lead?.email || "-"}</a>
          </span>
        </div>
        <div className="mt-2 text-xs flex flex-wrap gap-2 text-[#8e9196]">
          <b>Bron:</b> <span>{lead?.source || "-"}</span>
        </div>
      </div>
      <div className="grow min-w-[140px] flex flex-col items-start sm:items-end">
        <span className="flex gap-2 items-center text-[#7E69AB] text-sm font-semibold">
          <MapPin className="h-5 w-5 mr-1" />
          <button
            type="button"
            className="underline text-left truncate hover:text-[#9b87f5] transition max-w-xs"
            onClick={() => onMapOpen(lead?.address || "")}
          >
            {lead?.address || "-"}
          </button>
        </span>
      </div>
    </div>
    {/* Afspraak details */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <InfoBlock
        icon={<Calendar className="h-5 w-5 text-[#7E69AB]" />}
        label="Datum & Tijd"
      >
        <span className="block font-semibold">{app.date}</span>
        <span className="text-xs text-[#8E9196]">{app.startTime} tot {app.endTime}</span>
      </InfoBlock>
      <InfoBlock
        icon={<FileText className="h-5 w-5 text-[#7E69AB]" />}
        label="Afspraak"
      >
        <span className="block text-[#1A1F2C] font-medium">{app.title}</span>
        <span className="block text-xs mt-2 text-[#444] whitespace-pre-wrap max-h-28 overflow-y-auto">{app.description || "-"}</span>
      </InfoBlock>
      <InfoBlock
        icon={<History className="h-5 w-5 text-[#7E69AB]" />}
        label="Laatste acties"
      >
        {/* Herkomst, status, eventueel reden verzet */}
        <div className="text-xs text-[#8e9196] flex flex-col gap-1">
          <div>
            <b>Lead aangemaakt:</b> <span>{lead?.source || "-"}</span>
          </div>
          <div>
            <b>Laatste status:</b> <span>{lead?.status || "-"}</span>
          </div>
          {rescheduleReason && (
            <div className="text-[#eb9e34] bg-amber-50 border-l-4 border-amber-400 rounded px-2 py-1 flex items-center gap-2 mt-1">
              <History className="h-4 w-4" />
              <b>Verzet:</b> <span>{rescheduleReason}</span>
            </div>
          )}
        </div>
      </InfoBlock>
    </div>
    {/* Geschiedenis */}
    <div className="mt-3">
      <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-[#8E9196] uppercase">
        <History className="h-4 w-4 text-[#7E69AB]" />
        Klantgeschiedenis
      </div>
      <div className="flex flex-col gap-1">
        {historyEntries && historyEntries.length > 0 ? (
          <ul className="list-disc pl-5 text-xs text-[#222]">
            {historyEntries.map((h, i) => (
              <li key={i} className="mb-0.5">
                <span className="font-semibold">Op {h.date}: </span>{h.reason}
              </li>
            ))}
          </ul>
        ) : (
          <span className="italic text-gray-400 text-xs">Geen eerdere acties bekend.</span>
        )}
      </div>
    </div>
    {/* Knoppen */}
    <div className="flex flex-col md:flex-row gap-2 mt-5 w-full justify-between">
      <Button
        className="w-full md:w-auto h-12 rounded-lg text-base font-semibold bg-[#9b87f5] text-white hover:bg-[#7E69AB] transition"
        onClick={onProcess}
        size="lg"
      >
        <Info className="h-5 w-5 mr-1" /> Verwerken
      </Button>
      <Button
        className="flex-1 font-medium border border-[#7E69AB] text-[#7E69AB] bg-white hover:bg-[#f3f2fa] rounded-lg"
        variant="outline"
        onClick={onHistory}
        size="lg"
      >
        <History className="h-5 w-5 mr-1" /> Geschiedenis
      </Button>
      <Button
        className="flex-1 font-medium border border-[#faad13] text-[#faad13] bg-white hover:bg-[#fff7ec] rounded-lg"
        variant="outline"
        onClick={onReschedule}
        size="lg"
      >
        Verzetten
      </Button>
    </div>
  </div>
);

// InfoBlock component
function InfoBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-[#F8F7FD] p-4 border border-[#eee] min-h-[92px]">
      <div className="flex items-center gap-1 text-xs font-semibold text-[#8E9196] uppercase">
        {icon}
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}
