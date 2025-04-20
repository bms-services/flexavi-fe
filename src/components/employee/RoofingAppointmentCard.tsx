
import React from "react";
import { Calendar, MapPin, FileText, Phone, Mail, User, Info, ArrowRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types";

// Props met uitbreiding voor meer klantdata
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
  historyEntries?: { date: string; reason: string }[]; // nieuwe optie voor geschiedenis
  rescheduleReason?: string; // reden voor verzetten
}

// Kleurenpalet
const COLORS = {
  card: "bg-[#F1F0FB]",
  border: "border-[#EBE8FA]",
  icon: "text-[#1A1F2C]",
  title: "text-[#1A1F2C]",
  label: "text-[#8E9196]",
  value: "text-[#1A1F2C]",
  accent: "text-[#0EA5E9]",
  chip: "bg-[#E0E7FF] text-[#37395b]",
  button:"bg-[#1A1F2C] text-white",
  shadow: "shadow-lg"
};

export const RoofingAppointmentCard: React.FC<RoofingAppointmentCardProps> = ({
  app,
  lead,
  onMapOpen,
  onProcess,
  onHistory,
  onReschedule,
  historyEntries = [],
  rescheduleReason,
}) => (
  <div
    className={`
      w-full rounded-xl
      ${COLORS.card} border ${COLORS.border} ${COLORS.shadow}
      flex flex-col p-4 gap-5
      animate-fade-in
      sm:px-8
    `}
  >
    {/* Header: klant-informatie */}
    <div className="flex items-start gap-4 flex-col sm:flex-row sm:items-center">
      <div className="flex-shrink-0 flex justify-center items-center rounded-full bg-white border border-[#D6BCFA] w-14 h-14 mb-2 sm:mb-0">
        <User className="h-8 w-8 text-[#9b87f5]" />
      </div>
      <div className="flex-1">
        <div className="font-bold text-lg sm:text-xl text-[#1A1F2C] mb-0.5">{lead?.name || "Onbekende klant"}</div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 items-center text-sm text-[#374151]">
          <span className="flex items-center gap-1 text-[#0EA5E9]">
            <Phone className="h-4 w-4" />
            <a href={lead?.phone ? `tel:${lead.phone}` : "#"} className="hover:underline">
              {lead?.phone || "-"}
            </a>
          </span>
          <span className="flex items-center gap-1 text-[#0EA5E9]">
            <Mail className="h-4 w-4" />
            <a href={lead?.email ? `mailto:${lead.email}` : "#"} className="hover:underline">
              {lead?.email || "-"}
            </a>
          </span>
        </div>
        <div className="text-xs text-[#8E9196] mt-1 flex gap-2 flex-wrap">
          <span>
            <b>Bron:</b> {lead?.source || "-"}
          </span>
          <span>
            <b>Status:</b> {lead?.status || "-"}
          </span>
        </div>
      </div>
    </div>
    {/* Adres + kaart-knop */}
    <div className="flex items-center gap-2 text-sm font-medium mt-1 text-[#37395b]">
      <MapPin className="h-5 w-5 text-[#0EA5E9]" />
      <button
        type="button"
        className="underline text-left truncate hover:text-[#176ca7] transition w-full"
        onClick={() => onMapOpen(lead?.address || "")}
      >
        {lead?.address || "-"}
      </button>
    </div>
    {/* Uitgebreidere afspraak details */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
      <InfoBlock
        icon={<Calendar className="h-5 w-5 text-[#1A1F2C]" />}
        label="Datum & tijd"
      >
        <span className="block font-semibold mb-1">
          {app.date}
        </span>
        <span className="block text-xs text-[#8E9196]">
          {app.startTime} tot {app.endTime}
        </span>
      </InfoBlock>
      <InfoBlock
        icon={<FileText className="h-5 w-5 text-[#1A1F2C]" />}
        label="Uitgebreide omschrijving"
      >
        <span className="whitespace-pre-wrap">{app.description || "-"}</span>
      </InfoBlock>
    </div>
    {/* Klant-geschiedenis */}
    <div className="mt-2">
      <div className="flex items-center gap-1 mb-2 text-xs font-semibold text-[#8E9196] uppercase">
        <History className="h-4 w-4 text-[#9b87f5]" />
        Klantgeschiedenis
      </div>
      <div className="flex flex-col gap-1">
        {rescheduleReason && (
          <span className="bg-blue-100 border-l-4 border-blue-400 rounded px-2 py-1 text-[#2563eb] flex items-center gap-1 text-xs">
            <History className="h-4 w-4" />
            Afspraak verzet: {rescheduleReason}
          </span>
        )}
        {historyEntries.length > 0 ? (
          <ul className="list-disc pl-5 text-xs text-[#222]">
            {historyEntries.map((h, i) => (
              <li key={i} className="mb-0.5">
                <span className="font-semibold">Op {h.date}: </span>{h.reason}
              </li>
            ))}
          </ul>
        ) : (
          <span className="italic text-gray-500 text-xs">Geen recente geschiedenis</span>
        )}
      </div>
    </div>
    {/* BELANGRIJK: Actieknoppen onderaan */}
    <div className="flex flex-col gap-2 mt-3 w-full">
      <Button
        className="w-full h-12 rounded-lg text-base font-semibold bg-[#1A1F2C] text-white hover:bg-[#37395b] transition"
        onClick={onProcess}
        size="lg"
      >
        <Info className="h-5 w-5 mr-1" /> Verwerken
      </Button>
      <div className="flex gap-2">
        <Button
          className="flex-1 font-medium border border-[#0EA5E9] text-[#0EA5E9] bg-white hover:bg-[#e3f2fd] rounded-lg"
          variant="outline"
          onClick={onHistory}
          size="sm"
        >
          Geschiedenis
        </Button>
        <Button
          className="flex-1 font-medium border border-[#f59e42] text-[#f59e42] bg-white hover:bg-[#fff6eb] rounded-lg"
          variant="outline"
          onClick={onReschedule}
          size="sm"
        >
          Verzetten
        </Button>
      </div>
    </div>
  </div>
);


// InfoBlock hergebruikt, aangepast
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
    <div className="flex flex-col gap-2 rounded-lg bg-white p-3 border border-[#eee] min-h-[92px]">
      <div className="flex items-center gap-1 text-xs font-semibold text-[#8E9196] uppercase">
        {icon}
        {label}
      </div>
      <div className={COLORS.value}>{children}</div>
    </div>
  );
}

