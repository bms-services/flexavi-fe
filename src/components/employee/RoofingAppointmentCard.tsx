
import React from "react";
import {
  Calendar,
  MapPin,
  FileText,
  Phone,
  Mail,
  User,
  History,
  Info,
  Roof,
  Briefcase,
  Wrench
} from "lucide-react";
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
    roofType?: string;
    jobType?: string;
    desiredWork?: string;
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
      flex flex-col p-8 gap-7
      animate-fade-in
      max-w-full
    `}
  >
    {/* Klantinformatie */}
    <SectionTitle icon={<User className="h-5 w-5 text-[#7E69AB]" />} label="Klantinformatie" />
    <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-start md:items-center">
      <div className="flex flex-col gap-1 min-w-[220px]">
        <span className="text-lg font-bold text-[#1A1F2C]">{lead.name || "Onbekende klant"}</span>
        <span className="mt-1 px-2 py-1 text-xs bg-[#E0E7FF] text-[#7E69AB] rounded w-fit">
          {lead.status || "Status onbekend"}
        </span>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[#7E69AB] font-medium mt-2">
          <span className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <a href={lead?.phone ? `tel:${lead.phone}` : "#"} className="hover:underline">{lead?.phone || "-"}</a>
          </span>
          <span className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <a href={lead?.email ? `mailto:${lead.email}` : "#"} className="hover:underline">{lead?.email || "-"}</a>
          </span>
        </div>
        <div className="flex flex-col gap-1 mt-2 text-[#8e9196] text-xs">
          <div><b>Bron:</b> {lead.source || "-"}</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start">
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

    {/* Afspraak Details */}
    <SectionTitle icon={<FileText className="h-5 w-5 text-[#7E69AB]" />} label="Uitgebreide afspraakinformatie" />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <InfoField icon={<Calendar className="h-4 w-4 text-[#7E69AB]" />} label="Datum & tijd">
        <span className="font-medium">{app.date}</span>
        <span className="text-xs text-[#8E9196]">{app.startTime} - {app.endTime}</span>
      </InfoField>
      <InfoField icon={<Roof className="h-4 w-4 text-[#7E69AB]" />} label="Type dak">
        <span>{lead?.roofType || "Onbekend"}</span>
      </InfoField>
      <InfoField icon={<Briefcase className="h-4 w-4 text-[#7E69AB]" />} label="Type opdracht">
        <span>{lead?.jobType || "Onbekend"}</span>
      </InfoField>
      <InfoField icon={<Wrench className="h-4 w-4 text-[#7E69AB]" />} label="Gewenste werkzaamheden">
        <span>{lead?.desiredWork || "Niet ingevuld"}</span>
      </InfoField>
    </div>

    {/* Omschrijving */}
    <div className="mt-2 mb-4">
      <div className="flex items-center gap-1 text-xs font-semibold text-[#8E9196] uppercase mb-1">
        <FileText className="h-4 w-4" />
        Afspraak omschrijving
      </div>
      <div className="text-sm text-[#1A1F2C] whitespace-pre-line bg-[#F8F7FD] rounded-xl p-4 border border-[#eee] shadow-inner min-h-[48px]">
        {app.description || "-"}
      </div>
      {rescheduleReason && (
        <div className="mt-3 py-2 px-3 text-xs bg-amber-50 border-l-4 border-amber-400 rounded text-[#eb9e34] flex items-center gap-2">
          <History className="h-4 w-4" />
          <b>Afspraak verzet:</b>
          <span>{rescheduleReason}</span>
        </div>
      )}
    </div>

    {/* Klantgeschiedenis */}
    <SectionTitle icon={<History className="h-4 w-4 text-[#7E69AB]" />} label="Klantgeschiedenis" />
    <div className="flex flex-col gap-1 mb-2">
      {historyEntries && historyEntries.length > 0 ? (
        <ul className="list-disc pl-5 text-xs text-[#222]">
          {historyEntries.map((h, i) => (
            <li key={i} className="mb-0.5">
              <span className="font-semibold">Op {h.date}:</span> {h.reason}
            </li>
          ))}
        </ul>
      ) : (
        <span className="italic text-gray-400 text-xs">Geen eerdere acties bekend.</span>
      )}
    </div>

    {/* Actieknoppen */}
    <div className="flex flex-col md:flex-row gap-3 mt-4 w-full">
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

// ----- Kleine helpers -----
function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="mb-2 flex items-center gap-2 text-base font-semibold text-[#8E9196]">
      {icon}
      {label}
    </div>
  );
}

function InfoField({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl bg-[#F8F7FD] p-3 gap-1 border border-[#eee] min-h-[62px]">
      <div className="flex items-center gap-1 text-xs font-semibold text-[#7E69AB]">
        {icon}
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}
